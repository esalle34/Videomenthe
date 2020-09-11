const path = require("path");
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();

export const getAllRoutes = function(){

		const _routing = [{
				name : "browse",
				method : "get",
				uri : "/browse*",
				filepath : path.resolve(global.MODULE_VIDEOMENTHE),
				filename : "videomenthe",
				theme : "main",
				callback : "getFiles"

			},
			{
				name : "download",
				method : "get",
				uri : "/download*",
				filepath : path.resolve(global.MODULE_VIDEOMENTHE),
				filename : "videomenthe",
				theme : "main",
				callback : "downloadFile"

			},
			{	
				name : "upload",
				method: "post",
				uri : "/upload*",
				filepath : path.resolve(global.MODULE_VIDEOMENTHE),
				filename : "videomenthe",
				theme : "main",
				callback : "uploadFile"
			},
			{
				name : "remove",
				method: "get",
				uri : "/remove*",
				filepath : path.resolve(global.MODULE_VIDEOMENTHE),
				filename : "videomenthe",
				theme : "main",
				callback : "deleteFile"
			},
			{
				name : "newFolder",
				method: "post",
				uri : "/newfolder*",
				filepath : path.resolve(global.MODULE_VIDEOMENTHE),
				filename : "videomenthe",
				theme : "main",
				callback : "newFolder"
			}];

		return _routing;

}