"use client";

import "@styles/globals.css";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Provider } from "react-redux";
import store from "@redux/store";

import Topbar from "@components/Topbar";
import Footer from "@components/Footer";

export const metadata = {
	title: "Podcast Expert",
	description:
		"Makes matching great podcasts with great guests easy. This is a web application that allows podcasts to easily find great guests & for great guests to get on great podcasts",
};

export default function RootLayout({ children }) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<html lang="en">
			<Provider store={store}>
				<body className="overflow-x-hidden">
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
									<section className="w-1/6 bg-primary">
										<nav className="w-full sticky top-0 flex flex-col pt-5 px-3 items-center">
											<Link
												href={"#"}
												className="flex items-center justify-center"
											>
												<div className="">
													<Image
														src={"/images/pow.png"}
														width={143.32}
														height={60.29}
														alt="Pow image"
														className=""
													/>
												</div>
											</Link>
											<button
												type="button"
												className="text-white text-center bg-success w-full flex flex-row items-center justify-center gap-3 p-2 rounded-sm mt-2"
											>
												<Image
													src={"/svgs/plus.svg"}
													width={15}
													height={15}
													alt="Plus icon"
												/>
												Create list
											</button>

											<div className="w-full mt-12">
												<p className="text-white text-left uppercase text-sm font-normal">
													MENU
												</p>
												<Link
													href={"/find-podcast"}
													className={
														pathname !== "/find-podcast"
															? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
															: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
													}
												>
													<Image
														src={"/svgs/podcaster.svg"}
														width={15}
														height={15}
														alt="Podcaster icon"
													/>
													<p className="text-white text-center">
														Find podcaster
													</p>
												</Link>
												<Link
													href={"/find-guests"}
													className={
														pathname !== "/find-guests"
															? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
															: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
													}
												>
													<Image
														src={"/svgs/person.svg"}
														width={15}
														height={15}
														alt="Person icon"
													/>
													<p className="text-white text-center">Find guests</p>
												</Link>
												<hr className="mt-2" />
											</div>

											<div className="w-full mt-12">
												<p className="text-white text-left uppercase text-sm font-normal">
													LIBRARY
												</p>
												<Link
													href={"#"}
													className={
														pathname !== "/"
															? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
															: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
													}
												>
													<Image
														src={"/svgs/favorite.svg"}
														width={15}
														height={15}
														alt="Favorite icon"
													/>
													<p className="text-white text-center">Favorites</p>
												</Link>
												<Link
													href={"/saved-list"}
													className={
														pathname !== "/saved-list"
															? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
															: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
													}
												>
													<Image
														src={"/svgs/saved.svg"}
														width={15}
														height={15}
														alt="Saved icon"
													/>
													<p className="text-white text-center">Saved lists</p>
												</Link>
												<Link
													href={"#"}
													className={
														pathname !== "/"
															? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
															: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
													}
												>
													<Image
														src={"/svgs/recent.svg"}
														width={15}
														height={15}
														alt="Recent icon"
													/>
													<p className="text-white text-center">Recents</p>
												</Link>
												<hr className="mt-2" />
											</div>

											<div className="w-ful mt-10">
												<div className="w-full rounded-lg flex flex-row bg-pinky p-3">
													<div className="flex flex-col">
														<p className="text-primary text-left">
															Join the facebook community
														</p>
														<Link
															href={"#"}
															className="rounded-md w-fit h-fit p-1 bg-primary"
														>
															<p className="text-white text-center">Join now</p>
														</Link>
													</div>
													<div className="flex flex-col justify-end">
														<h1 className="text-primary font-extrabold text-7xl">
															f
														</h1>
													</div>
												</div>
											</div>
										</nav>
									</section>

									<section className="w-full overflow-hidden">
										<Topbar />
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
				</body>
			</Provider>
		</html>
	);
}
