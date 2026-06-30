import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormWithFields } from '../services/formService.js';
import { submitForm } from '../services/submissionService.js';

export default function FormView() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormWithFields(id);
        setForm(data.form);
        setFields(data.fields);
        
        // Initialize empty values map
        const initial = {};
        data.fields.forEach(f => {
          initial[f._id] = '';
        });
        setValues(initial);
      } catch (err) {
        setError('Form not found or is unavailable');
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleChange = (fieldId, val) => {
    setValues(prev => ({ ...prev, [fieldId]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submissionValues = Object.keys(values).map(fieldId => ({
        fieldId,
        value: values[fieldId]
      }));

      await submitForm({ formId: id, values: submissionValues });
      setIsSubmitted(true);
    } catch (err) {
      setError(err?.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-white/60 text-sm">Loading form...</div>;
  }

  if (error && !form) {
    return (
      <div className="w-full max-w-2xl rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-200">
        {error}
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl rounded-2xl border border-green-500/20 bg-green-500/5 p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✓
        </div>
        <h2 className="text-2xl font-semibold text-green-400">Response Submitted</h2>
        <p className="text-white/60">Thank you for filling out {form.title}. Your response has been recorded.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
      <div className="border-b border-white/10 pb-8 mb-8">
        <h1 className="text-3xl font-semibold">{form.title}</h1>
        {form.description && <p className="text-white/60 mt-2 leading-relaxed">{form.description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">{error}</div>}
        
        {fields.length === 0 ? (
          <p className="text-white/40 italic">This form has no fields yet.</p>
        ) : (
          fields.map((field) => (
            <div key={field._id} className="space-y-3">
              <label className="block font-medium text-white/90">
                {field.label} {field.isRequired && <span className="text-red-400 ml-1">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea 
                  required={field.isRequired}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/5 transition-colors min-h-[120px]"
                  value={values[field._id]}
                  onChange={(e) => handleChange(field._id, e.target.value)}
                />
              ) : (
                <input 
                  type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
                  required={field.isRequired}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/5 transition-colors"
                  value={values[field._id]}
                  onChange={(e) => handleChange(field._id, e.target.value)}
                />
              )}
            </div>
          ))
        )}

        {fields.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors py-3 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
