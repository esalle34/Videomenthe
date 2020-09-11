import React from "react";

const Container =(args)=>{

		return <div key={args.key} id={args.id != null ? args.id : undefined} className={args.className != null ? `container ${args.className}` : 'container'}>{args.els}</div>;

}


export default Container;