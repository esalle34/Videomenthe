import React from "react";

const H1 = (args)=>{
	
	return <h1 key={args.key} className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined}>{args.els}</h1>;

}

export default H1;