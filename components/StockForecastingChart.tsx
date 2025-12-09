import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { generateStockForecast } from '../services/geminiService';
import { ForecastData } from '../types';
import { IconBrain } from './Icons';

export const StockForecastingChart: React.FC = () => {
  const [data, setData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Paracetamol 500mg");

  const loadData = async (itemName: string) => {
    setLoading(true);
    // Simulate initial delay for "Analysis"
    const result = await generateStockForecast(itemName);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData(selectedItem);
  }, [selectedItem]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 h-[450px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-slate-800">Inventory Forecasting</h3>
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full flex items-center border border-purple-200">
               <IconBrain className="w-3 h-3 mr-1" /> AI Powered (Vertex)
            </span>
          </div>
          <p className="text-sm text-slate-500">Predicted consumption based on seasonality & patient volume.</p>
        </div>
        
        <select 
          className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-medical-500 focus:border-medical-500 block p-2.5 outline-none"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="Paracetamol 500mg">Paracetamol 500mg</option>
          <option value="Amoxicillin 500mg">Amoxicillin 500mg</option>
          <option value="Insulin Glargine">Insulin Glargine</option>
          <option value="Surgical Masks (N95)">Surgical Masks (N95)</option>
        </select>
      </div>

      <div className="flex-1 w-full relative">
        {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
            </div>
        ) : (
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{fontSize: 10, fill: '#64748b'}} tickFormatter={(str) => str.slice(5)} />
                <YAxis tick={{fontSize: 10, fill: '#64748b'}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <ReferenceLine x={data[Math.floor(data.length / 2)]?.date} stroke="#94a3b8" strokeDasharray="3 3" label="Today" />
                <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#0ea5e9" 
                    fillOpacity={1} 
                    fill="url(#colorActual)" 
                    name="Actual Usage"
                />
                <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorPredicted)" 
                    name="AI Prediction"
                    strokeDasharray="5 5"
                />
            </AreaChart>
            </ResponsiveContainer>
        )}
      </div>
      <div className="mt-4 flex space-x-6 text-sm justify-center">
          <div className="flex items-center">
              <span className="w-3 h-3 bg-medical-500 rounded-full mr-2"></span>
              <span className="text-slate-600">Actual Usage</span>
          </div>
          <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              <span className="text-slate-600">Projected (Prophet Model)</span>
          </div>
      </div>
    </div>
  );
};