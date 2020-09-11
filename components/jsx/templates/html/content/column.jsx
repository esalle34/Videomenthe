import React from "react";

const Column = (args)=>{
	
	return <div key={args.key} id={(typeof args.id != "undefined" || args.id != null ) ? args.id : undefined} className={args.className}>{args.els}</div>;

}

export default Column;