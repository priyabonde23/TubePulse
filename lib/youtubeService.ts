import { VideoMetadata, CommentItem } from '@/types';
import { SAMPLE_VIDEOS, buildProcessedComments } from './sampleDatasets';
import { analyzeSentiment } from './nlpEngine';
import { classifyEmotion, detectIsQuestion } from './emotionClassifier';
import { evaluateSafety, extractTimestamp } from './toxicityEngine';

/**
 * Extracts YouTube Video ID or Search Query from various URL formats
 */
export function parseYouTubeInput(input: string): { type: 'id' | 'search' | 'demo'; value: string; displayTitle?: string } {
  if (!input) return { type: 'demo', value: 'trailer-demo' };
  const trimmed = input.trim();

  // If it's a known demo key directly
  if (SAMPLE_VIDEOS[trimmed]) {
    return { type: 'demo', value: trimmed };
  }

  // Check if it's a YouTube search URL (e.g. youtube.com/results?search_query=main+wapas+aaunga+trailer)
  if (trimmed.includes('youtube.com/results') || trimmed.includes('search_query=')) {
    try {
      const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      const query = urlObj.searchParams.get('search_query') || '';
      const cleanTitle = decodeURIComponent(query.replace(/\+/g, ' ')).trim();
      if (cleanTitle) {
        return {
          type: 'search',
          value: cleanTitle,
          displayTitle: cleanTitle.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        };
      }
    } catch {
      const match = trimmed.match(/search_query=([^&]+)/);
      if (match && match[1]) {
        const clean = decodeURIComponent(match[1].replace(/\+/g, ' ')).trim();
        return { type: 'search', value: clean, displayTitle: clean };
      }
    }
  }

  // Standard regex for direct YouTube video URLs
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2] && match[2].length >= 11) {
    return { type: 'id', value: match[2].substring(0, 11) };
  }

  // If it's an exact 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return { type: 'id', value: trimmed };
  }

  // If user typed a search query
  return {
    type: 'search',
    value: trimmed,
    displayTitle: trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  };
}

/**
 * Fetch video metadata and comments using YouTube Data API v3 or realistic synthetic fallback
 */
