import { TopicItem, CommentItem, SentimentType } from '@/types';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot', 'could',
  'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down',
  'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has',
  'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her',
  'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it',
  'it\'s', 'its', 'itself', 'just', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my',
  'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she',
  'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than',
  'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s',
  'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom',
  'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'video', 'youtube',
  'channel', 'bro', 'guy', 'guys', 'man', 'really', 'also', 'even', 'one', 'like'
]);

export function extractTopics(comments: CommentItem[]): TopicItem[] {
  const keywordStats: Record<string, { count: number; sentimentSum: number }> = {};

  for (const comment of comments) {
    const cleanText = comment.text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .replace(/\s+/g, ' ');

    const words = cleanText.split(' ').filter(w => w.length > 2 && !STOP_WORDS.has(w));
    const uniqueCommentWords = Array.from(new Set(words));

    // Single words
    for (const word of uniqueCommentWords) {
      if (!keywordStats[word]) {
        keywordStats[word] = { count: 0, sentimentSum: 0 };
      }
      keywordStats[word].count += 1;
      keywordStats[word].sentimentSum += comment.sentimentScore;
    }

    // Meaningful 2-word phrases
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`;
      if (!STOP_WORDS.has(words[i]) && !STOP_WORDS.has(words[i + 1])) {
        if (!keywordStats[phrase]) {
          keywordStats[phrase] = { count: 0, sentimentSum: 0 };
        }
        keywordStats[phrase].count += 1;
        keywordStats[phrase].sentimentSum += comment.sentimentScore;
      }
    }
  }

  // Convert to array and filter out low frequencies
  const topics: TopicItem[] = Object.entries(keywordStats)
    .filter(([_, data]) => data.count >= 2)
    .map(([keyword, data]) => {
      const avgScore = data.sentimentSum / data.count;
      let sentiment: SentimentType = 'neutral';
      if (avgScore > 0.15) sentiment = 'positive';
      else if (avgScore < -0.15) sentiment = 'negative';

      return {
        keyword,
        count: data.count,
        sentiment,
        score: Math.round(avgScore * 100) / 100
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 16);

  return topics;
}
