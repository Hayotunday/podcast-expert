"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import { FiMenu } from "react-icons/fi";

const Topbar = ({ isOpen, setIsOpen }) => {
	const [search, setSearch] = useState("");
	const [user, setUser] = useState({ name: "", image: "" });
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const router = useRouter();

	const optiion = useRef();

	// const setFocus = () => {
	// 	if (document.activeElement === optiion.current) {
	// 		optiion.current.blur();
	// 	} else {
	// 		optiion.current.focus();
	// 	}
	// };

	const logOut = async () => {
		localStorage.removeItem("podcastMail");
		localStorage.removeItem("podcastId");
		localStorage.removeItem("podcastToken");

		await axios
			.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`)
			.then((res) => {
				if (res.status === 204) router.push("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					setUser({ name: res.data.user.name, image: res.data.user.image });
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	return (
		<div className="sticky top-0 flex flex-row w-full bg-white p-5 justify-between z-50">
			<div className="flex flex-row gap-2 w-full items-center">
				<button
					type="button"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
					className="flex lg:hidden"
				>
					<FiMenu size={30} />
				</button>
				<label className="bg-grey p-1.5 px-2 rounded-md flex flex-row items-center  lg:w-[563px] outline-0 focus:outline-0">
					<input
						type="text"
						name="search"
						id="search"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						placeholder="search"
						className="bg-grey w-full outline-0 focus:outline-0"
					/>
					<button
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
					</button>
				</label>
			</div>

			<div className="flex flex-row gap-5 items-center w-full justify-end mr-5">
				<p className="text-primary font-bold capitalize hidden sm:block">
					<span className="text-black">Hello!</span> {user.name}
				</p>
				{/* <Link href={"/profile"}> */}
				<div className="relative cursor-pointer">
					<div
						className="rounded-full h-10 w-10"
						onClick={() => setToggleDropdown((prev) => !prev)}
					>
						{user.image === "" ? (
							<div className="rounded-full bg-green-500 text-primary uppercase h-10 w-10 font-bold flex items-center justify-center">
								{user.name.charAt(0)}
							</div>
						) : (
							<img
								src={`data:image/png;charset=utf-8;base64,${user.image}`}
								id="img"
								alt="image"
								className="rounded-full h-10 w-10 flex items-center justify-center"
							/>
						)}
					</div>
					{/* {toggleDropdown && (
						<div
							ref={optiion}
							className="absolute right-0 top-full mt-2 w-40 p-5 rounded-lg bg-white shadow shadow-black min-w-[210px] flex flex-col gap-2 justify-end items-end"
						>
							<Link
								href={"/profile"}
								className="text-sm text-primary hover:text-white hover:bg-blue-500 font-medium w-full p-1 pr-3 rounded-xl text-right"
								onClick={() => setToggleDropdown(false)}
							>
								My Profile
							</Link>
							<Link
								href={"/notification"}
								className="text-sm text-primary hover:text-white hover:bg-blue-500 font-medium w-full p-1 pr-3 rounded-xl text-right"
								onClick={() => setToggleDropdown(false)}
							>
								My Notification
							</Link>
							<Link
								href={"#"}
								className="text-sm text-primary hover:text-white hover:bg-blue-500 font-medium w-full p-1 pr-3 rounded-xl text-right"
								onClick={() => setToggleDropdown(false)}
							>
								My Settings
							</Link>
							<button
								type="button"
								onClick={() => {
									setToggleDropdown(false);
									logOut();
								}}
								className="mt-3 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm flex items-center justify-center"
							>
								Sign Out
							</button>
						</div>
					)} */}
				</div>
				{/* </Link> */}
			</div>
		</div>
	);
};

export default Topbar;
