"use client";

import { usePathname } from "next/navigation";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Topbar from "@components/Topbar";

export default function Root({ children }) {
	const pathname = usePathname();

	return (
		<>
			{pathname !== "/login" &&
			pathname !== "/signup" &&
			pathname !== "/verify-email" &&
			pathname !== "/verified" &&
			pathname !== "/create-profile" &&
			pathname !== "/password/completed" &&
			pathname !== "/password/create" &&
			pathname !== "/password/forgot" &&
			pathname !== "/password/reset" &&
			pathname !== "/create-podcaster/step-one" &&
			pathname !== "/create-podcaster/step-two" ? (
				<main className="flex min-h-screen w-screen flex-col">
					<section className="flex flex-row w-full">
						<Nav />

						<section className="w-full relative overflow-hidden">
							<div className="w-full sticky top-0">
								<Topbar />
							</div>
							<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
								{children}
							</div>
						</section>
					</section>

					<Footer />
				</main>
			) : (
				children
			)}
		</>
	);
}
