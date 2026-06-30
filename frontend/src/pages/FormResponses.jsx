import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFormWithFields } from '../services/formService.js';
import { getSubmissions } from '../services/submissionService.js';

export default function FormResponses() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = await getFormWithFields(id);
        setForm(formData.form);
        setFields(formData.fields);
        
        const subsData = await getSubmissions(id);
        setSubmissions(subsData);
      } catch (err) {
        setError('Failed to load responses');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-white/60 text-sm">Loading responses...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-sm">{error}</div>;
  }
  
  return (
    <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div>
          <Link to="/dashboard" className="text-white/60 hover:text-white text-sm mb-2 inline-block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-semibold">Responses: {form?.title}</h1>
          <p className="text-sm text-white/60 mt-1">{submissions.length} total responses</p>
        </div>
        <Link 
          to={`/forms/${id}/edit`}
          className="bg-white/10 text-white hover:bg-white/20 transition-colors px-4 py-2 rounded-md font-medium text-sm border border-white/10"
        >
          Edit Form
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
          <p className="text-white/40">No responses yet.</p>
          <p className="text-sm text-white/30 mt-1">Share your form to start collecting data.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm text-white">
            <thead className="bg-white/5 border-b border-white/10 text-white/60">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Timestamp</th>
                {fields.map(field => (
                  <th key={field._id} className="px-6 py-4 font-medium whitespace-nowrap">
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissions.map((sub) => {
                // Create a dictionary for quick lookup: fieldId -> value
                const valMap = {};
                sub.values.forEach(v => {
                  valMap[v.fieldId] = v.value;
                });

                return (
                  <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-white/60">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    {fields.map(field => (
                      <td key={field._id} className="px-6 py-4 max-w-[300px] truncate">
                        {valMap[field._id] || '-'}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
