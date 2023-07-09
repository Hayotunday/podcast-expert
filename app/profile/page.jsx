"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import Indicator from "@components/Indicator";
import Loader from "@components/Loader";
import Tag from "@components/Tag";

const Guest = () => {
	const [isLoaded, setIsLoaded] = useState(true);
	const [tab, setTab] = useState(1);
	const [id, setId] = useState("");
	const [data, setData] = useState({});

	useEffect(() => {
		const getUserDetails = async () => {
			setId(localStorage.getItem("podcastId"));
			const token = localStorage.getItem("accessToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get("http://localhost:5000/user/profile-type/my-profile", config)
				.then((res) => {
					setData(res.data);
				})
				.finally(() => {
					setIsLoaded(false);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	if (isLoaded) {
		return <Loader />;
	}

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
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

				<div className="flex flex-row gap-5">
					<div className="rounded-xl">
						<Image
							src={"/images/profilepic.png"}
							width={250}
							height={250}
							alt="Profile picture"
							className=""
						/>
					</div>

					<div className="flex-col flex justify-between">
						<div className="flex flex-col">
							<div className="flex flex-row gap-3 items-end">
								<h1 className="text-primary text-5xl font-black capitalize">
									{data.user.name}
								</h1>
							</div>

							<p className="text-grey-100 text-sm font-semibold">
								{data.user.email}
							</p>
						</div>

						<p className="text-primary text-base font-medium text-left">
							{data.short_bio}
						</p>

						<div className="flex flex-row gap-3 items-center">
							{data.category.map((cate, index) => (
								<Tag key={index} text={cate} />
							))}
							{id === data.user._id && (
								<button
									type="button"
									onClick={() => {}}
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
										add category
									</p>
								</button>
							)}
						</div>

						<div className="flex flex-row gap-5">
							<button
								type="button"
								onClick={() => {}}
								className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
							>
								<Image
									src={"/svgs/share.svg"}
									width={15}
									height={15}
									alt="share icon"
									className=""
								/>
								<p className="text-primary font-semibold">Share profile</p>
							</button>
							{id === data.user._id && (
								<button
									type="button"
									className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
									onClick={() => {}}
								>
									<Image
										src={"/svgs/edit.svg"}
										width={15}
										height={15}
										alt="Edit icon"
										className=""
									/>
									<p className="text-primary font-semibold">Edit picture</p>
								</button>
							)}
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
							<p className="font-semibold capitalize">Availability</p>
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
						<div className="flex flex-col gap-3 pt-5 pl-2">
							<h1 className="text-primary text-lg font-bold">Experience</h1>
							<p className="text-primary text-base font-medium text-left">
								{data.experience_bio}
							</p>
							<h1 className="text-primary text-lg font-bold">
								Recording preference
							</h1>
							<ul className="text-primary text-base font-medium text-left">
								{data.record_preference.map((pref, index) => (
									<li key={index} className="flex flex-row items-center gap-2">
										<span className="text-base">{index + 1}.</span> {pref}
									</li>
								))}
							</ul>
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
							<ul className="flex flex-col gap-3">
								{data.social_media.facebook && (
									<li className="flex flex-row gap-3 items-center hover:underline">
										<Image
											src={"/svgs/facebookii.svg"}
											width={40}
											height={40}
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
											width={40}
											height={40}
											alt="Instagram icon"
											className=""
										/>
										<a
											href={data.social_media.instagram}
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
											width={40}
											height={40}
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
											width={40}
											height={40}
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
											width={40}
											height={40}
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
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Guest;
