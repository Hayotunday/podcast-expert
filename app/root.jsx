"use client";

import { usePathname, useRouter } from "next/navigation";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Topbar from "@components/Topbar";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

export default function Root({ children }) {
	const pathname = usePathname();
	const router = useRouter();

	const [user, setUser] = useState({ name: "", image: "" });

	useEffect(() => {
		const token =
			localStorage.getItem("accessToken") === undefined ||
			localStorage.getItem("accessToken") === null
				? ""
				: localStorage.getItem("accessToken");

		const isloggedIn = () => {
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
			}
		};

		isloggedIn();
	}, []);

	useEffect(() => {
		const getUserDetails = async () => {
			const token = localStorage.getItem("accessToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get("http://localhost:5000/user/profile", config)
				.then((res) => {
					setUser({ name: res.data.user.name, image: res.data.user.image });
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

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
			pathname !== "/create-podcaster" &&
			pathname !== "/create-press" &&
			pathname !== "/create-guest/step-two" &&
			pathname !== "/create-podcaster/step-two" ? (
				<main className="flex min-h-screen w-screen flex-col">
					<section className="flex flex-row w-full">
						<Nav />

						<section className="w-full relative overflow-hidden">
							<Topbar name={user.name} image={user.image} />

							<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
								{children}
							</div>
						</section>
					</section>

					<Footer />
				</main>
			) : (
				children
			)}
		</>
	);
}
