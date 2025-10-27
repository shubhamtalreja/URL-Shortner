const urlModel = require("../models/url.model");

const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'Long URL is required' });
    }

    const shortCode = Math.random().toString(36).substring(7);

    const saveUrl = await urlModel.create({
        originalUrl: longUrl,
        shortId: shortCode
    });
    res.status(201).json({ shortUrl: `${process.env.URL_DOMAIN}/${shortCode}` });
};

const getRedirectUrl = async (req, res) => {

    const urlEntry = await urlModel.findOne( {shortId: req.params.id} );
    if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(urlEntry.originalUrl);
}

module.exports = {
    createShortUrl,
    getRedirectUrl
}
