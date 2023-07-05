"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Input from "@components/Input";
import Progress from "@components/Progress";

const Forgot = () => {
	const [email, setEmail] = useState("");

	const changeEmail = (e) => {
		setEmail(e.target.value);
	};

	return (
		<main className="flex min-h-screen flex-row overflow-hidden">
			{/* Form part */}
			<section className="w-3/5 h-screen bg-white flex flex-col items-center p-10">
				<div className="flex flex-row items-center gap-10 justify-start self-start">
					<Link href={"/login"} className="">
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

				<div className="self-start mt-5">
					<h1 className="text-primary text-3xl font-black">Forgot password?</h1>
					<p className="text-primary text-sm font-light">
						Sorry pal, no re-entry…jokes!
					</p>
				</div>

				<div className="flex self-start items-start my-10">
					<Progress numOfPosition={1} />
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col gap-20 w-125">
						<Input
							placeholder={"Email"}
							onChangeValue={changeEmail}
							value={email}
							type="email"
							required
						/>
						<button
							type="submit"
							className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg"
							onClick={() => {}}
						>
							Reset Password
						</button>
					</div>
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

			{/* Image part */}
			<section className="w-2/5 h-screen bg-primary flex flex-col items-center justify-around py-6 px-20">
				<Image
					src={"/images/pow.png"}
					width={150}
					height={70}
					alt="Pow image"
					className=""
				/>
				<Image
					src="/images/reseti.png"
					width={370}
					height={365}
					alt="Man speaking to microphone"
					className="rounded-lg mt-5"
				/>

				<div className="mt-5">
					<p className="text-white font-light text-left text-xl">
						The exclusive{" "}
						<span className="text-pinky font-bold">
							podcast guest matching service
						</span>{" "}
						you've been waiting for.
					</p>
					<p className="text-white font-light text-left">
						Never look for great guests again.
					</p>
				</div>
			</section>
		</main>
	);
};

export default Forgot;
