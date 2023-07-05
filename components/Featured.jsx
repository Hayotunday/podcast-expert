import Link from "next/link";
import Image from "next/image";

const Featured = ({ src, isLarge }) => {
	return (
		<Link href={"#"} className="">
			<div className="w-fit h-fit">
				<Image
					src={src}
					width={isLarge ? 300 : 220.5}
					height={isLarge ? 255 : 220.5}
					className=""
					alt="pics"
				/>
			</div>
		</Link>
	);
};

export default Featured;
