"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Featured from "@components/Featured";

export default function Home() {
	const [profiles, setProfiles] = useState([]);
	const [id, setId] = useState("");

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const getUserDetails = async () => {
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles`)
				.then((res) => {
					const prof = res.data.filter((i) => {
						return localStorage.getItem("podcastId") !== i.user._id;
					});
					// console.log("profiles: ", prof);
					setProfiles(prof);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				{profiles.length > 0 ? (
					<div className="grid min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
						{profiles.map(
							(
								{ user: { image, name, _id, profile_type }, topic_categories },
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
									/>
								</div>
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
						/>
						<p className="text-center text-primary font-semibold text-lg">
							No data found
						</p>
					</div>
				)}
			</div>
		</>
	);
}
