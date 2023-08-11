"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

const Createprofile = () => {
	const { email, access_token } = useSelector((state) => state.auth);
	const router = useRouter();

	const handleClick = async (opt) => {
		let text = "";
		if (opt === 1) {
			text = "Podcaster";
		} else if (opt === 2) {
			text = "Guest";
		} else if (opt === 3) {
			text = "Press";
		}

		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: { authorization: `Bearer ${token}` },
		};

		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type`,
				{
					profile_type: text,
				},
				config
			)
			.then((res) => {
				const { profile_type } = res.data;
				if (profile_type === "Podcaster") {
					router.push("/create-podcaster");
				} else if (profile_type === "Guest") {
					router.push("/create-guest");
				} else if (profile_type === "Press") {
					router.push("/create-press");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<main className="flex min-h-screen bg-create-profile bg-cover flex-col">
			<section className="flex flex-col items-center p-10 gap-7">
				<div className="mb-2 lg:hidden">
					<Image
						src={"/images/pow.png"}
						width={150}
						height={50}
						className="self-end"
						alt="Pow image"
					/>
				</div>

				<p className="text-primary text-center text-lg font-normal">
					Create a profile
				</p>
				<h1 className="text-primary font-black text-center text-3xl">
					Which best describes you?
				</h1>

				<div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
					<button
						type="button"
						onClick={() => {
							handleClick(1);
						}}
						className=""
					>
						<div className="border-4 rounded-xl border-secondary bg-white w-80 h-90 text-center flex flex-col items-center justify-around">
							<h1 className="text-2xl font-bold text-primary">
								I have a <span className="text-success">podcast</span>
							</h1>
							<p className="text-primary text-sm">
								I'm looking for great guests and may
								<br />
								also want to be a guest
							</p>
							<Image
								src={"/images/record.png"}
								width={200}
								height={200}
								alt="record image"
								className=""
							/>
						</div>
					</button>

					<button
						type="button"
						onClick={() => {
							handleClick(2);
						}}
						className=""
					>
						<div className="border-4 rounded-xl border-primary bg-white w-80 h-90 text-center flex flex-col items-center justify-around">
							<h1 className="text-2xl font-bold text-primary">
								I'm looking for note worthy
								<br />
								<span className="text-success">guests & podcasts</span>
							</h1>
							<p className="text-primary text-sm">
								I want to browse podcasts and great guests
							</p>
							<Image
								src={"/images/guest.png"}
								width={200}
								height={200}
								alt="Guest image"
								className=""
							/>
						</div>
					</button>

					{/* <button
						type="button"
						onClick={() => {
							handleClick(1);
						}}
						className="flex flex-col items-center justify-start pt-10 rounded-lg gap-5 border-4 border-pinky text-center w-5/6 lg:w-60 h-60 p-3 bg-white"
					>
						<h1 className="text-primary text-xl font-bold">Podcaster</h1>
						<p className="text-secondary text-base font-normal">
							I'm looking for great guests and may also want to be a guest
						</p>
					</button>
					<button
						type="button"
						onClick={() => {
							handleClick(2);
						}}
						className="flex flex-col items-center justify-start pt-10 rounded-lg gap-5 border-4 border-pinky text-center w-5/6 lg:w-60 h-60 p-3 bg-white"
					>
						<h1 className="text-primary text-xl font-bold">Guest</h1>
						<p className="text-secondary text-base font-normal">
							I'm looking for great podcasts to be a guest on
						</p>
					</button>
					<button
						type="button"
						onClick={() => {
							handleClick(3);
						}}
						className="flex flex-col items-center justify-start pt-10 rounded-lg gap-5 border-4 border-pinky text-center w-5/6 lg:w-60 h-60 p-3 bg-white"
					>
						<h1 className="text-primary text-xl font-bold">Press</h1>
						<p className="text-secondary text-base font-normal">
							I want to browse podcasts and great guests
						</p>
					</button> */}
				</div>
			</section>

			<section className="w-full mb-3 lg:mb-0 lg:fixed lg:bottom-3">
				<div className="flex flex-col lg:flex-row justify-between items-center px-10 w-full">
					<p className="text-primary text-center sm:text-left">
						Copyright©thepodcastexpert.co.uk 2023. All rights reserved.
					</p>
					<div className="flex flex-row items-center justify-center lg:justify-between gap-3 text-primary">
						<Link href={"#"} className="">
							<p className="">Terms and Conditions</p>
						</Link>
						<p className="text-2xl font-semibold text-pinky">|</p>
						<Link href={"#"} className="">
							<p className="">Privacy Policy</p>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Createprofile;
