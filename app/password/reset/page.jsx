"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Progress from "@components/Progress";

const Reset = () => {
	const firstInput = useRef();
	const secondInput = useRef();
	const thirdInput = useRef();
	const fourthInput = useRef();
	const fifthInput = useRef();

	const [otp, setOtp] = useState({
		first: "",
		second: "",
		third: "",
		fourth: "",
		fifth: "",
	});

	return (
		<main className="flex min-h-screen flex-row overflow-hidden">
			{/* Form part */}
			<section className="w-3/5 h-screen bg-white flex flex-col items-center p-10">
				<div className="flex flex-row items-center gap-10 justify-start self-start">
					<Link href={"/password/forgot"} className="">
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
					<h1 className="text-primary text-3xl font-black">Reset password?</h1>
					<p className="text-primary text-sm font-light">
						We sent your a code to{" "}
						<span className="text-success font-semibold">
							andreagomez@gmail.com
						</span>
					</p>
				</div>

				<div className="flex self-start items-start my-10">
					<Progress numOfPosition={2} />
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col gap-20 w-125">
						<div className="flex flex-row gap-3 items-center justify-around">
							<input
								type="text"
								placeholder="-"
								value={otp.first}
								maxLength={1}
								required
								ref={firstInput}
								onChange={(e) => {
									setOtp({ ...otp, first: e.target.value });
									e.target.value && secondInput.current.focus();
								}}
								className="h-16 w-16 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.second}
								maxLength={1}
								required
								ref={secondInput}
								onChange={(e) => {
									setOtp({ ...otp, second: e.target.value });
									e.target.value
										? thirdInput.current.focus()
										: firstInput.current.focus();
								}}
								className="h-16 w-16 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.third}
								maxLength={1}
								required
								ref={thirdInput}
								onChange={(e) => {
									setOtp({ ...otp, third: e.target.value });
									e.target.value
										? fourthInput.current.focus()
										: secondInput.current.focus();
								}}
								className="h-16 w-16 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.fourth}
								maxLength={1}
								required
								ref={fourthInput}
								onChange={(e) => {
									setOtp({ ...otp, fourth: e.target.value });
									e.target.value
										? fifthInput.current.focus()
										: thirdInput.current.focus();
								}}
								className="h-16 w-16 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.fifth}
								maxLength={1}
								required
								ref={fifthInput}
								onChange={(e) => {
									setOtp({ ...otp, fifth: e.target.value });
									!e.target.value && fourthInput.current.focus();
								}}
								className="h-16 w-16 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
						</div>

						<div className="">
							<button
								type="submit"
								className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg"
								onClick={() => {}}
							>
								Continue
							</button>

							<p className="text-grey-100 text-base text-center mt-5">
								Didn't receive email?{" "}
								<span className="text-success">
									<Link href={"/password/reset-password"} className="">
										Click to resend
									</Link>
								</span>
							</p>
						</div>
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
					src="/images/resetii.png"
					width={370}
					height={365}
					alt="Woman speaking to microphone"
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

export default Reset;
