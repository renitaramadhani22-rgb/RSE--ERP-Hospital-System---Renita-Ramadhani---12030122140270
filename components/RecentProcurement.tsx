import React from 'react';
import { ProcurementOrder } from '../types';

const MOCK_ORDERS: ProcurementOrder[] = [
  { id: '1', prNumber: 'PR-2023-089', vendor: 'Kimia Farma Trading', totalAmount: 45000000, status: 'PENDING_APPROVAL', date: '2023-10-24' },
  { id: '2', prNumber: 'PR-2023-090', vendor: 'Alkes Indo Global', totalAmount: 12500000, status: 'ORDERED', date: '2023-10-23' },
  { id: '3', prNumber: 'PR-2023-091', vendor: 'Bio Medika', totalAmount: 8900000, status: 'RECEIVED', date: '2023-10-22' },
];

export const RecentProcurement: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[450px]">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Procurement Quick Actions</h3>
        <button className="text-sm text-medical-600 font-medium hover:underline">View All</button>
      </div>
      
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold sticky top-0">
            <tr>
              <th className="p-4">PR Number</th>
              <th className="p-4">Vendor</th>
              <th className="p-4 text-right">Amount (IDR)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{order.prNumber}</td>
                <td className="p-4 text-slate-600">{order.vendor}</td>
                <td className="p-4 text-right font-mono text-slate-600">
                  {new Intl.NumberFormat('id-ID').format(order.totalAmount)}
                </td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${order.status === 'PENDING_APPROVAL' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${order.status === 'ORDERED' ? 'bg-blue-100 text-blue-700' : ''}
                    ${order.status === 'RECEIVED' ? 'bg-green-100 text-green-700' : ''}
                  `}>
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {order.status === 'PENDING_APPROVAL' ? (
                    <button className="bg-medical-600 text-white px-3 py-1 rounded text-xs hover:bg-medical-700 transition">
                      Approve
                    </button>
                  ) : (
                    <button className="text-slate-400 hover:text-slate-600">
                        Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};