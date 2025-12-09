
import React, { useState } from 'react';
import { InventoryItem, StockStatus } from '../types';
import { IconSearch, IconBell, IconBox } from './Icons';

const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', sku: 'MED-001', name: 'Paracetamol 500mg (Tablet)', category: 'Pharmaceuticals', currentStock: 2500, reservedStock: 150, unit: 'Box', status: StockStatus.NORMAL, lastUpdated: '2023-10-25 09:30', location: 'Gudang Farmasi A1', expiryDate: '2025-05-10' },
  { id: '2', sku: 'MED-002', name: 'Amoxicillin 500mg (Capsule)', category: 'Pharmaceuticals', currentStock: 120, reservedStock: 0, unit: 'Box', status: StockStatus.LOW_STOCK, lastUpdated: '2023-10-25 08:15', location: 'Gudang Farmasi A2', expiryDate: '2024-12-01' },
  { id: '3', sku: 'ALK-001', name: 'Surgical Mask N95 3M', category: 'Medical Supplies', currentStock: 50, reservedStock: 20, unit: 'Box', status: StockStatus.CRITICAL, lastUpdated: '2023-10-24 16:00', location: 'Gudang Alkes B1', expiryDate: '2026-01-01' },
  { id: '4', sku: 'MED-003', name: 'Insulin Glargine Pen', category: 'Pharmaceuticals', currentStock: 800, reservedStock: 50, unit: 'Pen', status: StockStatus.NORMAL, lastUpdated: '2023-10-25 10:00', location: 'Cold Storage C1', expiryDate: '2024-06-15' },
  { id: '5', sku: 'ALK-002', name: 'IV Set Macro', category: 'Medical Supplies', currentStock: 5000, reservedStock: 0, unit: 'Pcs', status: StockStatus.OVERSTOCK, lastUpdated: '2023-10-20 09:00', location: 'Gudang Alkes B2', expiryDate: '2027-01-01' },
  { id: '6', sku: 'MED-004', name: 'Ibuprofen 400mg', category: 'Pharmaceuticals', currentStock: 1500, reservedStock: 0, unit: 'Box', status: StockStatus.NORMAL, lastUpdated: '2023-10-25 11:30', location: 'Gudang Farmasi A1', expiryDate: '2025-08-20' },
  { id: '7', sku: 'MED-005', name: 'Ceftriaxone Injection 1g', category: 'Pharmaceuticals', currentStock: 45, reservedStock: 5, unit: 'Vial', status: StockStatus.LOW_STOCK, lastUpdated: '2023-10-25 12:00', location: 'Gudang Farmasi A3', expiryDate: '2024-03-10' },
];

export const InventoryView: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = MOCK_INVENTORY.filter(item => {
    const matchesFilter = filter === 'ALL' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: StockStatus) => {
    switch (status) {
      case StockStatus.NORMAL: return 'bg-green-100 text-green-700';
      case StockStatus.LOW_STOCK: return 'bg-yellow-100 text-yellow-700';
      case StockStatus.CRITICAL: return 'bg-red-100 text-red-700';
      case StockStatus.OVERSTOCK: return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><IconBox /></div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Total Items</p>
            <p className="text-xl font-bold text-slate-800">1,248 <span className="text-sm font-normal text-slate-400">SKUs</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
           <div className="p-3 bg-red-50 rounded-lg text-red-600"><IconBell /></div>
           <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Critical Stock</p>
            <p className="text-xl font-bold text-red-600">12 <span className="text-sm font-normal text-slate-400">Items</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
           <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600"><IconBell /></div>
           <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Low Stock</p>
            <p className="text-xl font-bold text-yellow-600">45 <span className="text-sm font-normal text-slate-400">Items</span></p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
           <div className="p-3 bg-green-50 rounded-lg text-green-600"><IconBox /></div>
           <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Stock Value</p>
            <p className="text-xl font-bold text-slate-800">12.4M <span className="text-sm font-normal text-slate-400">IDR</span></p>
          </div>
        </div>
      </div>

      {/* Main Inventory List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[500px]">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Farmasi & Asset Logistik (FAL)</h2>
            <p className="text-sm text-slate-500">Manage pharmaceutical stock, reservations, and warehouse locations.</p>
          </div>
          
          <div className="flex items-center space-x-3">
             <div className="relative">
                <IconSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search SKU or Name..." 
                  className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <select 
               className="border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
             >
               <option value="ALL">All Categories</option>
               <option value="Pharmaceuticals">Pharmaceuticals</option>
               <option value="Medical Supplies">Medical Supplies</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="p-4">SKU Info</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-right">Available</th>
                <th className="p-4 text-right">Reserved</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{item.sku}</p>
                  </td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs border border-slate-200">
                        {item.location}
                    </span>
                  </td>
                  <td className="p-4 text-right font-medium text-slate-800">{item.currentStock} <span className="text-xs text-slate-400">{item.unit}</span></td>
                  <td className="p-4 text-right text-slate-500">{item.reservedStock}</td>
                  <td className="p-4 text-slate-600">{item.expiryDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-medical-600 hover:text-medical-800 text-sm font-medium">Manage</button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                        No inventory items found matching your criteria.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
           <span>Showing {filteredItems.length} items</span>
           <span>Data Synced: Real-time (Vertex Event Bus)</span>
        </div>
      </div>
    </div>
  );
};
