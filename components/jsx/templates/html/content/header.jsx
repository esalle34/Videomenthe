import React from "react";

const Header = (args)=>{
	

	return <header className={typeof args.className != "undefined" ? args.className : undefined}>
			{args.els}</header>

}

export default Header;