const urlModel = require("../models/url.model");

const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'Long URL is required' });
    }

    const shortUrl = 'short.ly/' + Math.random().toString(36).substring(7);

    const saveUrl = await urlModel.create({
        originalUrl: longUrl,
        shortUrl: shortUrl
    });
    res.status(201).json({ shortUrl: saveUrl.shortUrl });
};

const getRedirectUrl = async (req, res) => {
    const { shortUrl } = req.body;
    if (!shortUrl) {
        return res.status(400).json({ error: 'Short URL is required' });
    }

    const urlEntry = await urlModel.findOne({ shortUrl });
    if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(urlEntry.originalUrl);
}

module.exports = {
    createShortUrl,
    getRedirectUrl
}
