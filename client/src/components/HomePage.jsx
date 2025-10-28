import React from 'react'
import { useState } from 'react'
import ENV_CONFIG from '../config/ENV_CONFIG';

const HomePage = () => {
    const [urlInput, setUrlInput] = useState();
    const [shortUrl, setShortUrl] = useState();

    const handleLongUrl = async() =>{
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
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <h1>URL - SHORTNER</h1>

            <input
                style={{height:'2rem', width: '30rem'}}
                value={urlInput}
                max={100}
                onChange={(e) => {setUrlInput(e.target.value); setShortUrl('')}} 
                placeholder='Enter URL'/>
            <button style={{height:'2rem', width:'10rem', marginTop:'10px'}} onClick={handleLongUrl}>Short-URL</button>
            {shortUrl &&
                <div>
                    <input
                        style={{ height: '2rem', width: '30rem', marginTop: '10px' }}
                        value={shortUrl}
                        readOnly />
                </div>
            }
        </div>
    )
}

export default HomePage
