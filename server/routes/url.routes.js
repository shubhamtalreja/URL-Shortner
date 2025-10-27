const router = require("express").Router();
const { createShortUrl, getRedirectUrl } = require("../controllers/url.controller");

router.post("/create", createShortUrl);
router.get("/", getRedirectUrl);


module.exports = router;