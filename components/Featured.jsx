import Link from "next/link";
import Image from "next/image";

const Featured = ({ image, name, categories, type, id }) => {
	return (
		<Link href={`/profile/${id}`} className="">
			<div className="w-full h-full hover:shadow hover:shadow-primary p-1 rounded-lg">
				<div className="rounded-xl h-40 w-full">
					{image ? (
						<img
							src={`data:image/png;charset=utf-8;base64,${image}`}
							id="img"
							alt="image"
							className="rounded-xl h-full w-full flex items-center justify-center"
						/>
					) : (
						<div className="rounded-xl bg-green-500 text-primary uppercase h-full w-full text-9xl font-bold flex items-center justify-center">
							{name.charAt(0)}
						</div>
					)}
				</div>
				<div className=" truncate">
					<abbr
						title={name}
						className="text-primary text-left text-lg font-bold no-underline"
					>
						{name}
					</abbr>
					<div className="">
						{categories && (
							<p className="text-primary text-left text-sm font-normal">
								{categories.length > 0 && categories[0]}
							</p>
						)}
						<p className="text-primary text-left text-sm font-normal">{type}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Featured;
