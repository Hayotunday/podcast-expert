"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Topbar = ({ name, image }) => {
	const [search, setSearch] = useState("");

	return (
		<div className="sticky top-0 flex flex-row w-full bg-white p-5 justify-between z-50">
			<label className="bg-grey p-1.5 px-2 rounded-md flex flex-row items-center w-[563px]">
				<input
					type="text"
					name="search"
					id="search"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					placeholder="search"
					className="bg-grey w-full"
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
			<div className="flex flex-row gap-5 items-center">
				<Link href={"/notification"}>
					<button
						type="button"
						className="bg-lightgreen p-3 rounded-lg"
						onClick={() => {}}
					>
						<Image
							src={"/svgs/bell.svg"}
							width={15}
							height={15}
							alt="Bell icon"
						/>
					</button>
				</Link>
				<p className="text-grey-100 font-bold capitalize">
					<span className="text-black">Hello!</span> {name}
				</p>
				<Link href={"/profile"}>
					<div className="rounded-full h-10 w-10">
						{image === "" ? (
							<div className="rounded-full bg-green-500 text-primary uppercase h-10 w-10 font-bold flex items-center justify-center">
								{name.charAt(0)}
							</div>
						) : (
							<img
								src={`data:image/png;charset=utf-8;base64,${image}`}
								id="img"
								alt="image"
								className="rounded-full h-10 w-10 flex items-center justify-center"
							/>
						)}
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
