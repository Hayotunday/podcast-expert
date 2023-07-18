import Link from "next/link";

import { HiOutlineDotsVertical } from "react-icons/hi";

const Featured = ({ image, name, categories, type, id, handleClick }) => {
	return (
		<Link href={`/profile/${id}`} className="">
			<div
				onClick={() => {
					handleClick && handleClick(id);
				}}
				className="w-full h-full hover:shadow hover:shadow-primary p-1 rounded-lg"
			>
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

				{/* <button
					type="button"
					onClick={() => {}}
					className="absolute top-3 left-3"
				>
					<AiOutlineHeart size={20} color="red" />
				</button> */}

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

				{/* <button
					type="button"
					onClick={() => {}}
					className="absolute bottom-3 right-3 hover:rounded-full hover:bg-slate-300 hover:bg-opacity-30 p-2"
				>
					<HiOutlineDotsVertical size={20} color="red" />
				</button> */}
			</div>
		</Link>
	);
};

export default Featured;
