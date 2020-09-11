import React from "react";

const Row =(args)=>{

		return <div key={args.key} id={args.id != null ? args.id : undefined} className={typeof args.className != "undefined" ? `${args.className}` : 'row'}>{args.els}</div>;

}

export default Row;