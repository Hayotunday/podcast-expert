import Image from "next/image";
import Link from "next/link";

const Verifyemail = () => {
	return (
		<main className="flex min-h-screen bg-primary flex-col justify-around">
			<section className="w-full flex flex-col items-center justify-center gap-10">
				<Image
					src={"/images/pow.png"}
					width={213}
					height={90}
					className=""
					alt="Pow image"
				/>
				<div className="text-white text-center flex flex-col items-center gap-5">
					<h1 className="text-2xl font-bold">Create your account</h1>
					<div className="flex flex-col items-center bg-white bg-opacity-10 w-106 h-80 p-10 rounded-lg">
						<Image
							src={"/svgs/mail.svg"}
							width={60}
							height={40}
							className=""
							alt="mail svg"
						/>
						<h1 className="text-2xl font-bold">Verify your email</h1>
						<p className="">
							We've sent you an email to verify your email address and finish
							creating your account.
						</p>
						<h1 className="text-lg font-bold mt-14">Email not recieved</h1>
						<Link href={"/verify-email"} className="underline text-success">
							Resend Email
						</Link>
					</div>
				</div>
			</section>

			<section className="flex flex-row justify-between items-center px-10">
				<p className="text-white">
					Copyright©thepodcastexpert.co.uk 2023. All rights reserved.
				</p>
				<div className="flex flex-row items-center justify-between gap-3 text-white">
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

export default Verifyemail;
