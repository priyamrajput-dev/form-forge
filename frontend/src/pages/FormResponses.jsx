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
    return <div className="text-white/60 text-sm p-8">Loading responses...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-sm p-8">{error}</div>;
  }
  
  return (
    <div className="mx-auto w-full max-w-6xl pt-4 pb-12 px-2">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Submissions</h1>
          <p className="text-sm text-white/60 mt-2">Total: {submissions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to={`/forms/${id}/edit`}
            className="bg-white/10 text-white hover:bg-white/20 transition-colors px-4 py-2 rounded-lg font-medium text-sm border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            Form Builder
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="border border-white/10 bg-[#111] p-6 rounded-lg">
            <span className="text-white/40">No submissions yet.</span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111]">
            <table className="w-full text-left text-sm text-white">
              <thead className="bg-black/40 border-b border-white/10 text-white/60">
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
    </div>
  );
}
