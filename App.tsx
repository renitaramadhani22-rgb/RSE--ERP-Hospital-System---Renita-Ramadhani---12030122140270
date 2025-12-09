
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NLQPanel } from './components/NLQPanel';
import { InventoryView } from './components/InventoryView';
import { FinanceView } from './components/FinanceView';

// Simple view state management instead of full router for this demo
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  FINANCE = 'FINANCE',
  AI_ANALYTICS = 'AI_ANALYTICS'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.INVENTORY:
        return <InventoryView />;
      case ViewState.FINANCE:
        return <FinanceView />;
      case ViewState.AI_ANALYTICS:
        return <NLQPanel />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <h2 className="text-2xl font-bold">Module Under Construction</h2>
            <p>This microservice frontend is currently being implemented.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
