import React from "react";

const Image = (args)=>{
	

	return <img id={args.id != null ? args.id : undefined} 
					key={args.key} 
					className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined} 
					src={args.src} 
					style={args.style}>{args.els}
			</img>

}

export default Image;