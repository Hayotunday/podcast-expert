"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		const getUserDetails = async () => {
			await axios
				.get("https://podcastbackend-kj4h.onrender.com/user")
				.then((res) => {
					// setProfiles(res.data.users);
					console.log(res);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);
	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="grid grid-col-5 gap-10">
					{profiles.length > 0 ? (
						""
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
			</div>
		</>
	);
}
