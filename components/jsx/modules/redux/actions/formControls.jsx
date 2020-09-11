const TOGGLE_INPUT_VISIBILITY = "TOGGLE_INPUT_VISIBILITY";

export { TOGGLE_INPUT_VISIBILITY };

const toggleInputVisibility = (input)=>{
	
	let newInput_type;
   	let input_type = input.getAttribute("type");
   	newInput_type = input_type == "password" ? "text" : "password";


	return { type : TOGGLE_INPUT_VISIBILITY, input_type : newInput_type};

}

export { toggleInputVisibility };