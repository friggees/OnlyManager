import React from 'react';
import { UserNav } from '@/components/layout/user-nav'; // Import UserNav

// Placeholder components - replace with actual shadcn/ui imports later
const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-100 p-4 border-r flex flex-col"> {/* Added flex flex-col */}
    <div> {/* Wrapper for top content */}
      <h2 className="text-lg font-semibold mb-4">OnlyManager</h2>
      <nav>
        <ul>
          <li className="mb-2"><a href="/dashboard" className="text-blue-600 hover:underline">Dashboard Home</a></li>
        <li className="mb-2"><a href="/dashboard/employees" className="text-blue-600 hover:underline">Employees</a></li>
        <li className="mb-2"><a href="/dashboard/schedule" className="text-blue-600 hover:underline">Schedule</a></li>
        <li className="mb-2"><a href="/dashboard/todos" className="text-blue-600 hover:underline">To-Do</a></li>
          {/* Add more links based on role later */}
        </ul>
      </nav>
    </div> {/* End wrapper for top content */}
    <UserNav /> {/* Use the UserNav component */}
  </div> // Close the main sidebar div
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        {/* TODO: Add Header/Navbar if needed */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
