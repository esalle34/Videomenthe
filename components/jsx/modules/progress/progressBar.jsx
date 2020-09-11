import React from "react";

const ProgressBar = (args)=>{
	
	return <div className="progress">
  			<div className={(typeof args.className != "undefined" && args.className != null) ? args.className : undefined} role="progressbar" aria-valuenow={args.value} aria-valuemin={0} aria-valuemax={100} style={{width: args.value + "%"}}></div>
		   </div>

}

export default ProgressBar;