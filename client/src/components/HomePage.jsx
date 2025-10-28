import React from 'react'
import { useState } from 'react'
import ENV_CONFIG from '../config/ENV_CONFIG';
import FullScreenLoader from './FullScreenLoader';
import './HomePage.css'

const HomePage = () => {
    const [urlInput, setUrlInput] = useState();
    const [shortUrl, setShortUrl] = useState();
    const [loading, setLoading] = useState();

    const handleLongUrl = async () => {
        setLoading(true);
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
            console.log(error);
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            {loading && <FullScreenLoader message="Generating short link..." />}
            <div className="url-container">
                <h1>URL - SHORTENER</h1>

                <input
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

                {shortUrl && (
                    <div>
                        <input
                            className="url-result"
                            value={shortUrl}
                            readOnly
                        />
                    </div>
                )}
            </div>

        </>
    )
}

export default HomePage
