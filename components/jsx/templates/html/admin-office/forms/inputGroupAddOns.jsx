import React from "react"

const InputGroupAddOns = {

		append : {

				button : (args)=>{

					return <button type="button" className={args.className != null ? "btn btn-append " + args.className : "btn btn-append"}>{args.els}</button>

				},

				span : (args)=>{

					return <span className={args.className != null ? args.className : "input-group-text"}>{args.els}</span>


				},

				icon : (args)=>{

					return <i className={args.className}>{args.els}</i>

				}

		},

		prepend : {

				button : (args)=>{

					return <button type="button" className={args.className != null ? "btn btn-prepend " + args.className : "btn btn-prepend"}>{args.els}</button>

				},

				span : (args)=>{

					return <span className={args.className != null ? args.className : "input-group-text"}>{args.els}</span>


				},


				icon : (args)=>{

					return <i className={args.className}>{args.els}</i>

				}

		}

};

export default InputGroupAddOns;