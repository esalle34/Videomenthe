import React from "react";

const A = (args)=>{
	
	return <a key={args.key} 
				id={args.id != null ? args.id : undefined} 
				href={args.href} 
				target={(typeof args.target != "undefined" || args.target != null) ? args.target : undefined} 
				className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined} 
				style={(typeof args.style != "undefined" || args.style != null) ? args.style : undefined} >
				{args.els}
			</a>

}

export default A;