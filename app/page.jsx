"use client";

import Link from "next/link";

import Featured from "@components/Featured";

export default function Home() {
	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="flex flex-col gap-5 pl-5">
					<div className="flex flex-row items-center justify-between">
						<p className="text-primary font-bold text-2xl">
							Featured <span className="text-pinky">podcasts</span>
						</p>
						<Link
							href={"#"}
							className="capitalize text-success hover:text-opacity-60"
						>
							View All
						</Link>
					</div>
					<div className="w-full flex flex-row items-center gap-5">
						<Featured isLarge={true} src={"/images/featuredi.png"} />
						<Featured isLarge={true} src={"/images/featuredi.png"} />
						<Featured isLarge={true} src={"/images/featuredii.png"} />
						<Featured isLarge={true} src={"/images/featuredii.png"} />
						<Featured isLarge={true} src={"/images/featurediii.png"} />
						<Featured isLarge={true} src={"/images/featurediii.png"} />
					</div>
				</div>

				<div className="flex flex-col gap-5 pl-5">
					<div className="flex flex-row items-center justify-between">
						<p className="text-primary font-bold text-2xl">
							Your recently viewed podcasts
						</p>
						<Link
							href={"#"}
							className="capitalize text-success hover:text-opacity-60"
						>
							View All
						</Link>
					</div>
					<div className="w-full overflow-hidden flex flex-row items-center gap-5 contain">
						<Featured isLarge={false} src={"/images/viewedi.png"} />
						<Featured isLarge={false} src={"/images/viewedii.png"} />
						<Featured isLarge={false} src={"/images/viewediii.png"} />
						<Featured isLarge={false} src={"/images/viewediii.png"} />
						<Featured isLarge={false} src={"/images/viewediii.png"} />
					</div>
				</div>

				<div className="flex flex-col gap-5 pl-5">
					<div className="flex flex-row items-center justify-between">
						<p className="capitalize text-primary font-bold text-2xl">
							Popular podcasts, Recommeneded Just For{" "}
							<span className="text-pinky">You</span>
						</p>
						<Link
							href={"#"}
							className="capitalize text-success hover:text-opacity-60"
						>
							View All
						</Link>
					</div>
					<div className="w-full overflow-hidden flex flex-row items-center gap-5">
						<Featured isLarge={false} src={"/images/viewedi.png"} />
						<Featured isLarge={false} src={"/images/viewedii.png"} />
						<Featured isLarge={false} src={"/images/viewediii.png"} />
						<Featured isLarge={false} src={"/images/viewedii.png"} />
						<Featured isLarge={false} src={"/images/viewedi.png"} />
					</div>
				</div>

				<div className="flex flex-col gap-5 mb-20 pl-5">
					<div className="flex flex-row items-center justify-between">
						<p className="text-primary font-bold text-2xl">
							Featured <span className="text-success">guests</span>
						</p>
						<Link
							href={"#"}
							className="capitalize text-success hover:text-opacity-60"
						>
							View All
						</Link>
					</div>
					<div className="w-full overflow-hidden flex flex-row items-center gap-5">
						<Featured isLarge={false} src={"/images/viewedi.png"} />
						<Featured isLarge={false} src={"/images/viewedii.png"} />
						<Featured isLarge={false} src={"/images/viewediii.png"} />
						<Featured isLarge={false} src={"/images/viewedii.png"} />
						<Featured isLarge={false} src={"/images/viewedi.png"} />
					</div>
				</div>
			</div>
		</>
	);
}

// export const getServerSideProps = async ({ req }) => {
// 	const session = await getSession({ req });

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: { session },
// 	};
// };
