import React, { useState } from 'react';
import { processNaturalLanguageQuery } from '../services/geminiService';
import { NLQResponse } from '../types';
import { IconSearch, IconBrain } from './Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const NLQPanel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NLQResponse | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await processNaturalLanguageQuery(query);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderVisuals = () => {
    if (!result?.data || result.visualizationType === 'none') return null;

    if (result.visualizationType === 'bar' || result.visualizationType === 'line') {
      return (
        <div className="h-64 w-full mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    
    // Fallback table for other types for this demo
    return (
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Label</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase">Value</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                    {result.data.map((item, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-2 text-sm text-slate-800">{item.label}</td>
                            <td className="px-4 py-2 text-sm text-slate-800 text-right">{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-medical-600 to-medical-800 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <IconBrain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Clinical & Operational Intelligence</h2>
        </div>
        <p className="text-medical-100 mb-6 max-w-2xl">
          Ask questions about financial performance, patient demographics, or inventory health using natural language. Our AI engine queries the BigQuery Data Warehouse instantly.
        </p>

        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Try "Show average cost per inpatient last month" or "List top 5 moving drugs"...'
            className="w-full pl-6 pr-14 py-4 rounded-xl text-slate-800 shadow-xl focus:ring-4 focus:ring-medical-400 focus:outline-none text-lg"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-medical-600 hover:bg-medical-700 text-white px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <IconSearch className="w-6 h-6" />}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 animate-fade-in-up">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
               <h3 className="text-lg font-bold text-slate-800">Insight Result</h3>
               <p className="text-slate-500 text-sm mt-1">{result.answer}</p>
            </div>
          </div>
          
          {renderVisuals()}

          <div className="mt-6 pt-4 border-t border-slate-100">
             <details className="text-xs text-slate-400 cursor-pointer group">
                 <summary className="font-mono group-hover:text-medical-600 select-none">Show Generated SQL (Audit Trail)</summary>
                 <div className="mt-2 bg-slate-900 text-green-400 p-3 rounded font-mono overflow-x-auto">
                     {result.sqlGenerated}
                 </div>
             </details>
          </div>
        </div>
      )}
    </div>
  );
};