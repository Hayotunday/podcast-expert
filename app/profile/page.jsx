"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import Loader from "@components/Loader";
import Tag from "@components/Tag";
import { category_options } from "@utils/data";
import Dropdown from "@components/Dropdown";
import { useRouter } from "next/navigation";

const Guest = () => {
	const router = useRouter();

	const [isLoaded, setIsLoaded] = useState(true);
	const [copied, setCopied] = useState(false);
	const [showAddCat, setShowAddCate] = useState(false);
	const [tab, setTab] = useState(1);
	const [id, setId] = useState("");
	const [data, setData] = useState({});
	const [category, setCategory] = useState("");

	const inputFile = useRef(null);

	const onButtonClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
	};

	useEffect(() => {
		const getUserDetails = async () => {
			setId(localStorage.getItem("podcastId"));
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/my-profile`,
					config
				)
				.then((res) => {
					// console.log(res.data);
					setData(res.data);
					// console.log(
					// 	`${process.env.NEXT_PUBLIC_BASE_URL}/Images/${res.data.user.image}`
					// );
				})
				.finally(() => {
					setIsLoaded(false);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	const handleImageChange = async (data) => {
		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "multipart/form-data",
			},
		};
		const form = new FormData();
		form.append("image", data);
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/image`,
				form,
				config
			)
			.then((res) => {
				router.refresh();
			})
			.catch((err) => console.log(err));
	};

	const handleAddCategory = async () => {
		var categories = [];
		if (!data.topic_categories.includes(category)) {
			data.topic_categories = [...data.topic_categories, category];
		}

		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/category`,
				{ category: data.topic_categories },
				config
			)
			.then((res) => {
				router.refresh();
			})
			.catch((err) => console.log(err));
	};

	if (isLoaded) {
		return <Loader />;
	}

	return (
		<>
			{data.user.profile_type === "Guest" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative">
					<div className="flex flex-row items-center gap-10 justify-start self-start lg:ml-5">
						<Link href={"/"} className="">
							<div>
								<Image
									src={"/svgs/leftarrow.svg"}
									width={10}
									height={10}
									alt="Left arrow to go back"
									className=""
								/>
							</div>
						</Link>
						<p className="text-primary text-base font-normal">Back</p>
					</div>

					<div className="flex flex-col md:flex-row gap-5">
						<div className="flex flex-col items-center">
							<div className="rounded-full h-32 sm:h-60 w-32 sm:w-60">
								{data.user.image ? (
									<img
										src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data.user.image}`}
										id="img"
										alt="image"
										className="rounded-full h-full w-full flex items-center justify-center"
									/>
								) : (
									<div className="rounded-full bg-green-500 text-primary uppercase h-32 sm:h-60 w-32 sm:w-60 text-7xl sm:text-9xl font-bold flex items-center justify-center">
										{data.user.name.charAt(0)}
									</div>
								)}
							</div>
							<input
								type="file"
								id="file"
								ref={inputFile}
								accept="image/*"
								style={{ display: "none" }}
								onChange={(e) => {
									e.preventDefault();
									handleImageChange(e.target.files[0]);
								}}
							/>
							{/* <button
								type="button"
								onClick={onButtonClick}
								className="bg-success flex flex-row gap-3 justify-center items-center rounded-lg p-2 self-center my-2"
							>
								<Image
									src={"/svgs/upload.svg"}
									width={15}
									height={15}
									alt="upload image"
									className=""
								/>
								<p className="text-primary font-semibold">Change Avatar</p>
							</button> */}
						</div>

						<div className="flex-col flex justify-between">
							<div className="flex flex-col">
								<div className="flex flex-row gap-3 items-end">
									<h1 className="text-primary text-5xl font-black text-center sm:text-left capitalize">
										{data.user.name}
									</h1>
								</div>

								<p className="text-grey-100 text-sm text-center sm:text-left font-semibold">
									{data.user.email}
								</p>
							</div>

							{data.short_bio && (
								<p className="text-primary text-base font-medium text-center sm:text-left">
									{data.short_bio}
								</p>
							)}

							<div className="grid grid-cols-3 sm:flex sm:flex-row gap-3 items-center justify-center sm:justify-start relative mb-5 sm:mb-0">
								{data.topic_categories.map((cate, index) => (
									<Tag key={index} text={cate} />
								))}
								<div className="relative">
									<button
										type="button"
										onClick={() => {
											setShowAddCate(true);
										}}
										className="bg-success rounded-2xl py-2 px-3 flex flex-row gap-3 items-center justify-center"
									>
										<Image
											src={"/svgs/add.svg"}
											width={15}
											height={15}
											alt="add icon"
											className=""
										/>
										<p className="text-primary text-center text-sm font-light">
											add
										</p>
									</button>
									{showAddCat && (
										<div className="absolute top-10 rounded-lg shadow shadow-slate-800 w-60 p-3 bg-white">
											<h1 className="text-primary font-semibold text-lg text-center">
												Add new category
											</h1>
											<div className="w-full">
												<Dropdown
													onChangeValue={(e) => {
														setCategory(e);
													}}
													options={category_options}
													placeholder={"category"}
													value={category}
												/>
											</div>
											<div className="w-full flex flex-row gap-2 mt-3">
												<button
													className="w-1/2 bg-red-500 rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
													}}
													type="button"
												>
													Cancel
												</button>
												<button
													className="w-1/2 bg-success rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
														handleAddCategory();
													}}
													type="button"
												>
													Save
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="flex flex-row gap-5">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
								>
									<Image
										src={"/svgs/share.svg"}
										width={15}
										height={15}
										alt="share icon"
										className=""
									/>
									<p className="text-primary font-semibold">
										{!copied ? "Share profile" : "link copied!"}
									</p>
								</button>
								<Link href={"/create-guest/edit"}>
									<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
										<Image
											src={"/svgs/edit.svg"}
											width={15}
											height={15}
											alt="Edit icon"
											className=""
										/>
										<p className="text-primary font-semibold">Edit picture</p>
									</div>
								</Link>
							</div>
						</div>
					</div>

					<div className="mt-5">
						<div className="flex flex-row gap-4">
							<button
								type="button"
								className={
									tab === 1
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(1)}
							>
								<p className="font-semibold capitalize">About Me</p>
							</button>
							{/* <button
								type="button"
								className={
									tab === 2
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(2)}
							>
								<p className="font-semibold capitalize">Availability</p>
							</button> */}
							<button
								type="button"
								className={
									tab === 3
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(3)}
							>
								<p className="font-semibold capitalize">Links</p>
							</button>
						</div>
						{tab === 1 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-xl font-bold">Experience</h1>
								<p className="text-primary text-base font-medium text-left">
									{data.experience_bio}
								</p>
								<h1 className="text-primary text-xl font-bold">Mission</h1>
								<p className="text-primary text-base font-medium text-left">
									{data.mission}
								</p>
								<h1 className="text-primary text-xl font-bold">
									Recording preference
								</h1>
								<ul className="text-primary text-base font-medium text-left">
									{data.record_preference.map((pref, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span> {pref}
										</li>
									))}
								</ul>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">
										Own Podcast
									</h1>
									<p className="text-primary text-base font-medium text-left">
										{data.own_podcast ? "Yes" : "No"}
									</p>
								</div>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="font-bold text-xl text-primary">Contact me</h1>
									<p className="text-primary">
										{data.contact_me ? "Yes" : "No"}
									</p>
								</div>
							</div>
						)}
						{tab === 2 && (
							<div className="flex flex-col gap-3 pt-5 pl-2">
								<p className="text-base font-light">
									{data.user.profile_type === "Guest" &&
										"I am open for podcast interviews"}
									{data.user.profile_type === "Podcaster" &&
										"I have a recording slot open now"}
									{data.user.profile_type === "Press" && ""}
								</p>
							</div>
						)}
						{tab === 3 && (
							<div className="flex flex-col gap-3 pt-5 pl-2">
								<h1 className="text-primary text-xl font-bold">Social Media</h1>
								<ul className="flex flex-col gap-3">
									{data.social_media.facebook && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/facebookii.svg"}
												width={30}
												height={30}
												alt="Facebook icon"
												className=""
											/>
											<a
												href={data.social_media.facebook}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.facebook}
											</a>
										</li>
									)}
									{data.social_media.instagram && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/instagram.svg"}
												width={30}
												height={30}
												alt="Instagram icon"
												className=""
											/>
											<a
												href={data.social_media.instagram}
												target="_blank"
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.instagram}
											</a>
										</li>
									)}
									{data.social_media.linkedin && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/linkedin.svg"}
												width={30}
												height={30}
												alt="LinkedIn icon"
												className=""
											/>
											<a
												href={data.social_media.linkedin}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.linkedin}
											</a>
										</li>
									)}
									{data.social_media.twitter && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/twitter.svg"}
												width={30}
												height={30}
												alt="Twitter icon"
												className=""
											/>
											<a
												href={data.social_media.twitter}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.twitter}
											</a>
										</li>
									)}
									{data.social_media.youtube && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/youtube.svg"}
												width={30}
												height={30}
												alt="Youtube icon"
												className=""
											/>
											<a
												href={data.social_media.youtube}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.youtube}
											</a>
										</li>
									)}
								</ul>
								<h1 className="text-primary text-xl font-bold">
									Previous Interviews
								</h1>
								<ul className="text-primary text-base font-medium text-left mb-5">
									{data.interview_links.map((interview, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span>{" "}
											{interview}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			)}

			{data.user.profile_type === "Podcaster" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative">
					<div className="flex flex-row items-center gap-10 justify-start self-start lg:ml-5">
						<Link href={"/"} className="">
							<div>
								<Image
									src={"/svgs/leftarrow.svg"}
									width={10}
									height={10}
									alt="Left arrow to go back"
									className=""
								/>
							</div>
						</Link>
						<p className="text-primary text-base font-normal">Back</p>
					</div>

					<div className="flex flex-col md:flex-row gap-5">
						<div className="flex flex-col items-center">
							<div className="rounded-full h-32 sm:h-60 w-32 sm:w-60">
								{data.user.image ? (
									<img
										src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data.user.image}`}
										id="img"
										alt="image"
										className="rounded-full h-full w-full flex items-center justify-center"
									/>
								) : (
									<div className="rounded-full bg-green-500 text-primary uppercase h-32 sm:h-60 w-32 sm:w-60 text-7xl sm:text-9xl font-bold flex items-center justify-center">
										{data.user.name.charAt(0)}
									</div>
								)}
							</div>
							<input
								type="file"
								id="file"
								ref={inputFile}
								accept="image/*"
								style={{ display: "none" }}
								onChange={(e) => {
									e.preventDefault();
									handleImageChange(e.target.files[0]);
								}}
							/>
							{/* <button
								type="button"
								onClick={onButtonClick}
								className="bg-success flex flex-row gap-3 justify-center items-center rounded-lg p-2 self-center my-2"
							>
								<Image
									src={"/svgs/upload.svg"}
									width={15}
									height={15}
									alt="upload image"
									className=""
								/>
								<p className="text-primary font-semibold">Change Avatar</p>
							</button> */}
						</div>

						<div className="flex-col flex justify-between">
							<div className="flex flex-col text-center sm:text-left">
								<div className="flex flex-row gap-3 items-end">
									<h1 className="text-primary text-5xl font-black capitalize">
										{data.user.name}
									</h1>
								</div>

								<p className="text-grey-100 text-sm font-semibold">
									{data.user.email}
								</p>
							</div>

							{data.bio && (
								<p className="text-primary text-base font-medium  text-center sm:text-left">
									{data.bio}
								</p>
							)}

							<div className="grid grid-cols-3 sm:flex sm:flex-row gap-3 items-center justify-center sm:justify-start relative mb-5 sm:mb-0">
								{data.topic_categories.map((cate, index) => (
									<Tag key={index} text={cate} />
								))}
								<div className="relative">
									<button
										type="button"
										onClick={() => {
											setShowAddCate(true);
										}}
										className="bg-success rounded-2xl py-2 px-3 flex flex-row gap-3 items-center justify-center"
									>
										<Image
											src={"/svgs/add.svg"}
											width={15}
											height={15}
											alt="add icon"
											className=""
										/>
										<p className="text-primary text-center text-sm font-light">
											add
										</p>
									</button>
									{showAddCat && (
										<div className="absolute top-10 rounded-lg shadow shadow-slate-800 w-60 p-3 bg-white">
											<h1 className="text-primary font-semibold text-lg text-center">
												Add new category
											</h1>
											<div className="w-full">
												<Dropdown
													onChangeValue={(e) => {
														setCategory(e);
													}}
													options={category_options}
													placeholder={"category"}
													value={category}
												/>
											</div>
											<div className="w-full flex flex-row gap-2 mt-3">
												<button
													className="w-1/2 bg-red-500 rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
													}}
													type="button"
												>
													Cancel
												</button>
												<button
													className="w-1/2 bg-success rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
														handleAddCategory();
													}}
													type="button"
												>
													Save
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="flex flex-row gap-5">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
								>
									<Image
										src={"/svgs/share.svg"}
										width={15}
										height={15}
										alt="share icon"
										className=""
									/>
									<p className="text-primary font-semibold">
										{copied ? "Link copied!" : "Share profile"}
									</p>
								</button>
								<Link href={"/create-podcaster/edit"}>
									<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
										<Image
											src={"/svgs/edit.svg"}
											width={15}
											height={15}
											alt="Edit icon"
											className=""
										/>
										<p className="text-primary font-semibold">Edit picture</p>
									</div>
								</Link>
							</div>
						</div>
					</div>

					<div className="mt-5">
						<div className="flex flex-row gap-4">
							<button
								type="button"
								className={
									tab === 1
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(1)}
							>
								<p className="font-semibold capitalize">About Me</p>
							</button>
							<button
								type="button"
								className={
									tab === 2
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(2)}
							>
								<p className="font-semibold capitalize">podcast</p>
							</button>
							<button
								type="button"
								className={
									tab === 3
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(3)}
							>
								<p className="font-semibold capitalize">Links</p>
							</button>
						</div>
						{tab === 1 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-xl font-bold">
									Recording preference
								</h1>
								<ul className="text-primary text-base font-medium text-left">
									{data.record_preference.map((pref, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span> {pref}
										</li>
									))}
								</ul>
							</div>
						)}
						{tab === 2 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">
										Podcast Name
									</h1>
									<p className="text-primary text-base font-medium text-left">
										{data.podcast_name}
									</p>
								</div>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">Need Guest</h1>
									<p className="text-primary text-base font-medium text-left">
										{data.need_guest ? "Yes" : "No"}
									</p>
								</div>
								<h1 className="text-primary text-xl font-bold">
									Booking Details
								</h1>
								{data.booking_details.lenght > 0 ? (
									<ul className="text-primary text-base font-medium text-left">
										{data.booking_details.map((pref, index) => (
											<li
												key={index}
												className="flex flex-row items-center gap-2"
											>
												<span className="text-base">{index + 1}.</span> {pref}
											</li>
										))}
									</ul>
								) : (
									<p className="text-primary text-base font-medium text-left">
										Not available
									</p>
								)}
								<h1 className="font-bold text-lg text-primary">
									Guest Expectation
								</h1>
								<p className="text-primary text-base font-medium text-left">
									{data.guest_bio ? data.guest_bio : "Not available"}
								</p>
								<p className="text-primary">{data.guest_bio}</p>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="font-bold text-lg text-primary">
										Expect guest to promo
									</h1>
									<p className="text-primary">
										{data.promo_expect ? "Yes" : "No"}
									</p>
								</div>
							</div>
						)}
						{tab === 3 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-xl font-bold">Social Media</h1>
								<ul className="flex flex-col gap-3">
									{data.social_media.facebook && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/facebookii.svg"}
												width={30}
												height={30}
												alt="Facebook icon"
												className=""
											/>
											<a
												href={data.social_media.facebook}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.facebook}
											</a>
										</li>
									)}
									{data.social_media.instagram && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/instagram.svg"}
												width={30}
												height={30}
												alt="Instagram icon"
												className=""
											/>
											<a
												href={data.social_media.instagram}
												target="_blank"
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.instagram}
											</a>
										</li>
									)}
									{data.social_media.linkedin && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/linkedin.svg"}
												width={30}
												height={30}
												alt="LinkedIn icon"
												className=""
											/>
											<a
												href={data.social_media.linkedin}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.linkedin}
											</a>
										</li>
									)}
									{data.social_media.twitter && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/twitter.svg"}
												width={30}
												height={30}
												alt="Twitter icon"
												className=""
											/>
											<a
												href={data.social_media.twitter}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.twitter}
											</a>
										</li>
									)}
									{data.social_media.youtube && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/youtube.svg"}
												width={30}
												height={30}
												alt="Youtube icon"
												className=""
											/>
											<a
												href={data.social_media.youtube}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.youtube}
											</a>
										</li>
									)}
								</ul>
								<h1 className="text-primary text-xl font-bold">
									Previous Episodes
								</h1>
								<ul className="text-primary text-base font-medium text-left">
									{data.episode_links.map((interview, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span>{" "}
											{interview}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			)}

			{data.user.profile_type === "Press" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative">
					<div className="flex flex-row items-center gap-10 justify-start self-start lg:ml-5">
						<Link href={"/"} className="">
							<div>
								<Image
									src={"/svgs/leftarrow.svg"}
									width={10}
									height={10}
									alt="Left arrow to go back"
									className=""
								/>
							</div>
						</Link>
						<p className="text-primary text-base font-normal">Back</p>
					</div>

					<div className="flex flex-col md:flex-row gap-5">
						<div className="flex flex-col items-center">
							<div className="rounded-full h-40 sm:h-60 w-40 sm:w-60">
								{data.user.image ? (
									<img
										src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${data.user.image}`}
										id="img"
										alt="image"
										className="rounded-full h-full w-full flex items-center justify-center"
									/>
								) : (
									<div className="rounded-full bg-green-500 text-primary uppercase h-32 sm:h-60 w-32 sm:w-60 text-7xl sm:text-9xl font-bold flex items-center justify-center">
										{data.user.name.charAt(0)}
									</div>
								)}
							</div>
							<input
								type="file"
								id="file"
								ref={inputFile}
								accept="image/*"
								style={{ display: "none" }}
								onChange={(e) => {
									e.preventDefault();
									handleImageChange(e.target.files[0]);
								}}
							/>
							{/* <button
								type="button"
								onClick={onButtonClick}
								className="bg-success flex flex-row gap-3 justify-center items-center rounded-lg p-2 self-center my-2"
							>
								<Image
									src={"/svgs/upload.svg"}
									width={15}
									height={15}
									alt="upload image"
									className=""
								/>
								<p className="text-primary font-semibold">Change Avatar</p>
							</button> */}
						</div>

						<div className="flex-col flex justify-between">
							<div className="flex flex-col text-center sm:text-left">
								<div className="flex flex-row gap-3 items-end">
									<h1 className="text-primary text-5xl font-black capitalize">
										{data.user.name}
									</h1>
								</div>

								<p className="text-grey-100 text-sm font-semibold">
									{data.user.email}
								</p>
							</div>

							{data.short_bio && (
								<p className="text-primary text-base font-medium text-center sm:text-left">
									{data.short_bio}
								</p>
							)}

							<div className="flex flex-row gap-3 items-center"></div>

							<div className="flex flex-row gap-5">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
								>
									<Image
										src={"/svgs/share.svg"}
										width={15}
										height={15}
										alt="share icon"
										className=""
									/>
									<p className="text-primary font-semibold">
										{copied ? "Link copied!" : "Share profile"}
									</p>
								</button>
								<Link href={"/create-press/edit"}>
									<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
										<Image
											src={"/svgs/edit.svg"}
											width={15}
											height={15}
											alt="Edit icon"
											className=""
										/>
										<p className="text-primary font-semibold">Edit picture</p>
									</div>
								</Link>
							</div>
						</div>
					</div>

					<div className="mt-5">
						<div className="flex flex-row gap-4">
							<button
								type="button"
								className={
									tab === 1
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(1)}
							>
								<p className="font-semibold capitalize">About Me</p>
							</button>
							{/* <button
								type="button"
								className={
									tab === 2
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(2)}
							>
								<p className="font-semibold capitalize">Availability</p>
							</button> */}
							<button
								type="button"
								className={
									tab === 3
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(3)}
							>
								<p className="font-semibold capitalize">Links</p>
							</button>
						</div>
						{tab === 1 && (
							<div className="flex flex-col gap-3 pt-5 pl-2">
								<h1 className="text-primary text-xl font-bold">Experience</h1>
								<p className="text-primary text-base font-medium text-left">
									{data.experience}
								</p>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">
										Own Podcast
									</h1>
									<p className="text-primary text-base font-medium text-left">
										{data.own_podcast ? "Yes" : "No"}
									</p>
								</div>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="font-bold text-lg text-primary">Contact me</h1>
									<p className="text-primary">
										{data.contact_me ? "Yes" : "No"}
									</p>
								</div>
							</div>
						)}
						{tab === 2 && (
							<div className="flex flex-col gap-3 pt-5 pl-2">
								<div className="flex flex-row gap-5 items-center">
									<h1 className="font-bold text-lg text-primary">Contact me</h1>
									<p className="text-primary">
										{data.contact_me ? "Yes" : "No"}
									</p>
								</div>
							</div>
						)}
						{tab === 3 && (
							<div className="flex flex-col gap-3 pt-5 pl-2">
								<h1 className="text-primary text-xl font-bold">Social Media</h1>
								<ul className="flex flex-col gap-3">
									{data.social_media.facebook && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/facebookii.svg"}
												width={30}
												height={30}
												alt="Facebook icon"
												className=""
											/>
											<a
												href={data.social_media.facebook}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.facebook}
											</a>
										</li>
									)}
									{data.social_media.instagram && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/instagram.svg"}
												width={30}
												height={30}
												alt="Instagram icon"
												className=""
											/>
											<a
												href={data.social_media.instagram}
												target="_blank"
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.instagram}
											</a>
										</li>
									)}
									{data.social_media.linkedin && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/linkedin.svg"}
												width={30}
												height={30}
												alt="LinkedIn icon"
												className=""
											/>
											<a
												href={data.social_media.linkedin}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.linkedin}
											</a>
										</li>
									)}
									{data.social_media.twitter && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/twitter.svg"}
												width={30}
												height={30}
												alt="Twitter icon"
												className=""
											/>
											<a
												href={data.social_media.twitter}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.twitter}
											</a>
										</li>
									)}
									{data.social_media.youtube && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/youtube.svg"}
												width={30}
												height={30}
												alt="Youtube icon"
												className=""
											/>
											<a
												href={data.social_media.youtube}
												className="text-primary text-left text-base font-normal"
											>
												{data.social_media.youtube}
											</a>
										</li>
									)}
								</ul>
								<h1 className="text-primary text-xl font-bold">
									Previous Interviews
								</h1>
								<ul className="text-primary text-base font-medium text-left">
									{data.interview_links.map((interview, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span>{" "}
											{interview}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Guest;
