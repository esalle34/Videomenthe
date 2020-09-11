import React from "react";

const Span = (args)=>{
	
	return <span key={args.key}
	className={args.className != null ? args.className : undefined}
	id={args.id != null ? args.id : undefined}
	style={args.style != null ? args.style : undefined}>
	{args.els}</span>

}

export default Span;