export async function fetchYouTubeData(
  inputUrlOrQuery: string,
  apiKey?: string
): Promise<{ video: VideoMetadata; comments: CommentItem[] }> {
  const parsed = parseYouTubeInput(inputUrlOrQuery);

  // 1. Check if it matches our pre-loaded rich demo packs
  if (parsed.type === 'demo' && SAMPLE_VIDEOS[parsed.value]) {
    const pkg = SAMPLE_VIDEOS[parsed.value];
    return {
      video: pkg.metadata,
      comments: buildProcessedComments(pkg.rawComments)
    };
  }

  // 2. If it's a direct Video ID and user provided an API key
  if (parsed.type === 'id' && apiKey && apiKey.trim().length > 10) {
    try {
      const videoId = parsed.value;
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
      );
      const videoData = await videoRes.json();

      if (videoData.items && videoData.items.length > 0) {
        const item = videoData.items[0];
        const snippet = item.snippet;
        const stats = item.statistics;

        const video: VideoMetadata = {
          id: videoId,
          title: snippet.title,
          channelTitle: snippet.channelTitle,
          thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
          viewCount: parseInt(stats.viewCount || '0', 10),
          likeCount: parseInt(stats.likeCount || '0', 10),
          commentCount: parseInt(stats.commentCount || '0', 10),
          publishedAt: snippet.publishedAt,
          url: `https://www.youtube.com/watch?v=${videoId}`
        };

        const commentsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&order=relevance&key=${apiKey}`
        );
        const commentsData = await commentsRes.json();

        const comments: CommentItem[] = [];
        if (commentsData.items) {
          commentsData.items.forEach((cItem: any, idx: number) => {
            const topComment = cItem.snippet.topLevelComment.snippet;
            const text = topComment.textDisplay || topComment.textOriginal || '';
            const sentimentRes = analyzeSentiment(text);
            const emotionRes = classifyEmotion(text, sentimentRes.score);
            const isQuestion = detectIsQuestion(text);
            const safety = evaluateSafety(text);
            const ts = extractTimestamp(text);

            comments.push({
              id: cItem.id || `c-${idx}`,
              author: topComment.authorDisplayName || 'Anonymous Viewer',
              authorAvatar: topComment.authorProfileImageUrl,
              text: topComment.textOriginal || text,
              likes: topComment.likeCount || 0,
              publishedAt: topComment.publishedAt || new Date().toISOString(),
              sentiment: sentimentRes.sentiment,
              sentimentScore: sentimentRes.score,
              emotion: emotionRes.emotion,
              emotionScore: emotionRes.score,
              isQuestion,
              isToxic: safety.isToxic,
              isSpam: safety.isSpam,
              timestamp: ts.timestamp
            });
          });
        }

        return { video, comments };
      }
    } catch (err) {
      console.warn('YouTube API call failed, falling back to smart contextual generator:', err);
    }
  }

  // 3. Fallback: Contextual Generator for Search Queries / Trailers / Video URLs
  const title = parsed.displayTitle || (parsed.type === 'id' ? `YouTube Video (${parsed.value})` : parsed.value);
  const isTrailer = title.toLowerCase().includes('trailer') || title.toLowerCase().includes('teaser') || title.toLowerCase().includes('movie');

  const video: VideoMetadata = {
    id: parsed.value,
    title: isTrailer ? `${title} | Official Response & Reactions` : `${title}`,
    channelTitle: isTrailer ? 'Official Film Channel' : 'Creator Media',
    thumbnail: isTrailer
      ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'
      : (parsed.type === 'id' ? `https://img.youtube.com/vi/${parsed.value}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'),
    viewCount: isTrailer ? 1850000 : 420000,
    likeCount: isTrailer ? 98000 : 26000,
    commentCount: isTrailer ? 4500 : 1200,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    url: inputUrlOrQuery.startsWith('http') ? inputUrlOrQuery : `https://www.youtube.com/results?search_query=${encodeURIComponent(parsed.value)}`
  };

  const contextualComments = isTrailer ? [
    { author: 'Rahul Sharma', text: 'Kya jabardast trailer hai! Background music sun kar 01:20 par goosebumps aa gaye 🔥🔥', likes: 1420, date: '1 day ago' },
    { author: 'Pooja Verma', text: 'Lead actor ki dialogue delivery aur intensity at 00:45 mindblowing hai! Pure paisa wasool 🐐', likes: 980, date: '1 day ago' },
    { author: 'FilmGeek India', text: 'Yeh movie theatre me kab release ho rahi hai? Exact date confirm hai kya? 🤔', likes: 430, date: '18 hours ago' },
    { author: 'Aman Patel', text: 'Cinematography aur color grading bohot fresh lag rahi hai. Shandar direction! 👏', likes: 620, date: '1 day ago' },
    { author: 'ReviewMaster', text: 'Story thodi predictable lag rahi hai, but 02:10 ka action scene top notch tha! 10/10 hype.', likes: 290, date: '20 hours ago' },
    { author: 'DesiCinephile', text: 'Climax shot me jo twist hint kiya hai wo dekhne layak hoga! Can\'t wait! 🚀', likes: 510, date: '1 day ago' },
    { author: 'Vikas Kumar', text: 'Songs kab release honge is movie ke? Title track kaafi catchy tha.', likes: 180, date: '12 hours ago' },
    { author: 'Sneha Roy', text: 'Super excited! First day first show pakka dekhne jaungi ❤️✨', likes: 340, date: '1 day ago' }
  ] : [
    { author: 'DigitalNomad', text: 'The editing and pacing in this video is top tier! Keep up the amazing work at 03:15 🔥🚀', likes: 450, date: '2 days ago' },
    { author: 'Jordan_K', text: 'Loved the visual breakdown at 04:30. Super clean explanation!', likes: 290, date: '2 days ago' },
    { author: 'TechCritique', text: 'Good points overall, but felt a bit repetitive towards the end.', likes: 84, date: '1 day ago' },
    { author: 'CuriousMind', text: 'Can anyone explain what happened at 08:12? I got slightly confused 🤔', likes: 112, date: '1 day ago' },
    { author: 'ProGamer99', text: 'This exceeded all my expectations. Absolutely legendary content 🐐', likes: 620, date: '3 days ago' },
    { author: 'AestheticVibes', text: 'The color grading and sound design is chef\'s kiss ✨❤️', likes: 195, date: '2 days ago' }
  ];

  return {
    video,
    comments: buildProcessedComments(contextualComments)
  };
}
