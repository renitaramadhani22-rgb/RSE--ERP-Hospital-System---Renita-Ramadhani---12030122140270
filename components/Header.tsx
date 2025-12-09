import React from 'react';
import { IconSearch, IconBell, IconMenu } from './Icons';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 z-10">
      <div className="flex items-center space-x-4">
        <button onClick={onToggleSidebar} className="text-slate-500 hover:text-medical-600">
          <IconMenu className="w-6 h-6" />
        </button>
        
        {/* Global Search Component */}
        <div className="relative hidden md:block w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch className="w-5 h-5 text-slate-400" />
          </span>
          <input 
            type="text" 
            placeholder="Search items, POs, or patient IDs..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-slate-500 hover:text-medical-600">
          <IconBell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Dr. Sarah Wijaya</p>
            <p className="text-xs text-slate-500">Pharmacy Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-medical-700 font-bold">
            SW
          </div>
        </div>
      </div>
    </header>
  );
};