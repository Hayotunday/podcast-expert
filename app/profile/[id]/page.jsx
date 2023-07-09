"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Tag from "@components/Tag";
import Indicator from "@components/Indicator";

const Guest = () => {
	const [tab, setTab] = useState(1);

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

				<div className="flex flex-row gap-5">
					<div className="rounded-xl">
						<Image
							src={"/images/profilepic.png"}
							width={250}
							height={250}
							alt="Profile picture"
							className=""
						/>
					</div>

					<div className="flex-col flex justify-between">
						<div className="flex flex-col">
							<div className="flex flex-row gap-3 items-end">
								<h1 className="text-primary text-5xl font-black">
									Andrea Gomez
								</h1>
								<Indicator mode={"offline"} />
							</div>

							<p className="text-grey-100 text-sm font-semibold">
								Andreagomez@gmail.com
							</p>
						</div>

						<p className="text-primary text-base font-medium text-left">
							She aspires to create user-centred designs that are sympathetic to{" "}
							<br /> their needs and consistent with the objectives of the
							business.
						</p>

						<div className="flex flex-row gap-3 items-center">
							<Tag text={"Design"} />
							<Tag text={"Visual Arts"} />
							<Tag text={"Business"} />
							<Tag text={"Entrepreneurship"} />
						</div>

						<p className="flex flex-row items-center gap-2 text-grey-100 text-sm font-light">
							<Image
								src={"/svgs/location.svg"}
								width={15}
								height={15}
								alt="location pin"
								className=""
							/>{" "}
							Las Vegas, United States
						</p>

						<div className="flex flex-row gap-5">
							<button
								type="button"
								onClick={() => {}}
								className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
							>
								<Image
									src={"/svgs/share.svg"}
									width={15}
									height={15}
									alt="share icon"
									className=""
								/>
								<p className="text-primary font-semibold">Share profile</p>
							</button>
							<button
								type="button"
								className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
								onClick={() => {}}
							>
								<Image
									src={"/svgs/edit.svg"}
									width={15}
									height={15}
									alt="Edit icon"
									className=""
								/>
								<p className="text-primary font-semibold">Edit picture</p>
							</button>
						</div>
					</div>
				</div>

				<div className="mt-5">
					<div className="flex flex-row gap-4">
						<button
							type="button"
							className={
								tab === 1
									? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
									: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
							}
							onClick={() => setTab(1)}
						>
							<p className="font-semibold capitalize">About Me</p>
						</button>
						<button
							type="button"
							className={
								tab === 2
									? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
									: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
							}
							onClick={() => setTab(2)}
						>
							<p className="font-semibold capitalize">Availability</p>
						</button>
						<button
							type="button"
							className={
								tab === 3
									? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
									: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
							}
							onClick={() => setTab(3)}
						>
							<p className="font-semibold capitalize">Links</p>
						</button>
					</div>
					{tab === 1 && (
						<div className="flex flex-col gap-3 pt-5 pl-2">
							<p className="text-primary text-base font-medium text-left">
								She aspires to create user-centred designs that are sympathetic
								to <br /> their needs and consistent with the objectives of the
								business.
							</p>
							<div className="text-primary">
								<h1 className="text-3xl font-bold">Gender</h1>
								<p className="text-base font-light">Female</p>
							</div>
						</div>
					)}
					{tab === 2 && (
						<div className="flex flex-col gap-3 pt-5 pl-2">
							<p className="text-base font-light">
								I have a recording slot open now
							</p>
						</div>
					)}
					{tab === 3 && (
						<div className="flex flex-col gap-3 pt-5 pl-2">
							<ul className="flex flex-col gap-3">
								<li className="flex flex-row gap-3">
									<Image
										src={"/svgs/facebookii.svg"}
										width={40}
										height={40}
										alt="Facebook icon"
										className=""
									/>
									<a
										href=""
										className="text-primary text-left text-base font-normal"
									></a>
								</li>
								<li className="flex flex-row gap-3">
									<Image
										src={"/svgs/instagram.svg"}
										width={40}
										height={40}
										alt="Instagram icon"
										className=""
									/>
									<a
										href=""
										className="text-primary text-left text-base font-normal"
									></a>
								</li>
								<li className="flex flex-row gap-3">
									<Image
										src={"/svgs/linkedin.svg"}
										width={40}
										height={40}
										alt="LinkedIn icon"
										className=""
									/>
									<a
										href=""
										className="text-primary text-left text-base font-normal"
									></a>
								</li>
								<li className="flex flex-row gap-3">
									<Image
										src={"/svgs/twitter.svg"}
										width={40}
										height={40}
										alt="Twitter icon"
										className=""
									/>
									<a
										href=""
										className="text-primary text-left text-base font-normal"
									></a>
								</li>
								<li className="flex flex-row gap-3">
									<Image
										src={"/svgs/youtube.svg"}
										width={40}
										height={40}
										alt="Youtube icon"
										className=""
									/>
									<a
										href=""
										className="text-primary text-left text-base font-normal"
									></a>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Guest;
