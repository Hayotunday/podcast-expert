import "@styles/globals.css";
import 'react-multi-carousel/lib/styles.css';

import { Providers } from "./redux/provider";

import Root from "./root";

export const metadata = {
	title: "Podcast Expert",
	description:
		"Makes matching great podcasts with great guests easy. This is a web application that allows podcasts to easily find great guests & for great guests to get on great podcasts",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head />
			<body className="overflow-x-hidden">
				<Providers>
					<Root>{children}</Root>
				</Providers>
			</body>
		</html>
	);
}
