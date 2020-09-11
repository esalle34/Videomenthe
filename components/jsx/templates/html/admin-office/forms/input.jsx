import React from "react";

const Input = (args)=>{

	return <div key={`${args.groupClassName}`+"-"+`${args.key}`} className={(typeof args.groupClassName != "undefined" || args.groupClassName != null )? `form-group ${args.groupClassName}` : "form-group"}>
				<div className="input-group">
				{typeof args.label != "undefined" ? <label key={`label-${args.key}`} className={args.labelClassName} htmlFor={args.id}>{args.label}</label> : undefined}
					{(args.prepend != "undefined" && args.prepend != null) && 
			   		<div className="input-group-append">
	    				{args.prepend}
	  				</div>}
					<input id={args.id} key={args.key} name={args.name} type={args.type} className={args.className} placeholder={args.placeholder} value={args.value}></input>
			   		{(args.append != "undefined" && args.append != null) && 
			   		<div className="input-group-append">
	    				{args.append}
	  				</div>}

  				</div>
		   </div>;
}


export default Input;