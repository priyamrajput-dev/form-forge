import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../services/authService.js';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserProfile();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">FormForge</div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signin" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 flex flex-col items-center min-h-[80vh]">
        <div className="max-w-3xl text-center space-y-8 relative z-10 mt-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Build beautiful forms, <br className="hidden md:block" /> effortlessly.
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            FormForge is the ultimate glassmorphic form builder. Create custom forms, share them instantly, and collect responses with a stunning, modern interface.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Start Building Free
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* How it works Section */}
      <section className="py-24 px-6 relative z-10 border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How FormForge Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Get up and running in minutes with our intuitive builder.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Create your form</h3>
              <p className="text-white/60 leading-relaxed">Use our beautiful dark-mode builder to add fields, customize requirements, and design the perfect form.</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Share the link</h3>
              <p className="text-white/60 leading-relaxed">Generate a unique URL instantly. Share it with your audience via email, social media, or embed it.</p>
            </div>
            
            <div className="p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Collect responses</h3>
              <p className="text-white/60 leading-relaxed">Watch submissions roll in real-time. View all data in a clean, organized dashboard interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm">
          <div>
            <span className="font-semibold text-white/80">FormForge</span> &copy; {new Date().getFullYear()}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]"></div>
      </div>
    </div>
  );
}
