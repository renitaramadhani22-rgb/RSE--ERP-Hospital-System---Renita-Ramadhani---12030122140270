import React from 'react';
import { StatCard } from './StatCard';
import { StockForecastingChart } from './StockForecastingChart';
import { RecentProcurement } from './RecentProcurement';
import { IconBox, IconChart, IconBell } from './Icons';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Dashboard Farmasi & Logistik</h1>
           <p className="text-slate-500">Overview of Inventory Health and Procurement Status</p>
        </div>
        <div className="text-sm text-slate-400 font-medium">
           Last synced: <span className="text-slate-600">Just now</span>
        </div>
      </div>

      {/* KPI Tiles (Row 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Stock Value"
          value="Rp 12.4 M"
          trend="4.2%"
          trendUp={true}
          icon={<IconChart className="w-6 h-6 text-medical-600" />}
          colorClass="bg-medical-500"
        />
        <StatCard 
          title="Stock Reservation Rate"
          value="94.8%"
          trend="1.1%"
          trendUp={true}
          icon={<IconBox className="w-6 h-6 text-purple-600" />}
          colorClass="bg-purple-500"
        />
        <StatCard 
          title="Slow-Moving Items"
          value="24 SKUs"
          trend="12%"
          trendUp={false} // Trend up here is bad for slow moving items, but purely for visual red/green logic
          icon={<IconBell className="w-6 h-6 text-orange-600" />}
          colorClass="bg-orange-500"
        />
      </div>

      {/* Main Content (Row 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockForecastingChart />
        <RecentProcurement />
      </div>
    </div>
  );
};