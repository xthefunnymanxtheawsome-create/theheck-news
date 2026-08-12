import React, { useState, useMemo } from 'react';
import { Menu, Play, Volume2, VolumeX, Sparkles, ExternalLink, ArrowLeft, Flame, TrendingUp, Search, RefreshCw } from 'lucide-react';

const generateMassiveArticles = () => {
  const categories = ['DIGITAL CULTURE', 'ALGORITHMS', 'CREATOR ECONOMY', 'TECH & AI', 'INTERNET LORE', 'GAMING'];
  const authors = ['Alex Rivera', 'Marcus Vance', 'Elena Rostova', 'Devon Hayes', 'Samantha Wu', 'Jordan Bell', 'Chloe Bennett'];
  const badges = ['EXCLUSIVE', 'ANALYSIS', 'TRENDS', 'DEBATE', 'EXPLAINER', 'CULTURE', 'BREAKING'];
  
  const images = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'
  ];

  const mainStory = {
    id: 'juvo-high-effort-story',
    badge: 'EXCLUSIVE',
    title: "High effort doesn't deserve low views: Inside the story of TikTok’s @juvoiswatching",
    subtitle: "A young creator pours dozens of hours into meticulous visual storytelling and hidden ARG codes, battling a social media algorithm that favors low-effort trends over passion.",
    category: 'DIGITAL CULTURE',
    author: 'Alex Rivera',
    publishedAt: 'Aug. 12, 2026',
    readTime: '4 min read',
    views: '142.5K',
    videoOverlayText: '@juvoiswatching spends 20+ hours per clip despite modest view counts',
    videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tiktokUrl: 'https://www.tiktok.com/@juvoiswatching?_r=1&_t=ZT-98pYIyQBrzi',
    subLinkBadge: 'DEEP DIVE',
    subLinkText: 'Why short-form recommendation algorithms reward rage-bait over craft',
    content: [
      "In a social media ecosystem dominated by five-second reaction clips, @juvoiswatching puts dozens of hours into every single upload.",
      "From intricate color grading to embedded binary puzzles, the content rivals small-budget indie films.",
      "### The Grind Behind the Screen",
      "I can spend 15 to 20 hours working on keyframing inside a single 30-second video.",
      "### What Lies Ahead",
      "Communities are finding new ways to support underrated creators through direct sharing."
    ]
  };

  const list = [mainStory];
  for (let i = 1; i <= 100; i++) {
    list.push({
      id: `article-${i}`,
      badge: badges[i % badges.length],
      title: `Digital Culture Report #${i}: Structural Changes in Feed Algorithms`,
      subtitle: "An in-depth investigation into distribution mechanics for independent online creators.",
      category: categories[i % categories.length],
      author: authors[i % authors.length],
      publishedAt: `Aug. ${Math.max(1, 12 - Math.floor(i / 10))}, 2026`,
      time: `${(i % 12) + 1}h ago`,
      readTime: '3 min read',
      image: images[i % images.length],
      content: ["Digital news reporting content paragraph 1...", "Paragraph 2 details..."]
    });
  }
  return list;
};

export default function App() {
  const [allArticles] = useState(() => generateMassiveArticles());
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);

  const mainStory = allArticles[0];
  const categories = ['ALL', 'DIGITAL CULTURE', 'ALGORITHMS', 'CREATOR ECONOMY', 'TECH & AI', 'INTERNET LORE', 'GAMING'];

  const filteredArticles = useMemo(() => {
    return allArticles.filter(art => {
      const matchesCategory = activeCategory === 'ALL' || art.category === activeCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="border-b border-slate-200 sticky top-0 bg-white z-40">
        <div className="px-4 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setSelectedArticle(null)}>
            <div className="w-9 h-9 bg-red-600 flex items-center justify-center font-black text-white text-xl">TH</div>
            <span className="font-black text-2xl uppercase font-serif">THEHECK NEWS</span>
          </div>
          <Menu className="w-6 h-6 text-slate-800 cursor-pointer" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {selectedArticle ? (
          <div>
            <button onClick={() => setSelectedArticle(null)} className="text-xs font-bold text-red-600 mb-4 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-3xl font-serif font-black mb-4">{selectedArticle.title}</h1>
            <p className="text-slate-600 mb-6">{selectedArticle.subtitle}</p>
            {selectedArticle.content.map((p, idx) => <p key={idx} className="mb-4">{p}</p>)}
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-serif font-black mb-4 cursor-pointer" onClick={() => setSelectedArticle(mainStory)}>
              {mainStory.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {filteredArticles.slice(0, visibleCount).map(art => (
                <div key={art.id} onClick={() => setSelectedArticle(art)} className="border p-3 cursor-pointer hover:border-red-600">
                  <h4 className="font-bold text-sm font-serif">{art.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}