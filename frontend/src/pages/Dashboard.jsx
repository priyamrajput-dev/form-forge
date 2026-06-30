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
    <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-white/60 mt-1">Welcome back, {user?.fullName || user?.email}!</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-white/10 text-white hover:bg-white/20 transition-colors px-4 py-2 rounded-md font-medium text-sm"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center flex flex-col justify-center">
          <div className="text-4xl font-bold text-white mb-2">{forms.length}</div>
          <div className="text-sm text-white/60">Total Forms</div>
        </div>
        
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center flex flex-col justify-center">
          <div className="text-4xl font-bold text-white mb-2">-</div>
          <div className="text-sm text-white/60">Total Submissions</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col justify-center">
          {!isCreating ? (
            <button 
              onClick={() => setIsCreating(true)}
              className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-medium w-full"
            >
              + Create New Form
            </button>
          ) : (
            <form onSubmit={handleCreateForm} className="space-y-3">
              <input 
                type="text" 
                placeholder="Form Title" 
                className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none"
                value={newFormTitle}
                onChange={(e) => setNewFormTitle(e.target.value)}
                autoFocus
                required
              />
              <input 
                type="text" 
                placeholder="Description (optional)" 
                className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none"
                value={newFormDesc}
                onChange={(e) => setNewFormDesc(e.target.value)}
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsCreating(false)} className="flex-1 text-white/60 hover:text-white text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-white text-black rounded-md text-sm font-medium py-1.5">Create</button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
        {forms.length === 0 ? (
          <p className="text-white/40 text-sm">You haven't created any forms yet.</p>
        ) : (
          <div className="space-y-3">
            {forms.map(form => (
              <div key={form._id} className="border border-white/10 bg-white/5 p-4 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="font-medium text-lg">{form.title}</h3>
                  {form.description && <p className="text-sm text-white/60">{form.description}</p>}
                </div>
                <div className="flex gap-3">
                  <Link to={`/forms/${form._id}/responses`} className="text-sm text-white/80 hover:text-white px-3 py-1.5 bg-white/10 rounded-md transition-colors border border-white/10">Responses</Link>
                  <Link to={`/forms/${form._id}/edit`} className="text-sm bg-white text-black hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors font-medium">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
