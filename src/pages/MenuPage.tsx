const MenuPage = () => {
  const apps = [
    { 
      name: 'VocaScan', 
      url: 'https://scan.voca-nical.com', 
      desc: '音声分析・チューナー',
      color: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' 
    },
    { 
      name: 'Other App', 
      // url: 'http://localhost:5174', // 実際のURLに合わせて変更してください
      url: 'https://other-app.vercel.app', // 実際のURLに合わせて変更してください
      desc: 'サブアプリケーション',
      color: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' 
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Apps Hub</h1>
        <p className="text-slate-500 font-medium">利用するアプリを選択してください</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            className={`${app.color} group relative flex flex-col items-center justify-center p-12 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-white`}
          >
            <span className="text-3xl font-bold mb-2">
              {app.name}
            </span>
            <span className="text-white/80 text-sm font-medium">
              {app.desc}
            </span>
            
            {/* ホバー時に右下に矢印を表示する装飾（任意） */}
            <span className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;