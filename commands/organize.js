let fs = require("fs");
let path = require("path");

let types = {
    media : ['.mp4', '.mkv', '.avi', '.png', '.jpg', '.jpeg'],
    archives : ['.zip', '.7z', '.rar', '.tar', '.gz', '.ar', '.iso', '.xz'],
    documents : ['.docx', '.doc', '.txt', '.pdf', '.xlsx', '.xls', '.odt', '.pptx', '.ppt', '.ps', '.html', 'csv', 'js', 'java'],
    app : ['.exe', '.dmg', '.pkg', '.deb']
}

function organizeFn(dirPath) {
    //console.log("Organize command implemented for", dirPath);
    //1. Check input that is the directoryPath given
    let destPath;
    if(dirPath == undefined){
        dirPath = process.cwd();
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            //2. create -> organize_files -> directory
            destPath = path.join(dirPath, "Organized_files");
            if(fs.existsSync(destPath) == false){ //if the folder directory files already exists, dont create another or error
                fs.mkdirSync(destPath);
            }
        }
    }
    else {
        console.log("Kindly enter a correct path");
    }
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest){
    //3. Identify categories of all the files present in that input directory

    let childNames = fs.readdirSync(src); //get all the names of a directory
    //console.log(childNames);

    for(let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            //console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            //console.log(childNames[i], "belongs to -> ", category);

            //4. copy/cut files to the organized_directory inside of any of the catrgory folders
            sendFiles(childAddress, dest, category);
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i = 0; i < cTypeArray.length; i++){
            if (ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest, category) {
    //first make the sub folders in our folder

    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    //fs.unlinkSync(srcFilePath); //IF YOU WANT TO DELETE THE ORIGINAL FILES TOO

    console.log(fileName, "copied to", category);
}

module.exports = {
    organizeKey: organizeFn
}