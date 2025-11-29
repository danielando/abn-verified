import React from 'react';
import { LayoutDashboard, Wallet, PieChart, CreditCard, History, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-100 p-6 fixed left-0 top-0 z-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
          <div className="w-3 h-3 bg-white rounded-full ml-[-4px]"></div>
        </div>
        <span className="text-xl font-bold text-gray-800">ABNLook</span>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<Wallet size={20} />} label="Lookup" />
        <NavItem icon={<PieChart size={20} />} label="Analytics" />
        <NavItem icon={<CreditCard size={20} />} label="Subscriptions" />
        <NavItem icon={<History size={20} />} label="History" />
      </nav>

      <div className="pt-6 border-t border-gray-100 space-y-2">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </div>
      </div>
      
      {/* User Mini Profile */}
      <div className="mt-8 flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
        <img src="https://picsum.photos/40/40" alt="User" className="w-10 h-10 rounded-full" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">Alex Admin</p>
          <p className="text-xs text-gray-400 truncate">Pro Plan</p>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${active ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-purple-600'}`}>
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export default Sidebar;