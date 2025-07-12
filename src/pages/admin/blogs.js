import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogCreationPopup from '@/components/admin/BlogCreationPopup';
import BlogEditPopup from '@/components/admin/BlogEditPopup';
import { getAllBlogPosts, saveBlogPost, updateBlogPost, deleteBlogPost, testFirebaseConnection } from '@/lib/blog-api-simple';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

export default function AdminBlogs() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'jobs'
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  // Load blog generation jobs
  useEffect(() => {
    if (user) {
      loadJobs();
    }
  }, [user]);

  // Load saved blogs from API
  useEffect(() => {
    if (user) {
      loadBlogs();
    }
  }, [user]);

  const loadJobs = async () => {
    try {
      const response = await fetch('/api/blog/status');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const loadBlogs = async () => {
    try {
      const blogs = await getAllBlogPosts('all');
      setBlogs(blogs);
    } catch (error) {
      console.error('❌ Error loading blogs:', error);
      alert(`Error loading blogs: ${error.message}`);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const testFirebaseConnection = async () => {
    try {
      const result = await testFirebaseConnection();
      
      if (result.success) {
        alert(`✅ ${result.message}`);
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Firebase connection test failed:', error);
      alert(`❌ Firebase connection failed: ${error.message}`);
    }
  };

  const handleCreateSuccess = (blog) => {
    // Reload blogs to show the new one
    loadBlogs();
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowEditPopup(true);
  };

  const handleEditSuccess = (updatedBlog) => {  
    setShowEditPopup(false);
    setEditingBlog(null);
    // Reload blogs
    loadBlogs();
  };

  const handlePublishBlog = async (blog) => {
    if (blog.status === 'published') {
      alert('This blog is already published!');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to publish "${blog.title || 'Untitled'}"? This will make it publicly visible.`
    );

    if (!confirmed) return;

    setIsUpdating(true);
    try {
      const result = await updateBlogPost(blog.id, { status: 'published' });
      
      if (result.success) {
        alert('Blog published successfully!');
        loadBlogs(); // Reload blogs to show updated status
      } else {
        alert(`Error publishing blog: ${result.error}`);
      }
    } catch (error) {
      console.error('Error publishing blog:', error);
      alert(`Error publishing blog: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteBlog = async (blog) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title || 'Untitled'}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsUpdating(true);
    try {
      const result = await deleteBlogPost(blog.id);
      
      if (result.success) {
        alert('Blog deleted successfully!');
        loadBlogs(); // Reload blogs to remove deleted blog
      } else {
        alert(`Error deleting blog: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert(`Error deleting blog: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'inprogress':
        return <ClockIcon className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'inprogress':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getBlogStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <GlobeAltIcon className="w-5 h-5 text-green-500" />;
      case 'draft':
        return <DocumentDuplicateIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <DocumentDuplicateIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBlogStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'draft':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Handle Firebase Timestamp objects
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Handle regular Date objects or timestamps
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Blog Management</h1>
            <p className="text-gray-300 mt-1">Create and manage your blog posts</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={testFirebaseConnection}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              🧪 Test Firebase
            </button>
            <button
              onClick={() => setShowCreatePopup(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create New Blog
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'blogs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Saved Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Generation Jobs ({jobs.length})
            </button>
          </nav>
        </div>

        {activeTab === 'blogs' ? (
          /* Saved Blogs Section */
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-lg p-3">
                    <GlobeAltIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Published</p>
                    <p className="text-2xl font-bold text-white">
                      {blogs.filter(blog => blog.status === 'published').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-500 rounded-lg p-3">
                    <DocumentDuplicateIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Drafts</p>
                    <p className="text-2xl font-bold text-white">
                      {blogs.filter(blog => blog.status === 'draft').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-lg p-3">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total Words</p>
                    <p className="text-2xl font-bold text-white">
                      {blogs.reduce((total, blog) => total + (blog.wordCount || 0), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-gray-500 rounded-lg p-3">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total</p>
                    <p className="text-2xl font-bold text-white">{blogs.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Saved Blog Posts</h2>
              </div>
              
              {loadingBlogs ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-300 mt-2">Loading blogs...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="p-6 text-center">
                  <DocumentTextIcon className="w-12 h-12 text-gray-500 mx-auto" />
                  <p className="text-gray-300 mt-2">No saved blogs found</p>
                  <button
                    onClick={() => setShowCreatePopup(true)}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Your First Blog
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Blog Post
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-800/50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-white">
                                {blog.title || 'Untitled'}
                              </div>
                              <div className="text-sm text-gray-400 mt-1">
                                {truncateText(blog.content.replace(/<[^>]*>/g, ''), 80)}
                              </div>
                              {blog.slug && (
                                <div className="text-xs text-blue-400 mt-1 font-mono">
                                  /blog/{blog.slug}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getBlogStatusIcon(blog.status)}
                              <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getBlogStatusColor(blog.status)}`}>
                                {blog.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">
                              <div>{blog.wordCount || 0} words</div>
                              <div className="text-gray-400">{blog.tone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatDate(blog.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                className="text-blue-400 hover:text-blue-300" 
                                title="View"
                                onClick={() => window.open(`/blog/${blog.slug || blog.id}`, '_blank')}
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button 
                                className="text-green-400 hover:text-green-300" 
                                title="Edit"
                                onClick={() => handleEditBlog(blog)}
                                disabled={isUpdating}
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              {blog.status === 'draft' && (
                                <button 
                                  className="text-purple-400 hover:text-purple-300" 
                                  title="Publish"
                                  onClick={() => handlePublishBlog(blog)}
                                  disabled={isUpdating}
                                >
                                  <GlobeAltIcon className="w-4 h-4" />
                                </button>
                              )}
                              <button 
                                className="text-red-400 hover:text-red-300" 
                                title="Delete"
                                onClick={() => handleDeleteBlog(blog)}
                                disabled={isUpdating}
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Generation Jobs Section */
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-lg p-3">
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Completed</p>
                    <p className="text-2xl font-bold text-white">
                      {jobs.filter(job => job.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-500 rounded-lg p-3">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">In Progress</p>
                    <p className="text-2xl font-bold text-white">
                      {jobs.filter(job => job.status === 'inprogress').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-red-500 rounded-lg p-3">
                    <XCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Failed</p>
                    <p className="text-2xl font-bold text-white">
                      {jobs.filter(job => job.status === 'failed').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
                <div className="flex items-center">
                  <div className="bg-gray-500 rounded-lg p-3">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total</p>
                    <p className="text-2xl font-bold text-white">{jobs.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Recent Blog Generation Jobs</h2>
              </div>
              
              {loadingJobs ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-300 mt-2">Loading jobs...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-6 text-center">
                  <DocumentTextIcon className="w-12 h-12 text-gray-500 mx-auto" />
                  <p className="text-gray-300 mt-2">No blog generation jobs found</p>
                  <button
                    onClick={() => setShowCreatePopup(true)}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Your First Blog
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Job
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {jobs.map((job) => (
                        <tr key={job.trackingId} className="hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-white">
                                {job.title || job.idea}
                              </div>
                              <div className="text-sm text-gray-400">
                                {job.tone} • {job.wordCount ? `${job.wordCount} words` : 'Generating...'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(job.status)}
                              <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(job.status)}`}>
                                {job.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${job.progress || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-300">{job.progress || 0}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatDate(job.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {job.status === 'completed' && (
                                <button className="text-blue-400 hover:text-blue-300">
                                  <EyeIcon className="w-4 h-4" />
                                </button>
                              )}
                              {job.status === 'completed' && (
                                <button className="text-green-400 hover:text-green-300">
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                              )}
                              <button className="text-red-400 hover:text-red-300">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blog Creation Popup */}
      <BlogCreationPopup
        isOpen={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Blog Edit Popup */}
      {editingBlog && (
        <BlogEditPopup
          isOpen={showEditPopup}
          onClose={() => {
            setShowEditPopup(false);
            setEditingBlog(null);
          }}
          onSuccess={handleEditSuccess}
          blog={editingBlog}
        />
      )}
    </AdminLayout>
  );
} 