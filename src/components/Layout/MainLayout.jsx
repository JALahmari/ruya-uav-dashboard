import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function MainLayout() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        
        {/* Copyright Bar */}
        <div className="bg-neutral-800 text-neutral-300 py-2 px-6 text-xs border-t border-neutral-700">
          <div className="flex items-center justify-center">
            AI vibe coded development by{' '}
            <a 
              href="https://biela.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 mx-1 underline"
            >
              Biela.dev
            </a>
            , powered by{' '}
            <a 
              href="https://teachmecode.ae/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 ml-1 underline"
            >
              TeachMeCode® Institute
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
