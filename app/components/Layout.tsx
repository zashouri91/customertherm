'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: '📊', label: 'Survey Management', path: '/survey-management' },
    { icon: '👥', label: 'Groups', path: '/groups' },
    { icon: '📍', label: 'Locations', path: '/locations' },
    { icon: '👤', label: 'Users', path: '/users' },
    { icon: '📈', label: 'Analytics', path: '/(dashboard)/analytics' },
    { icon: '✍️', label: 'Signature Generator', path: '/(dashboard)/signature-generator' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full">
        {/* Logo */}
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">CustomerTherm</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {/* Display user's first initial */}
                  U
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">User Account</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => {/* Add logout handler */}}
            >
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}
