import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/signin');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-white/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-white/80 transition-colors">
            FormForge
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/" 
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/dashboard' 
                ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-400/80 hover:bg-red-400/10 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen overflow-x-hidden bg-black relative">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
