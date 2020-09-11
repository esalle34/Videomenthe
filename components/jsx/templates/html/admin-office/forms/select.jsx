import React from "react";

const Select = (args)=>{

	return <div className={(typeof args.groupClassName != "undefined" && args.groupClassName != null) ? args.groupClassName : "form-group"}>
				<select key={args.key}
				id={(args.id != "undefined" && args.id != null) ? args.id : undefined}
				name={(args.name != "undefined" && args.name != null) ? args.name : undefined}
				className={(typeof args.className != "undefined" && args.className != null) ? args.className : undefined} 
				value={(args.value != "undefined" && args.value != null) ? args.value : undefined }
				placeholder={(args.placeholder != "undefined" && args.placeholder != null) ? args.placeholder : undefined}>
				{args.els}</select>
			</div>

}

export default Select;