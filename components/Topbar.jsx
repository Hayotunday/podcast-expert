"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Topbar = () => {
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
					placeholder="Search podcasts"
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
				<p className="text-grey-100 font-bold">
					<span className="text-black">Hello!</span> Andrea Gomez
				</p>
				<div className="rounded-full bg-green-500 text-primary h-10 w-10 font-bold flex items-center justify-center">
					AG
				</div>
			</div>
		</div>
	);
};

export default Topbar;
