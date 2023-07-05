import Image from "next/image";
import Link from "next/link";

const Verified = () => {
	return (
		<main className="flex min-h-screen bg-primary flex-col justify-around">
			<section className="w-full flex flex-col items-center justify-center gap-10">
				<Image
					src={"/images/pow.png"}
					width={213}
					height={90}
					className="fixed top-10"
					alt="Pow image"
				/>
				<div className="text-white text-center flex flex-col items-center gap-5">
					<Image
						src={"/svgs/verified.svg"}
						width={50}
						height={50}
						className=""
						alt="Verified image"
					/>
					<h1 className="text-success text-center font-bold text-4xl">
						Verified
					</h1>
					<Link href={"/create-profile"} className="underline text-success">
						Continue
					</Link>
				</div>
			</section>

			<section className="fixed bottom-10 w-full">
				<div className="flex flex-row justify-between items-center px-10 w-full">
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
				</div>
			</section>
		</main>
	);
};

export default Verified;
