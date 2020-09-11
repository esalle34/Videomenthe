import React from "react";

const P = (args)=>{
	
	return <p key={args.key}
	className={args.className != null ? args.className : undefined}
	id={args.id != null ? args.id : undefined}
	style={args.style != null ? args.style : undefined}>
	{args.els}</p>

}

export default P;