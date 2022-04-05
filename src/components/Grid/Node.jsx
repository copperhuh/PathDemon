import React from "react";

export default function Node({ look }) {
	let color;

	switch (look) {
		case "empty":
			color = "#d4d0c1";
			break;
		default:
			color = "#d4d0c1";
	}

	return <div className="node" style={{ background: color }}></div>;
}
