export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #f0edff 0%, #e8f4ff 100%)" }}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #8B7FF0, #6B5FD0)" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-3">Site en maintenance</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          TrustMyDiag sera bientôt disponible.<br />
          Nous travaillons à vous offrir la meilleure expérience possible.
        </p>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} TrustMyDiag</p>
      </div>
    </div>
  );
}
