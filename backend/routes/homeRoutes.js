const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getAllData);
router.post("/", homeController.postData);
router.delete("/:ExId", homeController.deleteData);
router.put("/:ExId", homeController.putData);

module.exports = router;
