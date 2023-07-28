import Image from "next/image";
import Link from "next/link";
import React from "react";

const Podcasts = ({ image, title, podcaster }) => {
	return (
		<Link href={"/find-guests"} className="">
			<div className="m-2">
				<div className="group rounded-2xl relative flex items-center justify-center overflow-hidden">
					<Image
						id="vidimage"
						src={image}
						width={280}
						height={200}
						alt="Podcaster Image"
						className="group-hover:scale-110 transition-transform ease-in duration-1000"
					/>

					<button
						type="button"
						onClick={() => {}}
						className="absolute top-3 left-3"
					>
						<Image
							src={"/svgs/favorite.svg"}
							width={25}
							height={25}
							alt="Favorite button"
							className=""
						/>
					</button>
					{/* <button
						id="playimage"
						type="button"
						onClick={() => {}}
						className="group-hover:visible group-hover:block invisible absolute top-24"
					>
						<Image
							src={"/svgs/play.svg"}
							width={60}
							height={60}
							alt="Play button"
							className=""
						/>
					</button> */}
				</div>

				<div className="flex flex-col">
					<h1 className="text-primary font-bold text-ellipsis whitespace-nowrap overflow-hidden text-left text-lg">
						<abbr title={title} className="no-underline">
							{title}
						</abbr>
					</h1>
					<p className="text-primary font-normal text-left text-sm">
						{podcaster}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default Podcasts;
