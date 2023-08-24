"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import AdminNav from "@components/AdminNav";
import Input from "@components/Input";

const DeleteAccount = ({ changeValue, value, handleDelete, handleCancel }) => {
	return (
		<div className="h-screen w-screen bg-transparent flex items-center justify-center absolute">
			<div className="h-fit w-fit p-5 bg-white-smoke rounded-lg shadow-2xl shadow-black flex flex-col gap-5">
				<p className="text-xs text-right font-normal ">
					Confirm Admin Password to delete account
				</p>
				<Input
					inputholder={"enter admin password"}
					placeholder={"admin password"}
					onChangeValue={(e) => {
						changeValue(e);
					}}
					value={value}
					secureText
				/>
				<div className="flex flex-row gap-5 items-center justify-end">
					<button
						type="button"
						className="p-2 rounded-lg text-sm text-center font-medium bg-white text-primary"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						className="p-2 rounded-lg text-sm text-center font-medium bg-red-500 text-white"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

const ChangePassword = ({
	changePassValue,
	passValue,
	changeAdminValue,
	adminValue,
	handleClick,
	handleCancel,
}) => {
	return (
		<div className="h-screen w-screen bg-transparent flex items-center justify-center absolute">
			<div className="h-fit w-fit p-5 bg-white-smoke rounded-lg shadow-2xl shadow-black flex flex-col gap-5">
				<p className="text-xs text-right font-normal ">
					Enter new user password and confirm Admin Password to change user password
				</p>
				<Input
					inputholder={"enter new password"}
					placeholder={"new password"}
					onChangeValue={(e) => {
						changePassValue(e);
					}}
					value={passValue}
					secureText
				/>
				<Input
					inputholder={"enter admin password"}
					placeholder={"admin password"}
					onChangeValue={(e) => {
						changeAdminValue(e);
					}}
					value={adminValue}
					secureText
				/>
				<div className="flex flex-row gap-5 items-center justify-end">
					<button
						type="button"
						className="p-2 rounded-lg text-sm text-center font-medium bg-white text-primary"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						className="p-2 rounded-lg text-sm text-center font-medium bg-primary text-white"
						onClick={handleClick}
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
};

const Details = () => {
	const searchParams = useSearchParams();
	const [data, setData] = useState();
	const [id, setId] = useState();
	const [newPass, setNewPass] = useState("");
	const [password, setPassword] = useState("");
	const [isloaded, setIsLoaded] = useState();

	const [showDelete, setShowDelete] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const user = searchParams.get("user");

	const router = useRouter();

	useEffect(() => {
		const checks = async () => {
			const token = localStorage.getItem("podcastToken");
			setId(localStorage.getItem("podcastId"));
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then(async (res) => {
					if (!res.data.user.isAdmin) router.push("/");

					await axios
						.get(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/${user}`
						)
						.then((res) => {
							// console.log(res.data);
							setData(res.data);
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoaded(false);
				});
		};

		checks();
	}, []);

	const deleteAccount = async () => {
		if (password !== "") {
			await axios
				.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`, {
					password,
					email: localStorage.getItem("podcastMail"),
					id: data.user._id,
				})
				.then((res) => {
					setPassword("");
					res.status === 200 && router.push("/admin");
				})
				.catch((err) => {
					alert("Unable to delete account");
					console.log(err);
				});
		} else {
			alert("Please Fill password field");
		}
	};

	const changePassword = async () => {
		if (newPass !== "" && password !== "") {
			await axios
				.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`, {
					newPass,
					password,
					email: localStorage.getItem("podcastMail"),
					id: data.user._id,
				})
				.then((res) => {
					setPassword("");
					setNewPass("");
					setShowPassword(false);
					res.status === 200 && router.refresh();
					alert("Password Successful");
				})
				.catch((err) => {
					alert("Unable to update account password");
					console.log(err);
				});
		} else {
			alert("Please fill all fields");
		}
	};

	return (
		<main className="flex flex-row w-full h-screen relative">
			<AdminNav />
			<section className="w-full p-10">
				<div className="flex flex-row items-center gap-10 justify-start self-start">
					<Link href={"/admin"} className="">
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

				<div className="mt-7 flex flex-col md:flex-row items-center md:items-start gap-5">
					<div className="">
					{data?.user?.image ? (
						<Image
							alt="profile picture"
							src={`data:image/jpeg;base64,${data?.user?.image}`}
							width={200}
							height={200}
							className="object-contain rounded-xl"
						/>
					) : (
						<div className="rounded-xl bg-green-500 text-primary uppercase h-60 w-60 text-9xl font-bold flex items-center justify-center">
							{data?.user?.name.charAt(0)}
						</div>
					)}
					</div>
					
					<div className="flex flex-col items-center md:items-start text-center md:text-left">
						<h1 className="text-primary text-4xl font-black text-center md:text-left capitalize flex flex-col md:flex-row items-center justify-end md:items-end md:justify-start md:gap-2 w-full">
							{data?.user?.name}
						</h1>

						<div className="flex flex-row gap-5">
							<p className="text-grey-100 text-base font-semibold">email: </p>

							<p className="text-grey-100 text-base font-semibold">
								{data?.user?.email}
							</p>
						</div>

						<div className="flex flex-row gap-5">
							<p className="text-grey-100 text-base font-semibold">
								Profile Type:{" "}
							</p>

							<p className="text-grey-100 text-base font-semibold">
								{data?.user?.profile_type}
							</p>
						</div>

						{/* <div className="flex flex-row gap-5">
							<p className="text-grey-100 text-base font-semibold">
								Date joined:{" "}
							</p>

							<p className="text-grey-100 text-base font-semibold">
								{data?.user?.createdAt}
							</p>
						</div> */}

						<div className="flex flex-row gap-5 mt-5">
							<button
								type="button"
								className="bg-primary p-2 rounded-lg text-white text-center text-sm font-medium"
								onClick={() => {
									setShowPassword(true);
								}}
							>
								Change Password
							</button>
							<button
								type="button"
								className="bg-red-500 p-2 rounded-lg text-white text-center text-sm font-medium"
								onClick={() => {
									setShowDelete(true);
								}}
							>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</section>

			{showDelete && (
				<DeleteAccount
					changeValue={(e) => {
						setPassword(e.target.value);
					}}
					value={password}
					handleDelete={deleteAccount}
					handleCancel={() => {
						setShowDelete(false);
						setPassword("");
					}}
				/>
			)}

			{showPassword && (
				<ChangePassword
					changeAdminValue={(e) => {
						setPassword(e.target.value);
					}}
					adminValue={password}
					changePassValue={(e) => {
						setNewPass(e.target.value);
					}}
					passValue={newPass}
					handleClick={changePassword}
					handleCancel={() => {
						setShowPassword(false);
						setNewPass("");
						setPassword("");
					}}
				/>
			)}
		</main>
	);
};

export default Details;
