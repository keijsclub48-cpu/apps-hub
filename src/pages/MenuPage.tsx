import React, { useState, useEffect } from 'react';
import { SessionController } from '../controllers/SessionController';

const MenuPage: React.FC = () => {
  // 遷移予定のURLを管理する状態
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // 1. 初期化Effect: ユーザーIDがなければ発行して保存
  useEffect(() => {
    const currentId = localStorage.getItem('hub_user_id');
    if (!currentId) {
      // ランダムなIDを生成（例: user_7a2f9b）
      const newId = 'user_' + Math.random().toString(36).substring(2, 9);
      SessionController.saveUserId(newId);
      console.log('New UserID generated:', newId);
    }
  }, []);

  // 2. 遷移実行Effect: pendingUrlがセットされたら実行
  useEffect(() => {
    if (pendingUrl) {
      // 外部URLへの遷移を副作用（Effect）として実行
      window.location.href = pendingUrl;
    }
  }, [pendingUrl]);

  // 開発中（localhost）か本番（Vercel）かを判定
  const isDev = import.meta.env.DEV;
  const lpUrl = "https://www.voca-nical.com";

  const apps = [
    {
      id: 'vocascan',
      name: 'VocaScan',
      // 本番はドメイン、ローカルは 5173（またはVocaScanのポート）
      baseUrl: isDev ? 'http://localhost:5175' : 'https://scan.voca-nical.com',
      desc: '音声分析・チューナー',
      color: 'bg-blue-800 hover:bg-blue-900 shadow-blue-900/40'
    },
    {
      id: 'other',
      name: 'Other App',
      // 本番はVercel URL、ローカルは 5174
      baseUrl: isDev ? 'http://localhost:5174' : 'https://other-app.vercel.app',
      desc: 'サブアプリケーション',
      color: 'bg-emerald-800 hover:bg-emerald-900 shadow-emerald-900/40'
    },
  ];

  const handleAppLaunch = (baseUrl: string) => {
    // 遷移直前に新しいsessionIdを含んだURLを構築
    const targetUrl = SessionController.buildAppUrl(baseUrl);
    // 状態を更新（これにより2つ目のuseEffectがトリガーされる）
    setPendingUrl(targetUrl);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <header className="mb-12 text-center relative w-full max-w-3xl">
        {/* 左上に「LPに戻る」リンクを配置 */}
        <div className="absolute -top-8 left-0 md:left-4">
          <a
            href={lpUrl}
            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            公式サイト (LP) へ戻る
          </a>
        </div>

        <h1 className="text-4xl font-black text-slate-800 mb-2 italic tracking-tighter">Apps Hub</h1>
        <p className="text-slate-500 text-sm font-medium">測定を開始するアプリを選択してください</p>
      </header>

      {/* --- ここから差し替え --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppLaunch(app.baseUrl)}
            disabled={pendingUrl !== null}
            className={`
        ${app.color} 
        relative flex flex-col items-start justify-end p-8 rounded-3xl shadow-2xl 
        transition-all duration-300 transform 
        active:scale-95 
        ${pendingUrl ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-2 hover:shadow-2xl cursor-pointer'}
        h-48 w-full overflow-hidden border-b-4 border-black/20
      `}
          >
            {/* 背景の大きな文字装飾 */}
            <div className="absolute top-[-10px] right-[-10px] text-white/10 text-9xl font-black select-none pointer-events-none uppercase">
              {app.name.charAt(0)}
            </div>

            <div className="relative z-10 w-full text-left">
              <span className="text-3xl font-black block mb-1 tracking-tight text-white drop-shadow-lg">
                {app.name}
              </span>
              <span className="text-white/90 text-sm font-medium block mb-4">
                {app.desc}
              </span>

              <div className="flex items-center justify-between w-full">
                <span className="bg-black/20 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md border border-white/20">
                  {pendingUrl && pendingUrl.includes(app.baseUrl) ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
                      起動中...
                    </span>
                  ) : (
                    '測定を開始する →'
                  )}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* --- ここまで差し替え --- */}

      {/* デバッグ用：現在のUserID表示（開発完了したら消してOK） */}
      <footer className="mt-12 text-[10px] text-slate-400">
        UserID: {SessionController.getUserId()}
      </footer>
    </div>
  );
};

export default MenuPage;