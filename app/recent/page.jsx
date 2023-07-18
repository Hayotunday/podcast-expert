"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Featured from "@components/Featured";

export default function Home() {
	const [recent, setRecent] = useState([]);

	useEffect(() => {
		const getRecents = async () => {
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/recents`, config)
				.then((res) => {
					// console.log(res.data);
					setRecent(res.data);
				})
				.catch((err) => console.log(err));
		};

		getRecents();
	}, []);

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				{recent.length > 0 ? (
					<div className="grid min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5">
						{recent.map(({ image, name, _id, profile_type }, index) => (
							<div key={index} className="h-60 w-full">
								<Featured
									key={index}
									image={image}
									name={name}
									type={profile_type}
									id={_id}
								/>
							</div>
						))}
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
