import React from "react";

const Popin = (props)=>{

		let def = true;

		if((typeof props.img != "undefined" || props.img != null) && (typeof props.content != "undefined" || props.content != null)){

			def = false;

		}

		return <div id={props.args.id} key={props.args.key} className={`popin ${props.args.className}`}>
				<div>{(typeof props.img != "undefined" || props.img != null) && <img className="popin-img" src={props.img}/>}
					 {(typeof props.content != "undefined" || props.content != null) && props.content}
					 {(def == true) && <img className="popin-img" src="/assets/images/default/loader.svg"/>}
				</div></div>

}

export default Popin;