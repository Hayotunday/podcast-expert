"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Input from "@components/Input";

const Steptwo = () => {
	const [prefers, setPrefers] = useState([]);
	const [newPrefer, setNewPrefer] = useState("");
	const [recPrefers, setRecPrefers] = useState([]);
	const [newRecPrefer, setNewRecPrefer] = useState("");
	const [firstCheck, setFirstCheck] = useState(false);
	const [secondCheck, setSecondCheck] = useState(false);
	const [recordVal, setRecordVal] = useState("");
	const [twitter, setTwitter] = useState("");
	const [facebook, setFacebook] = useState("");
	const [youtube, setYoutube] = useState("");
	const [instagram, setInstagram] = useState("");
	const [linkedin, setLinkedin] = useState("");

	const changeTwitter = (e) => {
		setTwitter(e.target.value);
	};
	const changeFacebook = (e) => {
		setFacebook(e.target.value);
	};
	const changeYoutube = (e) => {
		setYoutube(e.target.value);
	};
	const changeInstagram = (e) => {
		setInstagram(e.target.value);
	};
	const changeLinkedin = (e) => {
		setLinkedin(e.target.value);
	};

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/create-guest/step-one"} className="">
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

				<div className="flex flex-row justify-end mr-32">
					<div className="w-9/12">
						<div className="flex flex-col gap-7 items-center w-full">
							<div className="w-full mt-5 flex flex-col items-end">
								<div className="w-11/12">
									<h2 className="text-primary text-2xl font-bold text-left">
										Social media
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Add up your social media links and allow potential
										collaborators to discover more.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-full gap-2 mt-3">
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/twitter.svg"}
											width={40}
											height={40}
											alt="Facebook icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={changeTwitter}
												value={twitter}
												type="url"
												inputholder={"twitter.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/facebookii.svg"}
											width={40}
											height={40}
											alt="Facebook icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={changeFacebook}
												value={facebook}
												type="url"
												inputholder={"facbook.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/youtube.svg"}
											width={40}
											height={40}
											alt="Youtube icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={changeYoutube}
												value={youtube}
												type="url"
												inputholder={"youtube.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/instagram.svg"}
											width={40}
											height={40}
											alt="Instagram icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={changeInstagram}
												value={instagram}
												type="url"
												inputholder={"instagram.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/linkedin.svg"}
											width={40}
											height={40}
											alt="Facebook icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={changeLinkedin}
												value={linkedin}
												type="url"
												inputholder={"linkedin.com/in/"}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-11/12">
									<h2 className="text-primary text-2xl font-bold text-left">
										Previous interviews/press
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Add links to your profile of podcast episodes you've been
										featured in and let hosts see what you're made of.
									</p>
									<h2 className="text-primary text-lg font-bold text-left">
										Add up to 5 to your profile.
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-11/12 gap-2 mt-3">
									{prefers.map((prefer, index) => (
										<div
											key={index}
											className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
										>
											<p className="text-base font-medium truncate break-words">
												{prefer}
											</p>
											<button
												type="button"
												className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
												onClick={() => {
													const tempArr = [...prefers];
													tempArr.splice(index, 1);
													setPrefers(tempArr);
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
										value={newPrefer}
										onChange={(e) => {
											setNewPrefer(e.target.value);
										}}
										placeholder="Your link of guests appearance"
										className="h-12 w-full mt-5 rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline
											outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
									/>
									<button
										type="button"
										onClick={() => {
											setPrefers([...prefers, newPrefer]);
											setNewPrefer("");
										}}
										disabled={newPrefer === ""}
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
												fill={newPrefer === "" ? "#868686" : "#232E60"}
											/>
										</svg>
										Add link of guests appearance
									</button>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-11/12">
									<h2 className="text-primary text-2xl font-bold text-left">
										Recording preferences
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-11/12 gap-2 mt-3">
									<div className="flex flex-row items-center gap-3">
										<input
											type="checkbox"
											onChange={() => {
												setFirstCheck(!firstCheck);
											}}
											checked={firstCheck === true}
											className="border-primary h-5 w-5"
										/>
										<span className="text-primary text-base font-semibold">
											Only online
										</span>
									</div>
									<div className="flex flex-row items-center gap-3">
										<input
											type="checkbox"
											onChange={() => {
												setSecondCheck(!secondCheck);
											}}
											checked={secondCheck === true}
											className="border-primary h-5 w-5"
										/>
										<span className="text-primary text-base font-semibold">
											In Person
										</span>
									</div>

									{recPrefers.map((recPrefer, index) => (
										<div
											key={index}
											className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
										>
											<p className="text-base font-medium truncate break-words">
												{recPrefer}
											</p>
											<button
												type="button"
												className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
												onClick={() => {
													const tempArr = [...recPrefers];
													tempArr.splice(index, 1);
													setRecPrefers(tempArr);
												}}
											>
												<Image
													src={"/svgs/cancel.svg"}
													width={15}
													height={15}
													alt="cancel icon"
												/>
											</button>
										</div>
									))}
									<input
										type="text"
										value={newRecPrefer}
										onChange={(e) => {
											setNewRecPrefer(e.target.value);
										}}
										placeholder="Unique Preferences"
										className="h-12 w-full mt-5 rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline
											outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
									/>
									<button
										type="button"
										onClick={() => {
											setRecPrefers([...recPrefers, newRecPrefer]);
											setNewRecPrefer("");
										}}
										disabled={newRecPrefer === ""}
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
												fill={newRecPrefer === "" ? "#868686" : "#232E60"}
											/>
										</svg>
										Add Preference
									</button>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-11/12">
									<h2 className="text-primary text-2xl font-bold text-left">
										Do you have a podcast?
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-11/12 gap-2 mt-3">
									<div className="flex flex-row items-center gap-3">
										<input
											type="radio"
											value="Yes, I do"
											onChange={(e) => {
												setRecordVal(e.target.value);
												console.log(e.target.value);
											}}
											checked={recordVal === "Yes, I do"}
										/>
										<span className="text-primary text-base font-semibold">
											Yes, I do
										</span>
									</div>
									<div className="flex flex-row items-center gap-3">
										<input
											type="radio"
											value="No, I don't"
											onChange={(e) => {
												setRecordVal(e.target.value);
												console.log(e.target.value);
											}}
											checked={recordVal === "No, I don't"}
										/>
										<span className="text-primary text-base font-semibold">
											No, I don't
										</span>
									</div>
								</div>
							</div>

							<button
								type="submit"
								onClick={() => {}}
								className="w-11/12 self-end mt-10 h-12 bg-success rounded-md text-primary"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Steptwo;
