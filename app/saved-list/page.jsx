"use client";

import Image from "next/image";
import Link from "next/link";

import Saved from "@components/Saved";

import { savedList } from "@utils/data";

const Savedlist = () => {
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
					<p className="text-primary text-5xl font-black">
						Saved <span className="text-pinky">list</span>
					</p>
					<div className="">
						{savedList.map((list, index) => (
							<Saved
								key={index}
								date={list.date}
								image={list.image}
								length={list.length}
								link={list.link}
								podcaster={list.podcaster}
								title={list.title}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Savedlist;
