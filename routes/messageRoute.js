const express = require("express");
const router = express.Router();
const {
    appointment_pdfController,
    appointment_simpleController,
    appointment_pdfControllerTest,
    appointment_simpleControllerTest
} = require("../controller/msgController");

router.route("/appointmentDocs").get(appointment_pdfControllerTest).post(appointment_pdfController);

router.route("/appointmentNoDocs").get(appointment_simpleControllerTest).post(appointment_simpleController);

module.exports = router;
