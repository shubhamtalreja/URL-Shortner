import React from 'react'
import { useState } from 'react'
import ENV_CONFIG from '../config/ENV_CONFIG';
import FullScreenLoader from './FullScreenLoader';
import './HomePage.css'

const HomePage = () => {
    const [urlInput, setUrlInput] = useState();
    const [shortUrl, setShortUrl] = useState();
    const [loading, setLoading] = useState();
    const [copied, setCopied] = useState(false);
    const [Error, setError] = useState();

    const handleLongUrl = async () => {
        setLoading(true);
        setError(null);
        try {
            const urlBody = {
                longUrl: urlInput
            }
            const shortUrl = await fetch(`${ENV_CONFIG.BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(urlBody)
            });
            const response = await shortUrl.json();
            setShortUrl(response.shortUrl);
        } catch (error) {
            setError("Failed to generate short URL. Please try again.");
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const handleCopy = () => {
        window.navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <>
            {loading && <FullScreenLoader message="Generating short link..." />}
            <div className="url-container">
                <h1>URL - SHORTENER</h1>

                <input
                    id='urlInput'
                    className="url-input"
                    value={urlInput}
                    maxLength={100}
                    onChange={(e) => {
                        setUrlInput(e.target.value);
                        setShortUrl("");
                    }}
                    placeholder="Enter URL"
                />

                <button className="url-button" onClick={handleLongUrl}>
                    Shorten URL
                </button>
                {Error && <p className="error-message">{Error}</p>}

                {shortUrl && (
                    <div>
                        <input
                            id='resultInput'
                            className="url-result"
                            value={shortUrl}
                            readOnly
                        />
                        <button
                            className="copy-button"
                            onClick={handleCopy}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                )}
            </div>

        </>
    )
}

export default HomePage
