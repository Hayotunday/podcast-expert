import React from "react";

const Tag = ({ text }) => {
	return (
		<div className="bg-grey-200 rounded-2xl py-2 px-3">
			<p className="text-grey-100 text-center text-sm font-light">{text}</p>
		</div>
	);
};

export default Tag;
