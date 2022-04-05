import { useEffect, useState } from "react";

export default function useAlgo(nodeCount) {
	const [elements, setElements] = useState([]);
	// console.log(nodeCount);
	useEffect(() => {
		let cleanGrid = [];
		for (let i = 0; i < nodeCount; i++) {
			cleanGrid.push("empty");
		}
		setElements(cleanGrid);
	}, [nodeCount]);

	return elements;
}
