import React, { useMemo } from "react";

function Node({ look, idx, bind }) {
	// console.log(bind);
	const element = useMemo(() => {
		return (
			<div className="node" style={{ touchAction: "none" }} {...bind}>
				<div className={`node-coloured ${look}`}></div>
			</div>
		);
	}, [look, bind]);
	return <>{element}</>;
}

export default React.memo(Node);
