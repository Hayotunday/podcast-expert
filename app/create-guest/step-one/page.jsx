"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Input from "@components/Input";
import Dropdown from "@components/Dropdown";

import { dropdown_options } from "@utils/data";

const Stepone = () => {
	const [headline, setHeadline] = useState("");
	const [mission, setMission] = useState("");
	const [about, setAbout] = useState("");
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [age, setAge] = useState("");
	const [city, setCity] = useState("");
	const [country, setCountry] = useState("");
	const [language, setLanguage] = useState("");
	const [category, setCategory] = useState("");
	const [email, setEmail] = useState("");

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
								src={"/svgs/edit.svg"}
								width={15}
								height={15}
								alt="Edit icon"
								className=""
								onClick={() => {}}
							/>
							<p className="text-primary font-semibold">Edit picture</p>
						</button>
					</div>

					<div className="w-3/4">
						<div className="w-11/12">
							<div className="text-primary">
								<h1 className="text-primary text-left text-4xl font-black">
									Create a <span className="text-pinky">guest</span> profile
								</h1>
								<p className="text-primary text-left text-sm font-normal -mt-1">
									More about you
								</p>
							</div>

							<div className="flex flex-col gap-7 items-center w-full">
								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Personal details
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Input
											onChangeValue={(e) => {
												setName(e.target.value);
											}}
											value={name}
											type="text"
											placeholder={"Full Name"}
										/>
										<Dropdown
											onChangeValue={(e) => {
												setGender(e);
											}}
											value={gender}
											placeholder={"Gender"}
											options={dropdown_options}
										/>
										<Input
											onChangeValue={(e) => {
												setAge(e.target.value);
											}}
											value={age}
											type="number"
											placeholder={"Age"}
										/>
										<Dropdown
											onChangeValue={(e) => {
												setCountry(e);
											}}
											value={country}
											placeholder={"Country"}
											options={dropdown_options}
										/>
										<Dropdown
											onChangeValue={(e) => {
												setCity(e);
											}}
											value={city}
											placeholder={"City"}
											options={dropdown_options}
										/>
										<Dropdown
											onChangeValue={(e) => {
												setLanguage(e);
											}}
											value={language}
											placeholder={"Language"}
											options={dropdown_options}
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
											<span className="peer-focus:text-blue-500 text-xs font-light absolute left-5 top-1">
												Personal headline
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										My podcast mission
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Why I want to be a great guest
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<div className="relative w-full">
											<textarea
												cols="30"
												rows="10"
												maxLength={2000}
												onChange={(e) => {
													setMission(e.target.value);
												}}
												className="w-full rounded-md peer bg-white border flex items-end text-grey-100 border-grey-100 px-6 pt-4
												text-sm outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
											<p className="text-sm font-medium text-right">
												{mission.length}/2000
											</p>
											<span className="peer-focus:text-blue-500 text-xs font-light absolute left-5 top-1">
												Podcast Mission
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										About me
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Tell others about yourself, your experience and the value
										you can bring to a conversation.
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
											<span className="peer-focus:text-blue-500 text-xs font-light absolute left-5 top-1">
												About me
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										My expert subjects
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
										Email contact
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Your personal Email, where podcasters can reach out to you
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Input
											onChangeValue={(e) => {
												setEmail(e.target.value);
											}}
											value={email}
											type="email"
											placeholder={"Email contact"}
										/>
									</div>
								</div>

								<button
									type="submit"
									onClick={() => {}}
									className="w-full h-12 mt-10 bg-success rounded-md text-primary"
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
