"use client";

import { usePathname, useRouter } from "next/navigation";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Topbar from "@components/Topbar";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Loader from "@components/Loader";

export default function Root({ children }) {
	const pathname = usePathname();
	const router = useRouter();

	const [user, setUser] = useState({ name: "", image: "" });
	const [isLoaded, setIsLoaded] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
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

		const checks = async () => {
			if (
				token === "" &&
				pathname !== "/login" &&
				pathname !== "/signup" &&
				pathname !== "/verify-email" &&
				pathname !== "/verified" &&
				pathname !== "/password/completed" &&
				pathname !== "/password/create" &&
				pathname !== "/password/forgot" &&
				pathname !== "/password/reset"
			) {
				router.push(`/login?return=${pathname}`);
				setIsLoaded(false);
			}

			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					if (res.data.user.createProfile === false) {
						router.push(`/create-profile`);
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setIsLoaded(false));
		};

		checks();
	}, []);

	if (isLoaded) {
		return (
			<div className="w-screen h-screen">
				<Loader />;
			</div>
		);
	}

	return (
		<>
			{pathname !== "/login" &&
			pathname !== "/signup" &&
			pathname !== "/verify-email" &&
			pathname !== "/verified" &&
			pathname !== "/create-profile" &&
			pathname !== "/password/completed" &&
			pathname !== "/password/create" &&
			pathname !== "/password/forgot" &&
			pathname !== "/password/reset" &&
			pathname !== "/create-guest" &&
			pathname !== "/create-guest/edit" &&
			pathname !== "/create-podcaster" &&
			pathname !== "/create-podcaster/edit" &&
			pathname !== "/create-press" &&
			pathname !== "/create-press/edit" ? (
				<main className="bg-grey h-screen w-screen">
					<section className="flex flex-row w-full h-full">
						{innerWidth > 0 && innerWidth < 1024 ? (
							isOpen && <Nav setIsOpen={setIsOpen} />
						) : (
							<Nav />
						)}

						<section className="w-full h-full relative overflow-x-hidden z-0 lg:z-10">
							<Topbar isOpen={isOpen} setIsOpen={setIsOpen} />

							<div className="w-full h-full p-5 flex flex-col gap-7">
								{children}
							</div>
						</section>
					</section>
					{/* 
					{pathname !== "/login" &&
			pathname !== "/signup" &&
			pathname !== "/verify-email" &&
			pathname !== "/verified" &&
			pathname !== "/create-profile" &&
			pathname !== "/password/completed" &&
			pathname !== "/password/create" &&
			pathname !== "/password/forgot" &&
			pathname !== "/password/reset" &&
			pathname !== "/create-guest" &&
			pathname !== "/create-guest/edit" &&
			pathname !== "/create-podcaster" &&
			pathname !== "/create-podcaster/edit" &&
			pathname !== "/create-press" &&
			pathname !== "/create-press/edit" &&(
					<Footer />)} */}
				</main>
			) : (
				children
			)}
		</>
	);
}
