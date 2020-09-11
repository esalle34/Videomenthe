'use strict';

//Bootstrap 3.3.5
import "./vendors/bootstrap.min.js";
//Lazyload 16.1.0
import LazyLoad from "./vendors/lazyload.min.js";



document.addEventListener("DOMContentLoaded", function(){

	var lazyLoadInstance = new LazyLoad({
  		elements_selector: ".lazy"
  		// ... more custom settings?
	});

})