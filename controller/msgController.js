const axios = require("axios");
const {
    appointment_pdf,
    appointment_simple,
} = require("../templates/templates.json");
require("dotenv").config();

const appointment_pdfVarFill = (reqBody) => {
    const template = appointment_pdf;
    template.payload.to = reqBody.variables.mobileNo;
    template.payload.template.components[0].parameters[0].document.link =
        reqBody.variables.headerURL;
    template.payload.template.components[1].parameters[0].text =
        reqBody.variables.bodyVar1;
    template.payload.template.components[1].parameters[1].text =
        reqBody.variables.bodyVar2;
    template.payload.template.components[1].parameters[2].text =
        reqBody.variables.bodyVar3;
    template.payload.template.components[1].parameters[3].text =
        reqBody.variables.bodyVar4;
    return template;
};

const appointment_simpleVarFill = (reqBody) => {
    const template = appointment_simple;
    template.payload.to = reqBody.variables.mobileNo;
    template.payload.template.components[0].parameters[0].text =
        reqBody.variables.bodyVar1;
    template.payload.template.components[0].parameters[1].text =
        reqBody.variables.bodyVar2;
    template.payload.template.components[0].parameters[2].text =
        reqBody.variables.bodyVar3;
    template.payload.template.components[0].parameters[3].text =
        reqBody.variables.bodyVar4;
    template.payload.template.components[0].parameters[4].text =
        reqBody.variables.bodyVar5;
    return template;
};

module.exports.appointment_pdfControllerTest = (req, res) => {
    try {
        res.status(200).json({ msg: "Working fine" });
    } catch (error) {
        console.log("ErrorOccured: ", error);
        res.status(500).json({ msg: "ErrorOccured", error: error });
    }
};
module.exports.appointment_simpleControllerTest = (req, res) => {
    try {
        res.status(200).json({ msg: "Working fine" });
    } catch (error) {
        console.log("ErrorOccured: ", error);
        res.status(500).json({ msg: "ErrorOccured", error: error });
    }
};

module.exports.appointment_pdfController = async (req, res) => {
    try {
        const details = appointment_pdfVarFill(req.body);
        const msg91ApiStatus = await axios.post(
            "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/",
            details,
            {
                headers: {
                    accept: "application/json",
                    authkey: `${process.env.AUTH}`,
                    "content-type": "application/json",
                },
            }
        );
        if (!msg91ApiStatus) {
            throw new Error("Third party API Error");
        }
        res.status(200).json({
            msg: "MessageSent",
            data: msg91ApiStatus.data.status,
        });
    } catch (error) {
        console.log("ErrorOccured: ", error);
        res.status(500).json({ msg: "ErrorOccured", error: error });
    }
};

module.exports.appointment_simpleController = async (req, res) => {
    try {
        const details = appointment_simpleVarFill(req.body);
        const msg91ApiStatus = await axios.post(
            "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/",
            details,
            {
                headers: {
                    accept: "application/json",
                    authkey: `${process.env.AUTH}`,
                    "content-type": "application/json",
                },
            }
        );
        if (!msg91ApiStatus) {
            throw new Error("Third party API Error");
        }
        res.status(200).json({
            msg: "MessageSent",
            data: msg91ApiStatus.data.status,
        });
    } catch (error) {
        console.log("ErrorOccured: ", error);
        res.status(500).json({ msg: "ErrorOccured", error: error });
    }
};
