const router = require("express").Router();
const { createShortUrl, getRedirectUrl } = require("../controllers/url.controller");

router.post("/create", createShortUrl);
router.get("/:id", getRedirectUrl);


module.exports = router;