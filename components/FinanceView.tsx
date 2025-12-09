
import React, { useState } from 'react';
import { InsuranceClaim, FinancialTransaction } from '../types';
import { IconCheckCircle, IconXCircle, IconRefresh, IconWallet, IconBrain } from './Icons';

const MOCK_CLAIMS: InsuranceClaim[] = [
  { id: 'CLM-2023-001', patientName: 'Budi Santoso', policyNumber: 'BPJS-99281', serviceDate: '2023-10-20', amountClaimed: 4500000, amountApproved: 4500000, status: 'MATCHED', aiMatchScore: 98 },
  { id: 'CLM-2023-002', patientName: 'Siti Aminah', policyNumber: 'PRU-11223', serviceDate: '2023-10-21', amountClaimed: 12500000, amountApproved: 10000000, status: 'PARTIAL', aiMatchScore: 65, discrepancyReason: 'Room upgrade not covered' },
  { id: 'CLM-2023-003', patientName: 'Joko Widodo', policyNumber: 'ALLIANZ-4455', serviceDate: '2023-10-22', amountClaimed: 2200000, amountApproved: 0, status: 'PENDING', aiMatchScore: 85 },
  { id: 'CLM-2023-004', patientName: 'Rina Nose', policyNumber: 'BPJS-11234', serviceDate: '2023-10-23', amountClaimed: 550000, amountApproved: 550000, status: 'MATCHED', aiMatchScore: 99 },
];

const MOCK_GL: FinancialTransaction[] = [
  { id: 'TX-991', date: '2023-10-25', description: 'Pharmacy Sales Revenue - Shift 1', accountCode: '4-001 (Rev)', debit: 0, credit: 15400000, referenceId: 'BATCH-001' },
  { id: 'TX-992', date: '2023-10-25', description: 'Procurement Payment - Kimia Farma', accountCode: '2-001 (AP)', debit: 45000000, credit: 0, referenceId: 'PO-2023-089' },
  { id: 'TX-993', date: '2023-10-24', description: 'Inpatient Service Revenue', accountCode: '4-002 (Rev)', debit: 0, credit: 89000000, referenceId: 'SI-2023-551' },
];

