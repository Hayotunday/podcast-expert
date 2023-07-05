"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Input from "@components/Input";
import Dropdown from "@components/Dropdown";

import { dropdown_options } from "@utils/data";

const Stepone = () => {
	const [headline, setHeadline] = useState("");
	const [about, setAbout] = useState("");
	const [newlink, setNewlink] = useState("");
	const [links, setLinks] = useState([]);
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [podcast, setPodcast] = useState("");

	return (
		<>
			<div className="bg-grey h-full p-5 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/create-profile"} className="">
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

				<div className="flex flex-row gap-28">
					<div className="w-1/4 flex flex-col items-center justify-start gap-5">
						<div className="w-60 h-60 rounded-xl bg-success items-center justify-center flex">
							<Image
								src={"/svgs/profile.svg"}
								width={100}
								height={100}
								alt="profile icon"
								className=""
							/>
						</div>
						<button
							type="button"
							className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
						>
							<Image
								src={"/svgs/upload.svg"}
								width={15}
								height={15}
								alt="Edit icon"
								className=""
								onClick={() => {}}
							/>
							<p className="text-primary font-semibold">Upload picture</p>
						</button>
					</div>

					<div className="w-3/4">
						<div className="w-11/12 overflow-hidden">
							<div className="text-primary">
								<h1 className="text-primary text-left text-4xl font-black">
									Create podcaster <span className="text-success">profile</span>
								</h1>
								<p className="text-primary text-left text-sm font-normal -mt-1">
									Tell guests a little More about you
								</p>
							</div>

							<div className="flex flex-col gap-7 items-center overflow-hidden w-full">
								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Podcast details
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Input
											onChangeValue={(e) => {
												setName(e.target.value);
											}}
											value={name}
											type="text"
											placeholder={"Podcast Name"}
										/>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Profile headline
									</h2>
									<p className="text-primary text-sm font-light text-left">
										This is your quick elevator pitch, a chance to stand out.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<div className="relative w-full">
											<textarea
												cols="30"
												rows="5"
												maxLength={120}
												onChange={(e) => {
													setHeadline(e.target.value);
												}}
												className="w-full rounded-md peer bg-white border flex items-end text-grey-100 border-grey-100 px-6 pt-4 
												text-sm outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
											<p className="text-sm font-medium text-right">
												{headline.length}/120
											</p>
											<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
												Personal headline
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										About me
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Tell others about your podcast and yourself.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<div className="relative w-full">
											<textarea
												cols="30"
												rows="10"
												maxLength={2000}
												onChange={(e) => {
													setAbout(e.target.value);
												}}
												className="w-full rounded-md peer bg-white border flex items-end text-grey-100 border-grey-100 px-6 pt-4 
												text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
											<p className="text-sm font-medium text-right">
												{about.length}/2000
											</p>
											<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
												About me
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Catergories
									</h2>
									<p className="text-primary text-sm font-light text-left">
										What areas would you like to talk about?
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Dropdown
											onChangeValue={(e) => {
												setCategory(e);
											}}
											value={category}
											placeholder={"Category"}
											options={dropdown_options}
										/>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Your URL
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Your personal URL where podcasters can reach out to you
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Input
											onChangeValue={(e) => {
												setPodcast(e.target.value);
											}}
											value={podcast}
											type="url"
											placeholder={"Podcast Name"}
										/>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Links to key episodes
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Your link tour key episodes
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="overflow-hidden w-full flex flex-col gap-2 mt-3">
										{links.map((link, index) => (
											<div
												key={index}
												className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
											>
												<p className="text-base font-medium truncate break-words">
													{link}
												</p>

												<button
													type="button"
													className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
													onClick={() => {
														const tempArr = [...links];
														tempArr.splice(index, 1);
														setLinks(tempArr);
													}}
												>
													<Image
														src={"/svgs/cancel.svg"}
														width={15}
														height={15}
														alt="Search icon"
													/>
												</button>
											</div>
										))}
										<input
											type="url"
											name=""
											id=""
											value={newlink}
											onChange={(e) => {
												setNewlink(e.target.value);
											}}
											placeholder="Enter link"
											className="h-12 w-full mt-5 rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline
											outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
										/>
									</div>
									<button
										type="button"
										onClick={() => {
											setLinks([...links, newlink]);
											setNewlink("");
										}}
										disabled={newlink === ""}
										className="w-full h-12 mt-5 flex flex-row items-center justify-center gap-2 bg-success disabled:bg-grey-300 rounded-md text-primary disabled:text-grey-100 text-base font-semibold"
									>
										<svg
											width="15"
											height="15"
											viewBox="0 0 12 12"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V5.25H1C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585787 6.75 1 6.75H5.25V11C5.25 11.4142 5.58579 11.75 6 11.75C6.41421 11.75 6.75 11.4142 6.75 11V6.75H11C11.4142 6.75 11.75 6.41421 11.75 6C11.75 5.58579 11.4142 5.25 11 5.25H6.75V1Z"
												fill={newlink === "" ? "#868686" : "#232E60"}
											/>
										</svg>
										Add Link
									</button>
								</div>

								<button
									type="submit"
									onClick={() => {}}
									className="w-full h-12 mt-10 bg-success rounded-md text-primary text-base font-semibold"
								>
									Continue
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Stepone;
