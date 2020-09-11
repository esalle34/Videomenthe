import React from "react";

const Button = (args)=>{

	return <button key={args.key}
	className={args.className != null ? args.className : undefined}
	id={args.id != null ? args.id : undefined}
	style={args.style != null ? args.style : undefined}>
	{args.els}</button>

}

export default Button;