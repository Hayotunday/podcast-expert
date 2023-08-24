import Image from "next/image";
import React from "react";

const Loader = () => {
	return (
		<main className="w-full h-full flex flex-col items-center justify-center gap-5">
			<Image
				src={"/gifs/loading.gif"}
				className="object-contain"
				width={100}
				height={100}
				alt="loader"
			/>
			<p className="text-primary text-lg font-semibold text-center capitalize">
				Loading...
			</p>
		</main>
	);
};

export default Loader;
