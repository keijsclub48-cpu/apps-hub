import React, { useState, useEffect } from 'react';
import { SessionController } from '../controllers/SessionController';

const MenuPage: React.FC = () => {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1. UserIDの発行・保存
    const currentId = localStorage.getItem('hub_user_id');
    if (!currentId) {
      const newId = 'user_' + Math.random().toString(36).substring(2, 9);
      SessionController.saveUserId(newId);
    }

    // 2. ブラウザの「戻る」対策
    // 本番環境のキャッシュ復元（Bfcache）に対応するため
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setPendingUrl(null); // ボタンのロックを解除
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    if (pendingUrl) {
      window.location.href = pendingUrl;
    }
  }, [pendingUrl]);

  const isDev = import.meta.env.DEV;
  const lpUrl = "https://www.voca-nical.com";

  const apps = [
    {
      id: 'vocascan',
      name: 'VocaScan',
      baseUrl: isDev ? 'http://localhost:5175' : 'https://scan.voca-nical.com',
      desc: '音声分析・チューナー',
      emoji: '🎵',
      color: 'bg-white border-gray-100 hover:border-[#6b8e4e]/30'
    },
    {
      id: 'other',
      name: 'Other App',
      baseUrl: isDev ? 'http://localhost:5174' : 'https://other-app.vercel.app',
      desc: 'サブアプリケーション',
      emoji: '✨',
      color: 'bg-white border-gray-100 hover:border-[#6b8e4e]/30'
    },
  ];

  const handleAppLaunch = (baseUrl: string) => {
    const targetUrl = SessionController.buildAppUrl(baseUrl);
    setPendingUrl(targetUrl);
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-[#1a1a1a] flex flex-col items-center justify-center p-6 font-sans antialiased">
      <header className="mb-16 text-center relative w-full max-w-2xl">
        <div className="absolute -top-12 left-0 md:left-0">
          <a href={lpUrl} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b8e4e] hover:opacity-70 transition-all">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Official
          </a>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-[#1a1a1a]">Apps Hub</h1>
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Select Your Tool</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppLaunch(app.baseUrl)}
            disabled={pendingUrl !== null}
            className={`
              ${app.color} group relative flex flex-col items-center justify-center p-10 rounded-[2.5rem] 
              border shadow-sm transition-all duration-500
              ${pendingUrl ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-2 hover:shadow-xl cursor-pointer'}
              min-h-[280px] w-full overflow-hidden
            `}
          >
            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{app.emoji}</div>
            <div className="text-center">
              <span className="text-2xl font-black block mb-2 tracking-tighter text-[#6b8e4e]">{app.name}</span>
              <span className="text-gray-400 text-sm font-medium block mb-8">{app.desc}</span>
              <div className="inline-block bg-[#6b8e4e] text-white px-6 py-2 rounded-full text-xs font-bold shadow-md group-hover:bg-[#5a7a42] transition-colors">
                {pendingUrl && pendingUrl.includes(app.baseUrl) ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
                    Starting...
                  </span>
                ) : '測定を開始する →'}
              </div>
            </div>
          </button>
        ))}
      </div>

      <footer className="mt-20 text-center">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em]">UserID: {SessionController.getUserId()}</p>
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em] mt-2">&copy; 2026 Voca-nical studio.</p>
      </footer>
    </div>
  );
};

export default MenuPage;