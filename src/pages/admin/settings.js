import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  KeyIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function AdminSettings() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    autoBackup: true,
    maintenanceMode: false
  });

  // Admin user management
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [adminMessage, setAdminMessage] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setIsAddingAdmin(true);
    setAdminMessage('');

    try {
      const response = await fetch('/api/admin/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newAdminEmail,
          password: newAdminPassword,
          role: 'admin'
        })
      });

      const result = await response.json();

      if (response.ok) {
        setAdminMessage('Admin user created successfully!');
        setNewAdminEmail('');
        setNewAdminPassword('');
      } else {
        setAdminMessage(result.error || 'Failed to create admin user');
      }
    } catch (error) {
      setAdminMessage('Error creating admin user');
    } finally {
      setIsAddingAdmin(false);
    }
  };

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-300 mt-1">Manage your platform configuration</p>
        </div>

        {/* Admin User Management */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <UserIcon className="w-6 h-6 text-indigo-400 mr-3" />
            <h2 className="text-lg font-semibold text-white">Admin User Management</h2>
          </div>
          
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder="Enter password"
                />
              </div>
            </div>
            
            {adminMessage && (
              <div className={`px-4 py-3 rounded-lg ${
                adminMessage.includes('successfully') 
                  ? 'bg-green-900 border border-green-700 text-green-200'
                  : 'bg-red-900 border border-red-700 text-red-200'
              }`}>
                {adminMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isAddingAdmin}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isAddingAdmin ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <PlusIcon className="w-4 h-4 mr-2" />
              )}
              Add Admin User
            </button>
          </form>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <BellIcon className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Push Notifications</p>
                  <p className="text-sm text-gray-400">Receive real-time updates</p>
                </div>
                <button
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Email Alerts</p>
                  <p className="text-sm text-gray-400">Get notified via email</p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailAlerts', !settings.emailAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailAlerts ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Auto Backup</p>
                  <p className="text-sm text-gray-400">Automatic system backups</p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoBackup', !settings.autoBackup)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoBackup ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Maintenance Mode</p>
                  <p className="text-sm text-gray-400">Temporarily disable access</p>
                </div>
                <button
                  onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <CogIcon className="w-6 h-6 text-purple-400 mr-3" />
            <h2 className="text-lg font-semibold text-white">System Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-300">Platform Version</p>
              <p className="text-lg font-semibold text-white">v2.1.0</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Last Updated</p>
              <p className="text-lg font-semibold text-white">2 days ago</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 