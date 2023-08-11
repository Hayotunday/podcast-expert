"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

const AdminNav = ({ handleClick, navRef }) => {
	const pathname = usePathname();
	const router = useRouter();

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

	return (
		<section className="w-1/5 bg-primary">
			<nav className=" w-full p-5">
				<Link href={"#"} className="flex items-center justify-center">
					<div className="">
						<Image
							src={"/images/pow.png"}
							width={143.32}
							height={60.29}
							alt="Pow image"
							className=""
						/>
					</div>
				</Link>

				<div className="w-full mt-8">
					<Link
						href={"/admin"}
						className={
							pathname !== "/admin"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/podcaster.svg"}
							width={15}
							height={15}
							alt="Podcaster icon"
						/>
						<p className="text-white text-center">Home</p>
					</Link>
					<hr className="mt-2" />

					{/* <Link
						href={"/admin/settings"}
						className={
							pathname !== "/admin/settings"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<FiSettings size={20} color="#00CCBB" />
						<p className="text-white text-center">Settings</p>
					</Link>
					<hr className="mt-2" /> */}

					<div className="w-full mt-12">
						<button
							onClick={() => {
								// setToggleDropdown(false);
								logOut();
							}}
							className="w-full flex flex-row p-2 gap-5 items-center justify-start rounded text-white hover:bg-white hover:bg-opacity-10"
						>
							<BiLogOut size={20} color="#00CCBB" />
							<p className="text-white text-center">Sign Out</p>
						</button>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default AdminNav;
