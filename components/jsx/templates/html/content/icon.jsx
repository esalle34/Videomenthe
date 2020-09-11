import React from "react";

const Icon = (args)=>{
	
	return <React.Fragment key={`fragment-${args.key}`}><i key={args.key}
	className={args.className != null ? args.className : undefined}
	id={args.id != null ? args.id : undefined}
	style={args.style != null ? args.style : undefined}>
	</i>{typeof args.els != "undefined" ? <p>{args.els}</p> : ""}</React.Fragment>


}

export default Icon;
