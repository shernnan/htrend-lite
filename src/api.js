export function extractVideoId(url) {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
}

export async function fetchVideoMetrics(videoId, apiKey) {
    if (!apiKey) {
        throw new Error("API_KEY_MISSING");
    }

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "API_RESPONSE_ERROR");
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error("VIDEO_NOT_FOUND");
        }

        const videoData = data.items[0];

        return {
            title: videoData.snippet.title,
            channelTitle: videoData.snippet.channelTitle,
            description: videoData.snippet.description,
            thumbnail: videoData.snippet.thumbnails.maxres?.url || videoData.snippet.thumbnails.high?.url,
            metrics: {
                views: parseInt(videoData.statistics.viewCount || 0, 10),
                likes: parseInt(videoData.statistics.likeCount || 0, 10),
                comments: parseInt(videoData.statistics.commentCount || 0, 10)
            }
        };

    } catch (error) {
        console.error("Error fetching data from YouTube API:", error);
        throw error;
    }
}