"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import axios from "axios";

import { updateToken } from "@app/redux/features/auth/authSlice";

const Verified = ({ searchParams }) => {
	const { id, token } = searchParams;
	const dispatch = useDispatch();
	const router = useRouter();

	const [stat, setStat] = useState(false);

	useEffect(() => {
		const verifyMail = async () => {
			await axios
				.patch("http://localhost:5000/auth/verify-mail", {
					id,
					token,
				})
				.then((res) => {
					if (res.status === 200) {
						dispatch(updateToken(res.data.accessToken));
						localStorage.setItem("accessToken", res.data.accessToken);
						setStat(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		verifyMail();
	}, []);

	useEffect(() => {
		const reDirect = async () => {
			if (stat) {
				setTimeout(() => {
					router.push("/create-profile");
				}, 10000);
			}
		};

		reDirect();
	}, [stat]);

	return (
		<main className="flex min-h-screen bg-primary flex-col justify-around">
			<section className="w-full flex flex-col items-center justify-center gap-10">
				<Image
					src={"/images/pow.png"}
					width={213}
					height={90}
					className="fixed top-10"
					alt="Pow image"
				/>
				<div className="text-white text-center flex flex-col items-center gap-5">
					<Image
						src={"/svgs/verified.svg"}
						width={200}
						height={200}
						className=""
						alt="Verified image"
					/>
					<h1 className="text-success text-center font-bold text-4xl">
						{stat ? "Verified" : "Verifying"}
					</h1>
					<p className="text-success textcenter font-normal text-sm">
						You will be redirected when the verification is completed
					</p>
				</div>
			</section>

			<section className="fixed bottom-10 w-full">
				<div className="flex flex-row justify-between items-center px-10 w-full">
					<p className="text-white">
						Copyright©thepodcastexpert.co.uk 2023. All rights reserved.
					</p>
					<div className="flex flex-row items-center justify-between gap-3 text-white">
						<Link href={"#"} className="">
							<p className="">Terms and Conditions</p>
						</Link>
						<p className="text-2xl font-semibold text-success">|</p>
						<Link href={"#"} className="">
							<p className="">Privacy Policy</p>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Verified;
