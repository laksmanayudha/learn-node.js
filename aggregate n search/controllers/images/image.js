const RandomString = require("../../module/RandomString");
const Path = require('path')

exports.createImage = (req, res) => {
    let data = req.files.imageData;
    console.log(data)

    if( !data.mimetype.includes('image') ){
        res.sendStatus(400)
    }else{
        let newName = RandomString(25) + data.mimetype.replace("image/", ".");
        let dirName = Path.join(__dirname, "../../public");
        console.log(newName);
        data.mv(dirName + "/images/" + newName, function(err, result){
            if (err) console.log(err)
            if (result) console.log("success")
        })
    }

}

exports.imageView = (req, res) => {
    res.render("images")
}

exports.getImages = (req, res) => {
    res.send({
        images: "/images/" + "RcciR93ICe4TV12ba7EgxBlxQ.png",
        orImages: "http:localhost:3000/images/" + "RcciR93ICe4TV12ba7EgxBlxQ.png"
    })
}