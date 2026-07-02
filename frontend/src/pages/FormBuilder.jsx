import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFormWithFields } from '../services/formService.js';
import { createField } from '../services/fieldService.js';

export default function FormBuilder() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Field creation state
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldType, setFieldType] = useState('text');
  const [fieldDescription, setFieldDescription] = useState('');
  const [fieldPlaceholder, setFieldPlaceholder] = useState('');
  const [fieldRequired, setFieldRequired] = useState(false);
  const [isAddingField, setIsAddingField] = useState(false);
  const [error, setError] = useState('');

  const fetchForm = async () => {
    try {
      const data = await getFormWithFields(id);
      setForm(data.form);
      setFields(data.fields);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForm();
  }, [id]);

  const handleAddField = async (e) => {
    e.preventDefault();
    if (!fieldLabel) return;
    setError('');
    
    // Auto-generate a labelKey from the label
    const labelKey = fieldLabel.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const index = fields.length;

    try {
      await createField({
        formId: id,
        label: fieldLabel,
        type: fieldType,
        description: fieldDescription,
        placeholder: fieldPlaceholder,
        isRequired: fieldRequired,
        labelKey,
        index
      });
      // Reset and refetch
      setFieldLabel('');
      setFieldType('text');
      setFieldDescription('');
      setFieldPlaceholder('');
      setFieldRequired(false);
      setIsAddingField(false);
      fetchForm();
    } catch (err) {
      setError(err?.message || 'Failed to add field');
    }
  };

  if (loading) return <div className="text-white/60 text-sm p-8">Loading form...</div>;
  if (!form) return <div className="text-white/60 text-sm p-8">Form not found</div>;

  const shareUrl = `${window.location.origin}/f/${form._id}`;

  return (
    <div className="mx-auto w-full max-w-5xl pt-4 pb-12 px-2 relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Form Builder</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAddingField(true)}
            className="bg-white text-black hover:bg-white/90 transition-colors px-4 py-2 rounded-lg font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Create Field
          </button>
        </div>
      </div>

      <div className="mb-8 p-5 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between backdrop-blur-md">
        <div>
          <div className="text-sm text-white/80 font-medium mb-1">Share Link</div>
          <div className="text-sm text-white/50">{shareUrl}</div>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(shareUrl)}
          className="text-sm bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/5"
        >
          Copy Link
        </button>
      </div>

      <div className="space-y-4">
        <div className="border border-white/10 bg-[#111] p-6 rounded-lg min-h-[100px] flex items-center">
          <span className="text-white/40">Form canvas</span>
        </div>

        {fields.length === 0 ? (
          <div className="border border-white/10 bg-[#111] p-6 rounded-lg">
            <span className="text-white/40">No fields yet.</span>
          </div>
        ) : (
          <div className="space-y-0 border border-white/10 rounded-lg overflow-hidden bg-[#111]">
            {fields.map((f, i) => (
              <div key={f._id} className="p-5 flex justify-between items-center border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{f.label}</span>
                    {f.isRequired && <span className="text-[10px] uppercase font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-sm">Required</span>}
                  </div>
                  {f.description && <p className="text-sm text-white/50 mt-0.5">{f.description}</p>}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-widest text-xs font-medium">{f.type}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAddingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setIsAddingField(false)} 
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <div className="p-6 pb-4">
              <h2 className="text-xl font-semibold text-white">Create Field</h2>
              <p className="text-sm text-white/60 mt-1">Add a field to this form.</p>
            </div>
            
            <form onSubmit={handleAddField} className="px-6 pb-6 space-y-4">
              {error && <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded">{error}</div>}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Label</label>
                <input 
                  type="text" 
                  placeholder="Field label" 
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-white/30"
                  value={fieldLabel}
                  onChange={(e) => setFieldLabel(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Type</label>
                <select 
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30"
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="textarea">Long Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Description</label>
                <textarea 
                  placeholder="Optional helper text" 
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-white/30 min-h-[80px] resize-none"
                  value={fieldDescription}
                  onChange={(e) => setFieldDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Placeholder</label>
                <input 
                  type="text" 
                  placeholder="Optional placeholder" 
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 placeholder:text-white/30"
                  value={fieldPlaceholder}
                  onChange={(e) => setFieldPlaceholder(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="required" 
                  checked={fieldRequired}
                  onChange={(e) => setFieldRequired(e.target.checked)}
                  className="rounded border-white/10 bg-[#1c1c1c] w-4 h-4"
                />
                <label htmlFor="required" className="text-sm text-white/80 select-none cursor-pointer">Required</label>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={!fieldLabel.trim()}
                  className="bg-white/90 text-black hover:bg-white rounded-md text-sm font-medium py-2 px-6 disabled:opacity-50 transition-colors"
                >
                  Create Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
