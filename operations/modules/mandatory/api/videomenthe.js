const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const theme = require(path.resolve(root_path + "/theme")).init();
const view_service = require(path.resolve(global.MODULE_VIEW));
const form_service = require(path.resolve(global.MODULE_FORM));
const fs = require('fs');
const url = require('url');

module.exports = {


	getFiles : (route, req, res)=>{

		let filesPath = path.resolve(root_path + req.params[0]).includes(path.resolve(global.SERVER_FILES_DIR)) ? path.resolve(root_path + req.params[0]) : path.resolve(global.SERVER_FILES_DIR);
		let fileList = getAllFiles(route, filesPath);
		(req.params[0].length==0) ? null : fileList.unshift(folderTpl(route, filesPath.split(filesPath.split("\\").pop())[0], route.i18n.translate("Back", route.lang)));
		let h1 = view_service.addLogoAsH1(global.TITLE);
		
		let file_inputs = form_service.addMultipleFormInput([{libelle : "text", name: "file", type: "file", label : route.i18n.translate("Add file here", route.lang), groupClassName:"col-12", className:"form-control custom-file-input", labelClassName : "custom-file-label", placeholder : route.i18n.translate("Add file here", route.lang)},
			{libelle : "validate", name:"submit", type: "submit", className:"submit btn btn-primary",groupClassName : "col", label : route.i18n.translate("Send", route.lang)}])
		let folder_inputs = form_service.addMultipleFormInput([{libelle : "text", name: "foldername", type: "text", groupClassName:"col-12", className:"form-control validate_name", placeholder : route.i18n.translate("Add new folder here", route.lang)},
			{libelle : "validate", name:"submit", type: "submit", className:"submit btn btn-primary",groupClassName : "col", label : route.i18n.translate("Send", route.lang)}])
		
		let file_form = form_service.addForm({
			id:"newfile-form",
			key: "newfile-form",
			method : "post",
			async : true,
			className : "newfile-form has-popin",
			action : "/upload" + req.params[0],
			enctype : "multipart/form-data",
			els : []
		}, file_inputs);
			file_form = view_service.addNodeParent(file_form, view_service.getElementFromRegistry({libelle : "div", className :"col-12 col-sm"}));

		let folder_form = form_service.addForm({
			id:"newfolder-form",
			key: "newfolder-form",
			method : "post",
			async : true,
			className : "newfolder-form has-popin",
			action : "/newfolder" + req.params[0],
			enctype : "multipart/form-data",
			els : []
		}, folder_inputs)
			folder_form = view_service.addNodeParent(folder_form, view_service.getElementFromRegistry({libelle : "div", className :"col-12 col-sm"}));

		let body = view_service.addNodeParent(view_service.addNodeSibling(file_form, folder_form), view_service.getElementFromRegistry({libelle : "div", className :"col-12 col-sm"}))
		h1 = view_service.addNodeParent(h1, view_service.getElementFromRegistry({libelle:"div", className : "col-12"}))
		body = view_service.addNodeSibling(h1, body);
		fileList = view_service.addNodeParent(fileList, view_service.getElementFromRegistry({libelle : "div", className :"col-12 col-sm"}))
		body = view_service.addNodeSibling(body, fileList);
		body = view_service.addNodeParent(body, view_service.getElementsFromRegistry(["row","container"]));

		return view_service.buildView(route, req, res, body);

	},

	getAllFiles : (route, filesPath)=>{

		let list = fs.readdirSync(filesPath);
		let newList = [];

		list.map(file=>{

			let newFilesPath = path.join(filesPath, file);

			let newFile = fs.statSync(newFilesPath).isDirectory() ? folderTpl(route, newFilesPath, file) : fileTpl(route, newFilesPath, file);

			newList.push(newFile);
		})

		return newList;

	},

	downloadFile : (route, req, res)=>{

		let newPath = decodeURI(req.path);
		return res.status(200).download(path.resolve(root_path + newPath.split("/download").pop()));

	},

	uploadFile : (route, req, res)=>{

		let newPath = decodeURI(req.path);
		newPath = newPath.split("/remove").pop();
		setTimeout(function(){

			if(typeof req.headers.referer != "undefined"){
				return res.status(200).send({redirect : req.headers.referer})
			}else{
				newPath = newPath.split(newPath.split("/").pop())[0];
				return res.status(200).send({ redirect : "/browse" + newPath });
			}


		}, 1000);


	},

	deleteFile : (route, req, res)=>{

		let newPath = decodeURI(req.path);
		newPath = newPath.split("/remove").pop()
		if(!fs.statSync(path.resolve(root_path + newPath)).isDirectory()){
			fs.unlink(root_path + newPath, err=>{
				if(err)
					return err;
			})
		}else{
			fs.rmdirSync(path.resolve(root_path + newPath), { recursive: true });
		}

		if(typeof req.headers.referer != "undefined"){
			return res.status(204).redirect(req.headers.referer);
		}else{
			newPath = newPath.split(newPath.split("/").pop())[0];
			return res.status(204).redirect("/browse" + newPath);
		}

	},

	newFolder: (route, req, res)=>{

		let newPath = decodeURI(req.path);
		newPath = newPath.split("/newfolder").pop();
		newPath = newPath.charAt(newPath.length-1) != "/" ? newPath + "/" : newPath;
		newPath = (newPath == "/" || newPath == "") ? theme.PUBLIC_FILES_DIR : newPath;
		fs.mkdirSync('.' + newPath + req.body.foldername, { recursive: true })

		setTimeout(function(){

			if(typeof req.headers.referer != "undefined"){
				return res.status(200).send({redirect : req.headers.referer})
			}else{
				newPath = newPath.split(newPath.split("/").pop())[0];
				return res.status(200).send({ redirect : "/browse" + newPath });
			}


		}, 1000);


	},

	folderTpl : (route, filesPath, file)=>{

		console.log(file);

		let tpl = {

			react_element : "div",
			args : {

				key : "row-" + file,
				className: "row isFolder align-items-center",
			},
			react_nested : {

				react_element : "div",
				args : {

					key : "col-" + file,
					className : "col"

				},
				react_nested : [{

					react_element : "p",
					args : {

						key : "name-"+file,
					},
					react_nested :  [{

						react_element : "button",
						args : {
							key : "btn-prepend-"+file,
							className : "btn btn-prepend",
						},
						react_nested : {
							react_element : "icon",
							args : {
								key : "icon-"+file,
								className : "fa-regular fa-folder",
							}
						},

					},
					{	
						react_element : "a",
						args: {
							key : file,
							className : "folder",
							href : path.normalize("\\browse" + filesPath.split(root_path).pop()).replace(/\\/g, "/"),
							els : file,
						}
					}]

				},{ react_element : "div",
				args :{
					className : "row",
					key : "folder-widgets-"+file,

				},
				react_nested : [{
					react_element : "div",
					args : {

						className : "col",
						key : "folder-row-"+file,

					},
					react_nested : file != route.i18n.translate("Back", route.lang) ? 
					[{
						react_element : "a",
						args : {

							key : "remove-"+file,
							href : path.normalize(`\\remove${filesPath.split(root_path).pop()}`),
							className : "btn btn-danger",
							els : route.i18n.translate("Remove", route.lang)

						}
					}] : "",


				}]

			}]

		}

	}

	return Object.assign({}, tpl);

},


fileTpl : (route, filesPath, file)=>{

	let tpl = {

		react_element : "div",
		args : {

			key : "row-" + file,
			className: "row isFile align-items-center",
		},
		react_nested : {

			react_element : "div",
			args : {

				key : "col-" + file,
				className : "col"

			},
			react_nested : [{

				react_element : "p",
				args : {

					key : "name-"+file,
				},
				react_nested :  [{

					react_element : "button",
					args : {
						key : "btn-prepend-"+file,
						className : "btn btn-prepend",
					},
					react_nested : {
						react_element : "icon",
						args : {
							key : "icon-"+file,
							className : "fa-regular fa-file",
						}
					},

				},
				{	
					react_element : "span",
					args: {
						key : "filename-" +file,
						els : " "+file
					}
				}]

			},{ react_element : "div",
			args :{
				className : "row",
				key : "file-widgets-"+file,

			},
			react_nested : [{
				react_element : "div",
				args : {

					className : "col",
					key : "file-download-"+file,

				},
				react_nested : [{

					react_element : "a",
					args : {

						key : "download-"+file,
						href : path.normalize("\\download" + filesPath.split(root_path).pop()).replace(/\\/g, "/"),
						className : "btn btn-primary btn-margin",
						els : route.i18n.translate("Download", route.lang)

					}

				},{

					react_element : "a",
					args : {

						key : "remove-"+file,
						href : path.normalize(`\\remove${filesPath.split(root_path).pop()}`),
						className : "btn btn-danger",
						els : route.i18n.translate("Remove", route.lang)

					}

				}]


			}]

		}]

	}

}

return Object.assign({}, tpl);

}


}

const removeFile = module.exports.removeFile;
const getAllFiles = module.exports.getAllFiles;
const fileTpl = module.exports.fileTpl;
const folderTpl = module.exports.folderTpl;