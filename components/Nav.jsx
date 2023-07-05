"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<section className="w-1/6 bg-primary">
			<nav className="w-full sticky top-0 flex flex-col pt-5 px-3 items-center">
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
				<button
					type="button"
					className="text-white text-center bg-success w-full flex flex-row items-center justify-center gap-3 p-2 rounded-sm mt-2"
				>
					<Image
						src={"/svgs/plus.svg"}
						width={15}
						height={15}
						alt="Plus icon"
					/>
					Create list
				</button>

				<div className="w-full mt-12">
					<p className="text-white text-left uppercase text-sm font-normal">
						MENU
					</p>
					<Link
						href={"/find-podcast"}
						className={
							pathname !== "/find-podcast"
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
						<p className="text-white text-center">Find podcaster</p>
					</Link>
					<Link
						href={"/find-guests"}
						className={
							pathname !== "/find-guests"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/person.svg"}
							width={15}
							height={15}
							alt="Person icon"
						/>
						<p className="text-white text-center">Find guests</p>
					</Link>
					<hr className="mt-2" />
				</div>

				<div className="w-full mt-12">
					<p className="text-white text-left uppercase text-sm font-normal">
						LIBRARY
					</p>
					<Link
						href={"#"}
						className={
							pathname !== "/"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/favorite.svg"}
							width={15}
							height={15}
							alt="Favorite icon"
						/>
						<p className="text-white text-center">Favorites</p>
					</Link>
					<Link
						href={"/saved-list"}
						className={
							pathname !== "/saved-list"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/saved.svg"}
							width={15}
							height={15}
							alt="Saved icon"
						/>
						<p className="text-white text-center">Saved lists</p>
					</Link>
					<Link
						href={"#"}
						className={
							pathname !== "/"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/recent.svg"}
							width={15}
							height={15}
							alt="Recent icon"
						/>
						<p className="text-white text-center">Recents</p>
					</Link>
					<hr className="mt-2" />
				</div>

				<div className="w-ful mt-10">
					<div className="w-full rounded-lg flex flex-row bg-pinky p-3">
						<div className="flex flex-col">
							<p className="text-primary text-left">
								Join the facebook community
							</p>
							<Link
								href={"#"}
								className="rounded-md w-fit h-fit p-1 bg-primary"
							>
								<p className="text-white text-center">Join now</p>
							</Link>
						</div>
						<div className="flex flex-col justify-end">
							<h1 className="text-primary font-extrabold text-7xl">f</h1>
						</div>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default Nav;
