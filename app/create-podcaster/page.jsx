"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { AiOutlineLeft } from "react-icons/ai";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

import Input from "@components/Input";
import Dropdown from "@components/Dropdown";

import { category_options } from "@utils/data";

const CreatePodcaster = () => {
	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [category, setCategory] = useState("");
	const [date, setDate] = useState(new Date());
	const [bio, setBio] = useState("");
	const [recPrefers, setRecPrefers] = useState([]);
	const [newRecPrefer, setNewRecPrefer] = useState("");
	const [episodes, setEpisodes] = useState([]);
	const [newEpisode, setNewEpisode] = useState("");
	const [social, setSocial] = useState({
		facebook: "",
		instagram: "",
		linkedin: "",
		twitter: "",
		youtube: "",
	});
	const [interview, setInterview] = useState("");
	const [promo, setPromo] = useState("");
	const [guestVal, setGuestVal] = useState(null);

	const { facebook, instagram, linkedin, twitter, youtube } = social;

	const changeTwitter = (e) => {
		setSocial({ ...social, twitter: e.target.value });
	};
	const changeFacebook = (e) => {
		setSocial({ ...social, facebook: e.target.value });
	};
	const changeYoutube = (e) => {
		setSocial({ ...social, youtube: e.target.value });
	};
	const changeInstagram = (e) => {
		setSocial({ ...social, instagram: e.target.value });
	};
	const changeLinkedin = (e) => {
		setSocial({ ...social, linkedin: e.target.value });
	};

	const handleSave = async () => {
		const token = localStorage.getItem("accessToken");
		const id = localStorage.getItem("podcastId");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.post(
				"https://podcastbackend-kj4h.onrender.com/user/profile-type/add",
				{
					profile_type: "Podcaster",
					podcast_name: name,
					user: id,
					topic_categories: category,
					podcast_link: link,
					bio: bio,
					highlights: [],
					social_media: social,
					transmission_date: [],
					guest_bio: "",
					booking_details: [],
					episode_links: episodes,
					record_preference: recPrefers,
					promo_expect: promo,
					need_guest: guestVal,
				},
				config
			)
			.then((res) => {
				if (res.status === 201) {
					router.push("/");
				}
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const token = localStorage.getItem("accessToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get("https://podcastbackend-kj4h.onrender.com/user/profile", config)
				.then((res) => {
					localStorage.setItem("podcastId", res.data.user._id);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	return (
		<>
			<div className="bg-success w-screen h-full p-16 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/create-profile"} className="">
						<div>
							<AiOutlineLeft size={22} className="text-primary" />
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="text-primary self-center text-center mb-5 w-full">
					<h1 className="text-primary text-left text-4xl font-black w-full">
						Create podcaster <span className="text-success">profile</span>
					</h1>
					<p className="text-primary text-left text-sm font-normal -mt-1 w-full">
						Tell guests a little More about you
					</p>
				</div>

				<div className="flex flex-row gap-10">
					<div className="w-1/2 flex flex-col gap-5">
						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Podcast Name
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="w-full mt-3">
								<Input
									placeholder={"podcast name"}
									onChangeValue={(e) => {
										setName(e.target.value);
									}}
									value={name}
									type="text"
								/>
							</div>
						</div>

						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Category of Podcast
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="w-full mt-3">
								<Dropdown
									onChangeValue={(e) => {
										setCategory(e);
									}}
									options={category_options}
									placeholder={"category"}
									value={category}
								/>
							</div>
						</div>

						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Link to Podcast Channel
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="w-full mt-3">
								<Input
									placeholder={"podcast link"}
									onChangeValue={(e) => {
										setLink(e.target.value);
									}}
									value={link}
									type="url"
								/>
							</div>
						</div>

						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Short Bio about yourself
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="relative w-full mt-3">
								<textarea
									cols="30"
									rows="10"
									maxLength={2000}
									onChange={(e) => {
										setBio(e.target.value);
									}}
									className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4 
												text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
								></textarea>
								<p className="text-sm font-medium text-right text-primary">
									{bio.length}/2000
								</p>
								<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
									short bio
								</span>
							</div>
						</div>

						<div className="w-full">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Interview Link
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="mt-3">
								<Input
									onChangeValue={(e) => {
										setInterview(e.target.value);
									}}
									placeholder={"interview link"}
									value={interview}
									type="url"
								/>
							</div>
						</div>

						<div className="w-full flex flex-col items-start">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Social media
								</h2>
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
					</div>

					<div className="w-1/2 flex flex-col gap-8">
						<div className="w-full flex flex-col items-start mt-5">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Are guests expected to post on social media?
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="flex flex-col w-full gap-2 mt-3">
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={true}
										onChange={(e) => {
											setPromo(true);
										}}
										checked={promo === true}
									/>
									<span className="text-primary text-base font-semibold">
										Yes, I do
									</span>
								</div>
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={false}
										onChange={(e) => {
											setPromo(false);
										}}
										checked={promo === false}
									/>
									<span className="text-primary text-base font-semibold">
										No, I don't
									</span>
								</div>
							</div>
						</div>

						<div className="w-full flex flex-col items-start mt-5">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Do you need guests?
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="flex flex-col w-full gap-2 mt-3">
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={true}
										onChange={(e) => {
											setGuestVal(true);
										}}
										checked={guestVal == true}
									/>
									<span className="text-primary text-base font-semibold">
										Yes, I do
									</span>
								</div>
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={false}
										onChange={(e) => {
											setGuestVal(false);
										}}
										checked={guestVal == false}
									/>
									<span className="text-primary text-base font-semibold">
										No, I don't
									</span>
								</div>
							</div>
						</div>

						{/* <div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Transmission Date and time
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="w-full mt-3">
								<DateTimePicker
									value={date}
									onChange={(e) => {
										console.log(e.target.value);
									}}
								/>
							</div>
						</div> */}

						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Link to important episodes
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="w-full mt-3 flex flex-col gap-1">
								{episodes.map((episode, index) => (
									<div
										key={index}
										className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
									>
										<p className="text-base font-medium z-0 truncate break-words">
											{episode}
										</p>
										<button
											type="button"
											className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
											onClick={() => {
												const tempArr = [...episodes];
												tempArr.splice(index, 1);
												setEpisodes(tempArr);
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
									value={newEpisode}
									onChange={(e) => {
										setNewEpisode(e.target.value);
									}}
									placeholder="Unique Preferences"
									className="h-12 w-full mt-5 rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline
								outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
								/>
								<button
									type="button"
									onClick={() => {
										setEpisodes([...episodes, newEpisode]);
										setNewEpisode("");
									}}
									disabled={newEpisode === ""}
									className="w-full h-12 mt-3 flex flex-row items-center justify-center gap-2 bg-primary disabled:bg-grey-300 rounded-md text-success disabled:text-grey-100 text-base font-semibold"
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
											fill={newEpisode === "" ? "#868686" : "#00CCBB"}
										/>
									</svg>
									Add Episode Link
								</button>
							</div>
						</div>

						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Your recording preferences
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>
							<div className="w-full mt-3 flex flex-col gap-1">
								{recPrefers.map((recPrefer, index) => (
									<div
										key={index}
										className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
									>
										<p className="text-base font-medium z-0 truncate break-words">
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
									className="w-full h-12 mt-3 flex flex-row items-center justify-center gap-2 bg-primary disabled:bg-grey-300 rounded-md text-success disabled:text-grey-100 text-base font-semibold"
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
											fill={newRecPrefer === "" ? "#868686" : "#00CCBB"}
										/>
									</svg>
									Add Preference
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-end">
					<button
						type="button"
						onClick={() => {
							handleSave();
						}}
						className="self-end mt-10 w-32 h-12 bg-primary rounded-md text-success"
					>
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export default CreatePodcaster;
