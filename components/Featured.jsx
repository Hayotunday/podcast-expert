import Link from "next/link";
import { useEffect, useState } from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Featured = ({
	image,
	name,
	categories,
	type,
	id,
	handleClick,
	isFavorite,
	favorite,
	setFavorite,
}) => {
	const [fav, setFav] = useState(isFavorite);

	const handleUpdateFavorite = async (id) => {
		const token =
			localStorage.getItem("podcastToken") === undefined ||
			localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		if (!favorite.includes(id)) {
			await axios
				.patch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/favorites`,
					{
						id: id,
						data: favorite,
					},
					config
				)
				.then((res) => {
					return;
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			await axios
				.patch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/favorites`,
					{
						id: id,
						data: favorite,
					},
					config
				)
				.then((res) => {
					return;
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Link href={`/profile/${id}`} className="">
			<div
				onClick={() => {
					handleClick && handleClick(id);
				}}
				className="w-full h-full hover:shadow hover:shadow-primary p-1 rounded-lg relative z-0"
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
						<p className="text-primary text-left text-sm font-normal">{type}</p>
					</div>
				</div>

				{/* <button
				type="button"
				onClick={() => {
					if (!fav) {
						const newFav = favorite.filter((i) => {
							return id !== i;
						});
						setFavorite(newFav);
					} else {
						const newFav = [...favorite, id];
						setFavorite(newFav);
					}
				}}
				className="absolute top-3 left-3"
				>
				{fav ? (
					<AiOutlineHeart size={25} color="red" className="" />
					) : (
						<AiFillHeart size={25} color="red" className="" />
						)}
					</button> */}

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
