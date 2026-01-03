// src/controllers/SessionController.ts

export const SessionController = {
  // userId を LocalStorage に保存
  saveUserId: (userId: string) => {
    localStorage.setItem('hub_user_id', userId);
  },

  // userId を取得
  getUserId: () => {
    return localStorage.getItem('hub_user_id') || 'guest_user';
  },

  // 新しい sessionId (UUID) を発行
  generateSessionId: () => {
    return crypto.randomUUID(); // ブラウザ標準のUUID生成
  },

  // 測定アプリへのURLを構築
  buildAppUrl: (baseUrl: string) => {
    const userId = SessionController.getUserId();
    const sessionId = SessionController.generateSessionId();
    
    // URLパラメータとして付与
    const url = new URL(baseUrl);
    url.searchParams.set('userId', userId);
    url.searchParams.set('sessionId', sessionId);
    
    return url.toString();
  }
};