export const FinanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CLAIMS' | 'GL'>('CLAIMS');

  return (
    <div className="space-y-6">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
             <div>
               <p className="text-slate-400 text-sm font-medium">Monthly Revenue</p>
               <h3 className="text-3xl font-bold mt-1">Rp 4.2 M</h3>
             </div>
             <div className="p-2 bg-slate-700 rounded-lg"><IconWallet className="text-medical-400" /></div>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
             <div className="bg-medical-500 h-full w-[75%]"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">75% of Monthly Target achieved</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <p className="text-slate-500 text-sm font-medium">Outstanding AR (Claims)</p>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">+12% vs Last Mo</span>
           </div>
           <h3 className="text-3xl font-bold text-slate-800">Rp 850 Jt</h3>
           <p className="text-sm text-slate-400 mt-1">145 Pending Claims</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <p className="text-slate-500 text-sm font-medium">Auto-Reconciliation Rate</p>
              <div className="flex items-center space-x-1 text-purple-600 text-xs font-bold bg-purple-50 px-2 py-1 rounded">
                 <IconBrain className="w-3 h-3" />
                 <span>AI Powered</span>
              </div>
           </div>
           <h3 className="text-3xl font-bold text-slate-800">92.4%</h3>
           <p className="text-sm text-slate-400 mt-1">Vertex AI Matching Accuracy</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 min-h-[500px] flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setActiveTab('CLAIMS')}
              className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${activeTab === 'CLAIMS' ? 'border-medical-600 text-medical-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
               <IconBrain className="w-4 h-4" />
               <span>Smart Claim Reconciliation</span>
            </button>
            <button 
              onClick={() => setActiveTab('GL')}
              className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'GL' ? 'border-medical-600 text-medical-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
               General Ledger (GL)
            </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1">
            {activeTab === 'CLAIMS' && (
                <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-start space-x-3">
                        <IconBrain className="w-6 h-6 text-purple-600 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-purple-900 text-sm">AI Reconciliation Active</h4>
                            <p className="text-xs text-purple-700 mt-1">
                                The system is automatically matching Patient Service Orders (PSO) with incoming Insurance Claims using BERT classification.
                                Review exceptions below.
                            </p>
                        </div>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="p-3">Claim ID / Patient</th>
                                <th className="p-3">Policy Info</th>
                                <th className="p-3 text-right">Claimed</th>
                                <th className="p-3 text-right">Approved</th>
                                <th className="p-3">AI Confidence</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {MOCK_CLAIMS.map(claim => (
                                <tr key={claim.id} className="hover:bg-slate-50">
                                    <td className="p-3">
                                        <div className="font-bold text-slate-800">{claim.id}</div>
                                        <div className="text-xs text-slate-500">{claim.patientName}</div>
                                    </td>
                                    <td className="p-3 text-slate-600">{claim.policyNumber}</td>
                                    <td className="p-3 text-right text-slate-800">{new Intl.NumberFormat('id-ID').format(claim.amountClaimed)}</td>
                                    <td className="p-3 text-right text-slate-600">{new Intl.NumberFormat('id-ID').format(claim.amountApproved)}</td>
                                    <td className="p-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${claim.aiMatchScore > 90 ? 'bg-green-500' : claim.aiMatchScore > 70 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                                    style={{ width: `${claim.aiMatchScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-slate-600">{claim.aiMatchScore}%</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold 
                                            ${claim.status === 'MATCHED' ? 'bg-green-100 text-green-700' : ''}
                                            ${claim.status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-700' : ''}
                                            ${claim.status === 'REJECTED' ? 'bg-red-100 text-red-700' : ''}
                                            ${claim.status === 'PENDING' ? 'bg-slate-100 text-slate-700' : ''}
                                        `}>
                                            {claim.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        {claim.status === 'MATCHED' ? (
                                            <button className="text-slate-300 cursor-default"><IconCheckCircle /></button>
                                        ) : (
                                            <div className="flex justify-center space-x-2">
                                                <button className="text-green-600 hover:text-green-800" title="Manual Approve"><IconCheckCircle /></button>
                                                <button className="text-red-500 hover:text-red-700" title="Reject"><IconXCircle /></button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'GL' && (
                <div className="space-y-4">
                     <div className="flex justify-end space-x-2">
                        <button className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded flex items-center">
                            <IconRefresh className="w-4 h-4 mr-1" /> Refresh Ledger
                        </button>
                        <button className="text-sm bg-medical-600 hover:bg-medical-700 text-white px-3 py-1 rounded">
                            Export to CSV
                        </button>
                     </div>
                     <table className="w-full text-left font-mono text-sm">
                        <thead className="bg-slate-100 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="p-3">Trans ID</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Account</th>
                                <th className="p-3 text-right">Debit</th>
                                <th className="p-3 text-right">Credit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_GL.map(tx => (
                                <tr key={tx.id} className="hover:bg-slate-50">
                                    <td className="p-3 text-medical-600">{tx.id}</td>
                                    <td className="p-3 text-slate-600">{tx.date}</td>
                                    <td className="p-3 text-slate-800">{tx.description} <span className="text-slate-400 text-xs block">{tx.referenceId}</span></td>
                                    <td className="p-3 text-slate-600">{tx.accountCode}</td>
                                    <td className="p-3 text-right text-slate-800">{tx.debit > 0 ? new Intl.NumberFormat('id-ID').format(tx.debit) : '-'}</td>
                                    <td className="p-3 text-right text-slate-800">{tx.credit > 0 ? new Intl.NumberFormat('id-ID').format(tx.credit) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
