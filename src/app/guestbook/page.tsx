"use client";

export default function GuestbookPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Ziyaretçi Defteri
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Buraya düşüncelerinizi, geri bildirimlerinizi veya selam mesajınızı bırakabilirsiniz.
          </p>
        </div>

        {/* Guestbook Content - Şimdilik boş */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50">
          <div className="text-center text-slate-400">
            <p className="text-xl mb-4">🚧 Çok yakında...</p>
            <p>Ziyaretçi defteri özelliği yakında aktif olacak!</p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
