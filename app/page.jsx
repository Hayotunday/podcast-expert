"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import Featured from "@components/Featured";
import Loader from "@components/Loader";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
	const { searched } = useSelector((state) => state.search);

	const [profiles, setProfiles] = useState([]);
	const [podcaster, setPodcaster] = useState([]);
	const [guest, setGuest] = useState([]);
	const [id, setId] = useState("");
	const [recent, setRecent] = useState([]);
	const [recents, setRecents] = useState([]);
	const [favorite, setFavorite] = useState([]);
	const [search, setSearch] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const getUserDetails = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config
				)
				.then((res) => {
					// console.log("user: ", res.data);
					setRecent(res.data.user.recent);
					setFavorite(res.data.user.saved_list);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const getProfiles = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles?category=all&location=&topic=`, { id }
				)
				.then((res) => {
					// console.log("profiles: ", res.data);
					setProfiles(res.data);
				})
				.catch((err) => console.log(err));
		};

		getProfiles();
	}, []);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const getProfiles = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles?category=podcaster&location=&topic=`, { id }
				)
				.then((res) => {
					setPodcaster(res.data);
				})
				.catch((err) => console.log(err))
		};

		getProfiles();
	}, []);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const getProfiles = async () => {
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/recents`, config)
				.then((res) => {
					setRecents(res.data);
				})
				.catch((err) => console.log(err))
				.finally(() => { setIsLoaded(false) })
		};

		getProfiles();
	}, []);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const getProfiles = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles?category=guest&location=&topic=`, { id }
				)
				.then((res) => {
					setGuest(res.data);
				})
				.catch((err) => console.log(err))
		};

		getProfiles();
	}, []);

	useEffect(() => {
		const getSearched = async () => {
			const categories = profiles?.filter((i) => {
				for (let index = 0; index < i.topic_categories.length; index++) {
					let str = i?.topic_categories[index].toLowerCase()
					return searched === str;
				}
			});
			const users = profiles?.filter((i) => {
				let str = i.user.name.toLowerCase()
				return str.includes(searched.toLowerCase());
			});

			const prof = [...users, ...categories];
			setSearch(prof);
		};

		getSearched();
	}, [searched]);

	const handleAddRecent = async (id) => {
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		if (!recent.includes(id)) {
			await axios
				.patch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/recents`,
					{
						id: id,
						data: [...recent, id],
					},
					config
				)
				.then((res) => {
					return;
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const updateFavorite = (data) => {
		setFavorite(data);
	};

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 1024, min: 768 },
			items: 4,
			slidesToSlide: 2.
		},
		desktop: {
			breakpoint: { max: 768, min: 640 },
			items: 3,
			slidesToSlide: 2.
		},
		tablet: {
			breakpoint: { max: 640, min: 360 },
			items: 2,
			slidesToSlide: 1.
		},
		mobile: {
			breakpoint: { max: 360, min: 0 },
			items: 1,
			slidesToSlide: 1.
		}
	};

	// if (isLoaded) {
	// 	return <Loader template={true} numOfTemplate={16} />
	// }

	return (
		<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 lg">
			<div className="flex flex-row justify-between items-center w-full">
				<p className="text-primary text-sm sm:text-base lg:text-2xl font-bold">
					Featured <span className="text-pinky">Podcasts</span>
				</p>
				{/* <p className="text-success text-sm font-normal">
					View more
				</p> */}
			</div>
			<div className="my-2">
				{profiles?.length > 0 && (
					<>
						<Carousel responsive={responsive} transitionDuration={500} containerClass="h-full">
							{profiles?.map(
								({ user: { image, name, _id, profile_type }, topic_categories },
									index
								) => (
									<div key={index} className="h-60 w-full mx-2">
										<Featured
											key={index}
											image={image}
											name={name}
											type={profile_type}
											id={_id}
											handleClick={handleAddRecent}
											categories={topic_categories}
											isFavorite={!favorite?.includes(_id)}
											favorite={favorite}
											setFavorite={updateFavorite}
										/>
									</div>
								))}
						</Carousel>
					</>
				)}
			</div>

			<div div className="flex flex-row justify-between items-center w-full">
				<p className="text-primary text-sm sm:text-base lg:text-2xl font-bold">
					Your recently viewed podcasts
				</p>
				<Link href={'/recent'} className="text-success text-sm font-normal">
					View more
				</Link>
			</div>
			<div className="my-2">
				{recents.length > 0 && (
					<>
						<Carousel responsive={responsive} transitionDuration={500} containerClass="h-full">
							{recents.map(
								({ image, name, _id, profile_type },
									index
								) => (
									<div key={index} className="h-60 w-full mx-2">
										<Featured
											key={index}
											image={image}
											name={name}
											type={profile_type}
											id={_id}
											handleClick={handleAddRecent}
											isFavorite={!favorite?.includes(_id)}
											favorite={favorite}
											setFavorite={updateFavorite}
										/>
									</div>
								)
							)}
						</Carousel>
					</>
				)}
			</div>

			<div className="flex flex-row justify-between items-center w-full">
				<p className="text-primary text-sm sm:text-base lg:text-2xl  font-bold">
					Popular Podcasts, Recommended Just For <span className="text-pinky">You</span>
				</p>
				<Link href={'/find-podcast'} className="text-success text-sm font-normal">
					View more
				</Link>
			</div>
			<div className="my-2">
				{podcaster.length > 0 && (
					<>
						<Carousel responsive={responsive} transitionDuration={500} containerClass="h-full">
							{podcaster.map(
								(
									{
										user: { image, name, _id, profile_type },
										topic_categories,
									},
									index
								) => (
									<div key={index} className="h-60 w-full mx-2">
										<Featured
											key={index}
											image={image}
											name={name}
											type={profile_type}
											id={_id}
											handleClick={handleAddRecent}
											categories={topic_categories}
											isFavorite={!favorite?.includes(_id)}
											favorite={favorite}
											setFavorite={updateFavorite}
										/>
									</div>
								)
							)}
						</Carousel>
					</>
				)}
			</div>

			<div className="flex flex-row justify-between items-center">
				<p className="text-primary text-sm sm:text-base lg:text-2xl font-bold">
					Featured <span className="text-success">guests</span>
				</p>
				<Link href={'/find-guest'} className="text-success text-sm font-normal">
					View more
				</Link>
			</div>
			<div className="my-2">
				{guest.length > 0 && (
					<>
						<Carousel responsive={responsive} transitionDuration={500} containerClass="h-full">
							{guest.map(
								(
									{
										user: { image, name, _id, profile_type },
										topic_categories,
									},
									index
								) => (
									<div key={index} className="h-60 w-full mx-2">
										<Featured
											key={index}
											image={image}
											name={name}
											type={profile_type}
											id={_id}
											handleClick={handleAddRecent}
											categories={topic_categories}
											isFavorite={!favorite?.includes(_id)}
											favorite={favorite}
											setFavorite={updateFavorite}
										/>
									</div>
								)
							)}
						</Carousel>
					</>
				)}
			</div>
		</div >
	);
}