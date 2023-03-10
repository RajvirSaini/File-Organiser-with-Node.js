let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
    //console.log("Tree command implemented for", dirPath);
    let destPath;
    if(dirPath == undefined){
        treeHelper(process.cwd(), ""); //if no directory is given it takes the Current Working Directory as input
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");
        }
        else {
            console.log("Kindly enter a correct path");
        }
    }
}

function treeHelper(dirPath, indent){
    //check if file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(indent +  "├──" + fileName)
    }
    else {  //if it's a directory
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
            let childrens = fs.readdirSync(dirPath);
            for(let i = 0; i < childrens.length; i++){
                let childPath = path.join(dirPath, childrens[i]);
                treeHelper(childPath, indent + "\t");
            }
        }
    }

    module.exports = {
        treeKey: treeFn
    }