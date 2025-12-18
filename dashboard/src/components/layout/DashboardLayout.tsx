import React, { Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading component...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
