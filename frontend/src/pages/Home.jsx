import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <h1 className="text-3xl font-semibold">FormForge</h1>
      <p className="text-sm text-white/60">Server Status: Online</p>
      <div className="flex gap-3 justify-center">
        <Link to="/signin" className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-medium">Signin</Link>
        <Link to="/signup" className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-medium">Signup</Link>
      </div>
    </div>
  );
}
