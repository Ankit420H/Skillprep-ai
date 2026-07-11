import React from 'react';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="container mx-auto my-8 px-4">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
