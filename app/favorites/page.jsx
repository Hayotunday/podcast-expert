"use client";

import Image from "next/image";
import Link from "next/link";

import Saved from "@components/Saved";

import { podcastList, savedList } from "@utils/data";
import Podcasts from "@components/Podcasts";

const Favorites = () => {
	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/"} className="">
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

				<div className="h-full">
					<p className="text-primary text-5xl font-black">Favorites</p>
					{/* <div className="">{}</div> */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 relative">
						{podcastList.map((list, index) => (
							<div key={index} className="">
								<Podcasts
									image={list.image}
									podcaster={list.podcaster}
									title={list.title}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Favorites;
