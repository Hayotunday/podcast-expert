"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Input from "@components/Input";
import Transition from "@components/Transition";
import axios from "axios";

const Login = ({ searchParams }) => {
	const [position, setPosition] = useState(1);
	const [color, setColor] = useState("pinky");
	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

	const router = useRouter();

	const changeEmail = (e) => {
		setLoginInfo({ ...loginInfo, email: e.target.value });
	};
	const changePassword = (e) => {
		setLoginInfo({ ...loginInfo, password: e.target.value });
	};

	var num = position;

	useEffect(() => {
		setInterval(() => {
			if (num >= 3) {
				setPosition(1);
				num = 1;
			} else {
				setPosition(++num);
			}
		}, 5000);
	}, []);

	useEffect(() => {
		switch (position) {
			case 1:
				setColor("pinky");
				break;
			case 2:
				setColor("success");
				break;
			case 3:
				setColor("secondary");
				break;
			default:
				setColor("pinky");
				break;
		}
	}, [position]);

	// Google handler function
	// const handleGoogleSignIn = async () => {
	// 	signIn("google", { callbackUrl: "/" });
	// };

	// Credentials handler function
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (loginInfo.email !== "" && loginInfo.password !== "") {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
					email: loginInfo.email,
					password: loginInfo.password,
				})
				.then((res) => {
					localStorage.setItem("podcastToken", res.data.accessToken);
					localStorage.setItem("podcastId", res.data.id);
					if (searchParams.return) {
						router.push(`${searchParams.return}`);
					} else if (res.status === 200) {
						router.push("/");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("Please fill all field");
		}
	};

	return (
		<main className="flex min-h-screen flex-row overflow-hidden">
			<section className="lg:w-2/5 h-screen bg-primary hidden lg:flex flex-col items-center justify-around py-6 px-20">
				<Image
					src={"/images/pow.png"}
					width={150}
					height={70}
					alt="Pow image"
					className="self-end"
				/>
				<div>
					<Transition numOfPosition={position} />
					<Image
						src={`/images/image${position}.png`}
						width={370}
						height={365}
						alt={`Image ${position}`}
						className={`rounded-lg border border-b-4 border-r-4 border-${color} mt-5`}
					/>
				</div>

				<div className="mt-5">
					<p className="text-white font-light text-left text-xl">
						The exclusive{" "}
						<span className={`text-${color} font-bold`}>
							podcast guest matching service
						</span>{" "}
						you've been waiting for.
					</p>
					<p className="text-white font-light text-left">
						Never look for great guests again.
					</p>
				</div>
			</section>

			{/* Form part */}
			<section className="lg:w-3/5 w-full h-screen bg-white flex flex-col items-center p-10">
				<div className="mb-5 lg:hidden">
					<Image
						src={"/images/pow.png"}
						width={150}
						height={50}
						className="self-end"
						alt="Pow image"
					/>
				</div>
				<div className="self-start">
					<h1 className="text-primary text-3xl font-black">Come on in</h1>
					<p className="text-primary text-sm font-light">
						Glad to have you back!
					</p>
				</div>
				<div className="flex flex-col items-center gap-3 mt-5 sm:mt-3 w-full">
					<form
						onSubmit={(e) => handleSubmit(e)}
						className="w-full mt-10 flex flex-col items-center"
					>
						<div className="flex flex-col gap-5 w-full sm:w-125">
							<Input
								placeholder={"Email"}
								onChangeValue={changeEmail}
								value={loginInfo.email}
								type="email"
							/>
							<Input
								placeholder={"Password"}
								onChangeValue={changePassword}
								value={loginInfo.password}
								type="text"
								secureText
							/>
							<Link
								href={"/password/forgot"}
								className="underline text-success flex self-end"
							>
								<p className="">Forgot Password?</p>
							</Link>

							<button
								type="submit"
								className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg"
							>
								login
							</button>

							<p className="text-grey-100 text-base text-center">
								Don't have an account?{" "}
								<span className="text-success">
									<Link href={"/signup"} className="">
										Sign up
									</Link>
								</span>
							</p>
						</div>

						{/* <div className="flex flex-row gap-3 items-center w-full justify-center mt-3">
							<hr className="bg-grey-100 w-52 h-0.5 rounded-md" />
							<p className="text-grey-100 font-light text-lg">Or</p>
							<hr className="bg-grey-100 w-52 h-0.5 rounded-md" />
						</div>

						<button
							disabled
							type="button"
							// onClick={handleGoogleSignIn}
							className="flex flex-row items-center justify-center gap-3 w-full mt-3 border bg-white hover:bg-slate-100 border-grey-100 rounded-md h-12"
						>
							<span>Sign in with Google</span>
							<Image
								src={"/svgs/googleii.svg"}
								width={20}
								height={20}
								alt="Google icon"
								className=""
							/>
						</button> */}
					</form>
				</div>

				<div className="flex flex-row items-center gap-3 text-primary fixed bottom-3">
					<Link href={"#"} className="">
						<p className="">Terms and Conditions</p>
					</Link>
					<p className="text-2xl font-semibold text-success">|</p>
					<Link href={"#"} className="">
						<p className="">Privacy Policy</p>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default Login;
