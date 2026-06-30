import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.js';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await loginUser({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-white/60 mt-2">Sign in to continue to FormForge</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-md text-sm text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 block" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 block" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center text-sm text-white/60">
        Don't have an account?{' '}
        <Link to="/signup" className="text-white hover:underline transition-all">Sign up</Link>
      </div>
    </div>
  );
}
