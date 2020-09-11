import React from "react";

const Form = (args)=>{
	
	return <form id={args.id} key={args.key} method={args.method} 
	className={args.async == true ? 
		(typeof args.className != "undefined" ?  `async ${args.className}` : `async`) : 
		(typeof args.className != "undefined" ? `${args.className}` : undefined)} 
		action={args.action} encType={args.enctype}>{args.els}</form>;

}

export default Form;