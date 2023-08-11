"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { updateSearch } from "@app/redux/features/search/searchSlice";

import AdminNav from "@components/AdminNav";
import Featured from "@components/Featured";
import Loader from "@components/Loader";

const AdminHome = () => {
	const { searched } = useSelector((state) => state.search);

	const router = useRouter();
	const dispatch = useDispatch();

	const [id, setId] = useState("");
	const [profiles, setProfiles] = useState([]);
	const [search, setSearch] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);

	useEffect(() => {
		const checks = async () => {
			const token = localStorage.getItem("podcastToken");
			setId(localStorage.getItem("podcastId"));
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then(async (res) => {
					if (!res.data.user.isAdmin) router.push("/");

					await axios
						.get(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles?category=""&location=""`
						)
						.then((res) => {
							const prof = res?.data?.filter((i) => {
								return id !== i.user._id;
							});
							setProfiles(prof);
						})
						.catch((err) => console.log(err))
						.finally(() => {
							setIsLoaded(false);
						});
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoaded(false);
				});
		};

		checks();
	}, []);

	useEffect(() => {
		const getSearched = async () => {
			const categories = profiles?.filter((i) => {
				for (let index = 0; index < i.topic_categories.length; index++) {
					return searched === i?.topic_categories[index];
				}
			});
			const users = profiles?.filter((i) => {
				return i.user.name.includes(searched);
			});

			const prof = [...users, ...categories];
			setSearch(prof);
			// setProfiles(prof);
		};

		getSearched();
	}, [searched, profiles]);

	// if (isLoaded) {
	// 	return (
	// 		<div className="w-screen h-screen">
	// 			<Loader />;
	// 		</div>
	// 	);
	// }

	return (
		<main className="flex flex-row w-full h-screen">
			<AdminNav />
			<section className="w-full">
				<div className="p-5">
					<label className="bg-grey p-1.5 px-2 rounded-md flex flex-row items-center  lg:w-[563px] outline-0 focus:outline-0">
						<input
							type="text"
							name="search"
							id="search"
							value={""}
							onChange={(e) => {
								dispatch(updateSearch(e.target.value));
							}}
							placeholder="search"
							className="bg-grey w-full outline-0 focus:outline-0"
						/>
						{/* <button
							type="button"
							className="bg-lightgreen p-1.5 rounded-md"
							onClick={() => {}}
						>
							<Image
								src={"/svgs/search.svg"}
								width={15}
								height={15}
								alt="Search icon"
							/>
						</button> */}
					</label>
				</div>
				<div className=" p-10">
					{isLoaded ? (
						<div className="w-full h-full flex items-center justify-center">
							<Loader />
						</div>
					) : profiles.length > 0 ? (
						<div className="grid min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">
							{searched ? (
								search.length !== 0 ? (
									search.map(
										(
											{
												user: { image, name, _id, profile_type },
												topic_categories,
											},
											index
										) => (
											<div key={index} className="h-60 w-full">
												<Featured
													key={index}
													image={image}
													name={name}
													type={profile_type}
													id={_id}
													categories={topic_categories}
													isAdmin={true}
												/>
											</div>
										)
									)
								) : (
									<div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
										<Image
											src={"/images/cloud.png"}
											width={225}
											height={225}
											className=""
											alt="No data image"
											priority
										/>
										<p className="text-center text-primary font-semibold text-lg">
											No data found
										</p>
									</div>
								)
							) : (
								profiles.map(
									(
										{
											user: { image, name, _id, profile_type },
											topic_categories,
										},
										index
									) => (
										<div key={index} className="h-60 w-full">
											<Featured
												key={index}
												image={image}
												name={name}
												type={profile_type}
												id={_id}
												categories={topic_categories}
												isAdmin={true}
											/>
										</div>
									)
								)
							)}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
							<Image
								src={"/images/cloud.png"}
								width={225}
								height={225}
								className=""
								alt="No data image"
								priority
							/>
							<p className="text-center text-primary font-semibold text-lg">
								No data found
							</p>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default AdminHome;
