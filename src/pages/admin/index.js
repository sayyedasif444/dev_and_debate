import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CogIcon 
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const stats = [
    {
      name: 'Total Blogs',
      value: '24',
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Active Conversations',
      value: '8',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      name: 'Total Users',
      value: '156',
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'System Status',
      value: 'Healthy',
      icon: CogIcon,
      color: 'bg-emerald-500',
      change: '100%',
      changeType: 'positive'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, Admin! 👋
              </h1>
              <p className="text-gray-300 mt-1">
                Here's what's happening with your platform today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-300">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-red-900 text-red-200'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400 ml-2">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => router.push('/admin/blogs')}
              className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <DocumentTextIcon className="w-5 h-5 text-blue-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-white">Manage Blogs</p>
                <p className="text-sm text-gray-300">Create and edit blog posts</p>
              </div>
            </button>
            
            <button 
              onClick={() => router.push('/admin/messages')}
              className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-white">View Messages</p>
                <p className="text-sm text-gray-300">Check conversations</p>
              </div>
            </button>
            
            <button 
              onClick={() => router.push('/admin/settings')}
              className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <CogIcon className="w-5 h-5 text-purple-400 mr-3" />
              <div className="text-left">
                <p className="font-medium text-white">Settings</p>
                <p className="text-sm text-gray-300">Configure platform</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-300">New blog post "AI in Education" was published</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-300">User registration: john.doe@example.com</p>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-300">System backup completed successfully</p>
              <span className="text-xs text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 