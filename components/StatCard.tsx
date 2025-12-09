import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendUp, icon, colorClass }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trendUp ? '+' : ''}{trend}
        </span>
        <span className="text-xs text-slate-400 ml-2">vs last month</span>
      </div>
    </div>
  );
};