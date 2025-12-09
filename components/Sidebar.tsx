import React from 'react';
import { ViewState } from '../App';
import { IconDashboard, IconBox, IconChart, IconBrain } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onNavigate }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: IconDashboard },
    { id: ViewState.INVENTORY, label: 'Farmasi & Logistics', icon: IconBox },
    { id: ViewState.FINANCE, label: 'Financials (FBM)', icon: IconChart },
    { id: ViewState.AI_ANALYTICS, label: 'Clinical AI (NLQ)', icon: IconBrain },
  ];

  return (
    <aside 
      className={`
        ${isOpen ? 'w-64' : 'w-20'} 
        bg-slate-850 text-white transition-all duration-300 flex flex-col shadow-xl z-20
      `}
    >
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-medical-500 rounded-lg flex items-center justify-center font-bold text-white">
                R
            </div>
            {isOpen && <span className="font-bold text-lg tracking-tight">RSE-ERP</span>}
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${isActive ? 'bg-medical-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        {isOpen ? (
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">System Status</p>
            <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-400">Services Operational</span>
            </div>
          </div>
        ) : (
             <div className="flex justify-center">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             </div>
        )}
      </div>
    </aside>
  );
};