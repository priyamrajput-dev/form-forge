import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUserProfile, logoutUser } from '../services/authService.js';
import { getMyForms, createForm } from '../services/formService.js';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState('');
  const [newFormDesc, setNewFormDesc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        const formsData = await getMyForms();
        setForms(formsData);
      } catch (err) {
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();
    if (!newFormTitle) return;
    try {
      const newForm = await createForm({ title: newFormTitle, description: newFormDesc });
      navigate(`/forms/${newForm._id}/edit`);
    } catch (err) {
      console.error('Failed to create form', err);
    }
  };

  if (loading) {
    return <div className="text-white/60 text-sm">Loading dashboard...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl pt-4 pb-12 px-2">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-white/60">Forms</p>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-white text-black hover:bg-white/90 transition-colors px-4 py-2 rounded-lg font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Create Form
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {forms.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-6 rounded-lg text-sm text-white/40">
            You haven't created any forms yet.
          </div>
        ) : (
          forms.map(form => (
            <div key={form._id} className="border border-white/10 bg-[#111] p-5 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg text-white">{form.title}</h3>
                {form.description && <p className="text-sm text-white/60 mt-1">{form.description}</p>}
                <span className="block text-xs text-white/30 mt-2">
                  {new Date(form.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link 
                  to={`/forms/${form._id}/responses`} 
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="View responses"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </Link>
                <Link 
                  to={`/forms/${form._id}/edit`} 
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Edit form"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setIsCreating(false)} 
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="p-6 pb-4">
              <h2 className="text-xl font-semibold text-white">Create Form</h2>
              <p className="text-sm text-white/60 mt-1">Add a title and optional description.</p>
            </div>
            <form onSubmit={handleCreateForm} className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Title</label>
                <input 
                  type="text" 
                  placeholder="Form title" 
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-white/30"
                  value={newFormTitle}
                  onChange={(e) => setNewFormTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Description</label>
                <textarea 
                  placeholder="Optional description" 
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-white/30 min-h-[100px] resize-none"
                  value={newFormDesc}
                  onChange={(e) => setNewFormDesc(e.target.value)}
                />
              </div>
              <div className="pt-2 flex justify-end">
                <button 
                  type="submit" 
                  disabled={!newFormTitle.trim()}
                  className="bg-white/90 text-black hover:bg-white rounded-md text-sm font-medium py-2 px-6 disabled:opacity-50 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
