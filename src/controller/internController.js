const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')
const validator = require("email-validator");
var _ = require('lodash');

var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

const validName = (val) => {
    if (typeof val === null)
        return false;
    if (typeof val === 'string' && val.trim().length < 1) return false
    return true;

}

const createIntern = async (req, res) => {
    try {

        const { name, email, mobile, collegeName, isDeleted } = req.body

        if (!validName(name)) return res.status(400).send({ status: false, messgae: "Blank Spaces are not Allowed In name" })

        else if (!validName(email)) return res.status(400).send({ status: false, messgae: "Blank Spaces are not Allowed in email" })

        else if (!validName(mobile)) return res.status(400).send({ status: false, messgae: "Blank Spaces are not Allowed in mobile" })

        else if (!validName(collegeName)) return res.status(400).send({ status: false, messgae: "Blank Spaces are not Allowed in collegeName" })

        else 
        {

            if (_.isEmpty(req.body)) {
                return res.status(404).send({ status: false, messgae: "All fields are mendatory...." })
            }


            if (!name) {
                return res.status(400).send({ status: false, messgae: "Name is mendatory.." })
            } else if (!email) {
                return res.status(400).send({ status: false, messgae: "email is mendatory.." })
            }
            else if (validator.validate(email) != true) {
                return res.status(400).send({ status: false, messgae: "Invalid Email.." })
            }
            else if (!mobile) {
                return res.status(400).send({ status: false, messgae: "mobile is mendatory.." })
            }
            else if (re.test(mobile) != true) {
                return res.status(400).send({ status: false, messgae: "Invalid Mobile Number" })
            } else if (!collegeName) {
                return res.status(400).send({ status: false, messgae: "collegeName is mendatory.." })
            } else {

                let findAllIntern = await internModel.find({ $or: [{ email: email }, { name: name }, { mobile: mobile }] })
                if (findAllIntern.length > 0) return res.status(400).send({ status: false, message: "You are already Registered.." })

                let findAllCollege = await collegeModel.find({ "name": { $regex: collegeName } })

                if (findAllCollege.length < 1) return res.status(404).send({ status: false, message: "College not found" })
                
                if (findAllCollege[0].name != collegeName) return res.status(404).send({ status: false, message: "Invalid College Name...." })

                collegeId = findAllCollege[0]._id

                let data = { name, email, mobile, collegeId, isDeleted }

                let createIntern = await internModel.create(data)
                res.status(201).send({ status: true, data: createIntern })
            }
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }

}



module.exports = { createIntern }