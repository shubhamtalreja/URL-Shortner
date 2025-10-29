const urlModel = require("../models/url.model");
const crypto = require("crypto");

const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'Long URL is required' });
    }

    try {
        new URL(longUrl);
    } catch (err) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    const shortCode = crypto.randomBytes(4).toString("hex");

    try {
        const saveUrl = await urlModel.create({
            originalUrl: longUrl,
            shortId: shortCode,
        });

        return res
            .status(201)
            .json({ shortUrl: `${process.env.URL_DOMAIN}/${shortCode}` });
    } catch (error) {
        console.error("Error saving URL:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
};

const getRedirectUrl = async (req, res) => {

    const urlEntry = await urlModel.findOne({ shortId: req.params.id });
    if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(urlEntry.originalUrl);
}

module.exports = {
    createShortUrl,
    getRedirectUrl
}
