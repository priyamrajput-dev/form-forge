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
        isRequired: fieldRequired,
        labelKey,
        index
      });
      // Reset and refetch
      setFieldLabel('');
      setFieldType('text');
      setFieldRequired(false);
      setIsAddingField(false);
      fetchForm();
    } catch (err) {
      setError(err?.message || 'Failed to add field');
    }
  };

  if (loading) return <div className="text-white/60 text-sm">Loading form...</div>;
  if (!form) return <div className="text-white/60 text-sm">Form not found</div>;

  const shareUrl = `${window.location.origin}/f/${form._id}`;

  return (
    <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div>
          <Link to="/dashboard" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-semibold">{form.title}</h1>
          {form.description && <p className="text-sm text-white/60 mt-1">{form.description}</p>}
        </div>
        <Link 
          to={`/forms/${form._id}/responses`}
          className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-medium text-sm"
        >
          View Responses
        </Link>
      </div>

      <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
        <div>
          <div className="text-sm text-blue-200 font-medium">Share Link</div>
          <div className="text-sm text-blue-100/70">{shareUrl}</div>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(shareUrl)}
          className="text-sm bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 px-3 py-1.5 rounded-md transition-colors"
        >
          Copy Link
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Form Fields</h2>
        {fields.length === 0 ? (
          <p className="text-white/40 text-sm">No fields added yet. Add some fields below!</p>
        ) : (
          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={f._id} className="p-4 border border-white/10 rounded-lg bg-white/5 flex justify-between items-center">
                <div>
                  <span className="font-medium">{f.label}</span>
                  {f.isRequired && <span className="ml-2 text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">Required</span>}
                </div>
                <div className="text-sm text-white/40">{f.type}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isAddingField ? (
        <button 
          onClick={() => setIsAddingField(true)}
          className="w-full border border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all rounded-lg py-4 text-sm font-medium"
        >
          + Add New Field
        </button>
      ) : (
        <form onSubmit={handleAddField} className="p-6 border border-white/10 rounded-lg bg-white/5 space-y-4">
          <h3 className="font-medium text-lg">Add New Field</h3>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/80">Field Label</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/30"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                placeholder="e.g. What is your name?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/80">Field Type</label>
              <select 
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 text-white"
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
              >
                <option value="text">Short Text</option>
                <option value="textarea">Long Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="required" 
              checked={fieldRequired}
              onChange={(e) => setFieldRequired(e.target.checked)}
              className="rounded border-white/10 bg-white/5"
            />
            <label htmlFor="required" className="text-sm text-white/80">Required field</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">
            <button 
              type="button" 
              onClick={() => setIsAddingField(false)}
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-sm bg-white text-black hover:bg-gray-200 transition-colors rounded-md font-medium"
            >
              Save Field
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
