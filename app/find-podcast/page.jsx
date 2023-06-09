"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Podcasts from "@components/Podcasts";
import Dropdown from "@components/Dropdown";

import { dropdown_options, podcastList } from "@utils/data";

const Findpodcast = () => {
	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [value, setValue] = useState("");

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/"} className="">
						<div>
							<Image
								src={"/svgs/leftarrow.svg"}
								width={10}
								height={10}
								alt="Left arrow to go back"
								className=""
							/>
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="h-full">
					<p className="text-primary text-4xl font-black">
						Find <span className="text-success">Podcasts</span>
					</p>

					<div className="flex flex-row items-center justify-between my-3">
						<div className="flex flex-row items-center gap-3">
							<div className="w-48">
								<Dropdown
									options={dropdown_options}
									value={category}
									onChangeValue={(e) => {
										setCategory(e);
									}}
									placeholder={"Categories"}
								/>
							</div>
							<div className="w-48">
								<Dropdown
									options={dropdown_options}
									value={location}
									onChangeValue={(e) => {
										setLocation(e);
									}}
									placeholder={"Location"}
								/>
							</div>
							<div className="w-48">
								<Dropdown
									options={dropdown_options}
									value={value}
									onChangeValue={(e) => {
										setValue(e);
									}}
									placeholder={"New"}
								/>
							</div>
						</div>
						{/* <div className="w-48">
									<Filter />
								</div> */}
					</div>

					<div className="">
						<p className="text-pinky text-lg font-bold">
							Featured <span className="text-primary">podcasts</span>
						</p>
					</div>

					<div className="grid grid-cols-4 gap-5 relative">
						{podcastList.map((list, index) => (
							<div key={index} className="">
								<Podcasts
									image={list.image}
									podcaster={list.podcaster}
									title={list.title}
								/>
							</div>
						))}
					</div>

					{/* <div className="w-40">
						<Dropdown
							options={dropdown_options}
							value={value}
							onChangeValue={setOption}
							placeholder={"Gender"}
						/>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default Findpodcast;
