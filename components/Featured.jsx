import { handleFavorite, handleUnFavorite } from "@utils/functions";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Featured = ({
	image,
	name,
	categories,
	type,
	id,
	isAdmin,
	handleClick,
	isFavorite,
	favorite,
	unfavorite
}) => {
	const [fav, setFav] = useState(isFavorite);
	console.log(fav);


	return (
		<div className="relative z-0">
			<Link
				href={isAdmin ? `/admin/details?user=${id}` : `/profile/${id}`}
				className=""
			>
				<div
					onClick={() => {
						handleClick && handleClick();
					}}
					className="w-full h-full hover:shadow p-0.5 rounded-lg group"
				>
					<div className="rounded-xl h-40 w-full overflow-hidden">
						{image || image === undefined ? (
							<img
								src={`data:image/jpeg;base64,${image}`}
								id="img"
								alt="image"
								className="rounded-xl h-full w-full flex items-center justify-center group-hover:scale-110 transition-transform ease-in duration-1000"
							/>
						) : (
							<div className="rounded-xl bg-green-500 text-primary uppercase h-full w-full text-9xl font-bold flex items-center justify-center">
								{name.charAt(0)}
							</div>
						)}
					</div>

					<div className="truncate">
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
							<p className="text-primary text-left text-sm font-normal">
								{type}
							</p>
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

			{!isAdmin &&
			<button
				type="button"
				onClick={() => {
					if (fav) {
						setFav(false);
						// unfavorite
						handleUnFavorite(id,`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/unfavorites`)
					} else {
						setFav(true);
						// favorite
						handleFavorite(id,`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/favorites`)
					};
				}}
				className="absolute top-3 left-3"
			>
				{fav ? (
					<AiFillHeart size={25} color="red" className="" />
				) : (
					<AiOutlineHeart size={25} color="red" className="" />
				)}
			</button>}
		</div>
	);
};

export default Featured;
