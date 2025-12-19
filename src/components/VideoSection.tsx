import React from 'react'

const VideoSection = () => {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-4xl aspect-video">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/cdM9IgpsQlI" 
                    title="Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="rounded-lg"
                ></iframe>
            </div>
        </div>
    )
}

export default VideoSection
