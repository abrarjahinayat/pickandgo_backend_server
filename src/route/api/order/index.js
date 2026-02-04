const express = require("express");
const { ordereControllers, getallordersControllers, odersuccessControllers, orderfailControllers, ordercancelControllers, getSingleorderControllers, getSingleuserorderControllers, updateOrderStatusController } = require("../../../controllers/orderControllers");

const router = express.Router();

router.post("/createorder", ordereControllers );

router.get("/getallorders", getallordersControllers );

router.post("/success/:id", odersuccessControllers );

router.post("/fail/:id", orderfailControllers );

router.post("/cancel", ordercancelControllers );

router.get("/singleorder/:id", getSingleorderControllers  );

router.get("/singleuserorder/:id",  getSingleuserorderControllers );

router.patch("/updatestatus/:id", updateOrderStatusController);

module.exports = router;
