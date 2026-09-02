import { ChannelLeaderboardItem } from '@/types';

export interface ChannelSpyProfile {
  channelHandle: string;
  channelName: string;
  avatar: string;
  subscriberCount: string;
  overallHealthScore: number;
  averageSentiment: number;
  videos: ChannelLeaderboardItem[];
}

export function analyzeChannelSpy(channelHandle: string): ChannelSpyProfile {
  const cleanHandle = channelHandle.trim().toLowerCase().replace('@', '') || 'techpulse';

  // Preset smart mock data for famous channels, or dynamic synthesis
  if (cleanHandle.includes('beast')) {
    return {
      channelHandle: '@MrBeast',
      channelName: 'MrBeast',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      subscriberCount: '320M',
      overallHealthScore: 94,
      averageSentiment: 91,
      videos: [
        {
          id: 'v1',
          title: '$1,000,000 Hotel Room vs $1 Hotel Room!',
          thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80',
          views: '148M',
          publishedDate: '3 days ago',
          sentimentScore: 95,
          positiveRatio: 96,
          verdict: 'Viral Phenomenon 🔥',
          topPraise: 'Insane production scale & philanthropy',
          topCriticism: 'Minor sponsor integration length',
          viralityBadge: 'TOP 1% GLOBAL'
        },
        {
          id: 'v2',
          title: 'I Survived 100 Days In A Nuclear Bunker',
          thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
          views: '112M',
          publishedDate: '2 weeks ago',
          sentimentScore: 91,
          positiveRatio: 92,
          verdict: 'Overwhelmingly Positive',
          topPraise: 'High tension & creative challenges',
          topCriticism: 'Fast cuts in final 5 minutes',
          viralityBadge: 'SUPER VIRAL 🚀'
        },
        {
          id: 'v3',
          title: 'Ages 1 - 100 Decide Who Wins $250,000',
          thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
          views: '98M',
          publishedDate: '1 month ago',
          sentimentScore: 88,
          positiveRatio: 89,
          verdict: 'Mostly Positive',
          topPraise: 'Emotional human connections',
          topCriticism: 'Elimination format felt quick',
          viralityBadge: 'HIGH ENGAGEMENT ⚡'
        },
        {
          id: 'v4',
          title: 'World’s Deadliest Obstacle Course!',
          thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=400&auto=format&fit=crop&q=80',
          views: '105M',
          publishedDate: '2 months ago',
          sentimentScore: 86,
          positiveRatio: 87,
          verdict: 'Mostly Positive',
          topPraise: 'Set design & contestant energy',
          topCriticism: 'Repetitive obstacles in middle',
          viralityBadge: 'SOLID HIT 🎯'
        },
        {
          id: 'v5',
          title: '7 Days Stranded In The Wilderness',
          thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
          views: '89M',
          publishedDate: '3 months ago',
          sentimentScore: 84,
          positiveRatio: 85,
          verdict: 'Positive / Steady',
          topPraise: 'Authentic survival struggle',
          topCriticism: 'Audio mixing during rain scene',
          viralityBadge: 'STEADY'
        }
      ]
    };
  }

  // Default dynamic channel benchmark profile
  return {
    channelHandle: `@${cleanHandle}`,
    channelName: cleanHandle.toUpperCase(),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subscriberCount: '2.4M',
    overallHealthScore: 89,
    averageSentiment: 84,
    videos: [
      {
        id: 'v1',
        title: `${cleanHandle.toUpperCase()}: The Ultimate 2026 Deep Dive & Review`,
        thumbnail: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&auto=format&fit=crop&q=80',
        views: '1.2M',
        publishedDate: '2 days ago',
        sentimentScore: 92,
        positiveRatio: 93,
        verdict: 'Overwhelmingly Positive 🔥',
        topPraise: 'Exceptional visual clarity & honest benchmarks',
        topCriticism: 'Intro hook could be 5 seconds shorter',
        viralityBadge: 'BEST PERFORMER 🏆'
      },
      {
        id: 'v2',
        title: `We Tested Everything You Asked In The Comments!`,
        thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=80',
        views: '840K',
        publishedDate: '1 week ago',
        sentimentScore: 88,
        positiveRatio: 89,
        verdict: 'Mostly Positive',
        topPraise: 'Direct audience Q&A responses',
        topCriticism: 'Skipped 1 major edge case question',
        viralityBadge: 'HIGH ENGAGEMENT ⚡'
      },
      {
        id: 'v3',
        title: `Stop Making This Crucial Mistake in 2026`,
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
        views: '920K',
        publishedDate: '3 weeks ago',
        sentimentScore: 85,
        positiveRatio: 86,
        verdict: 'Mostly Positive',
        topPraise: 'Actionable practical tips & advice',
        topCriticism: 'Audio volume slightly low in middle',
        viralityBadge: 'VIRAL HOOK 🚀'
      },
      {
        id: 'v4',
        title: `The Truth About The Industry (Nobody Wants To Talk About)`,
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
        views: '650K',
        publishedDate: '1 month ago',
        sentimentScore: 79,
        positiveRatio: 80,
        verdict: 'Mixed / Controversial',
        topPraise: 'Bold transparency & insider facts',
        topCriticism: 'Polarized audience opinions in debate',
        viralityBadge: 'DEBATE MAGNET 💬'
      },
      {
        id: 'v5',
        title: `My Full Workspace & Production Setup Tour`,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80',
        views: '410K',
        publishedDate: '2 months ago',
        sentimentScore: 82,
        positiveRatio: 84,
        verdict: 'Positive / Steady',
        topPraise: 'Clean aesthetic & gear links in bio',
        topCriticism: 'A bit niche for general audience',
        viralityBadge: 'STEADY NICHE 🎯'
      }
    ]
  };
}
