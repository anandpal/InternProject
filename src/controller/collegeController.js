const collegeModel = require("../model/collegeModel");


const isvalidResquest = (requestBody) => {
    return Object.keys(requestBody).length > 0
}

const validName = (val) => {
    if (typeof val === "undefined" || typeof val === null)
        return false;
    if (typeof val === 'string' && val.trim().length == 0) return false
    return true;

}

const createCollege = async (req, res) => {
    try {
        let requestBody = req.body
        if (!isvalidResquest(requestBody)) return res.status(404).send({ satus: false, message: " please provid valid details in body section" })

        let { name, fullName, logoLink } = requestBody

        if (!name) return res.status(400).send({ status: false, message: "Oppss..!! name is Required" });

        if (!validName(name))
            return res.status(400).send({ status: false, message: "Oh noo..!! Blank Spaces are not Allowed in name" })

        if (!fullName) return res.status(400).send({ status: false, message: "Oppss..!! fullName is required" });

        if (!validName(fullName))
            return res.status(400).send({ status: false, message: "Oh noo..!! Blank Spaces are not Allowed in fullName" });

        if (!logoLink) return res.status(400).send({ status: false, message: "Oppss..!! logo link is required" });

        if (!validName(logoLink))
            return res.status(400).send({ status: false, message: "Oh noo..!! Blank Spaces are not Allowed in logoLink" });

        let newName = await collegeModel.findOne({ name })
        if (newName) return res.status(400).send({ status: false, message: "Oppss..!! name is already registered" });


        let saveData = await collegeModel.create(requestBody);
        return res.status(201).send({ status: true, data: saveData })


    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, meessage: err.meessage })
    }
}



module.exports.createCollege = createCollege