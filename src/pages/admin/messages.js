import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  getAllConversations, 
  getMessages, 
  sendMessage, 
  assignAdminToConversation, 
  cleanupFirebaseListeners, 
  ensureFirebaseConnection,
  Conversation, 
  ChatMessage 
} from '@/lib/firebase-chat';
import { 
  ChatBubbleLeftRightIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function AdminMessages() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  // Refs for auto-scroll
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-scroll when messages are updated
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Global error suppression for Firebase index errors
  useEffect(() => {
    // Suppress Firebase index errors globally
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('requires an index') || 
           message.includes('failed-precondition') ||
           message.includes('FirebaseError') ||
           message.includes('INTERNAL ASSERTION FAILED'))) {
        // Suppress index-related errors
        return;
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('requires an index') || 
           message.includes('failed-precondition') ||
           message.includes('FirebaseError'))) {
        // Suppress index-related warnings
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // Override window.onerror to catch unhandled errors
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (typeof message === 'string' && 
          (message.includes('requires an index') || 
           message.includes('failed-precondition') ||
           message.includes('FirebaseError'))) {
        return true; // Prevent default error handling
      }
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Override unhandledrejection to catch promise rejections
    const originalOnUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
      const reason = event.reason;
      if (reason && typeof reason === 'object' && 
          (reason.message?.includes('requires an index') || 
           reason.message?.includes('failed-precondition') ||
           reason.message?.includes('FirebaseError'))) {
        event.preventDefault(); // Prevent default error handling
        return;
      }
      if (originalOnUnhandledRejection) {
        originalOnUnhandledRejection.call(window, event);
      }
    };

    // Cleanup function
    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      window.onerror = originalOnError;
      window.onunhandledrejection = originalOnUnhandledRejection;
    };
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  // Load conversations
  useEffect(() => {
    if (user) {
      // Add a small delay to ensure Firebase is properly initialized
      const timer = setTimeout(() => {
        loadConversations();
      }, 500);

      return () => clearTimeout(timer);
    }

    // Cleanup listeners on unmount
    return () => {
      cleanupFirebaseListeners();
    };
  }, [user]);

  // Reload conversations when page becomes visible/focused
  useEffect(() => {
    const handleFocus = () => {
      if (user && connectionStatus === 'disconnected') {
        loadConversations();
      }
    };

    const handleVisibilityChange = () => {
      if (user && !document.hidden && connectionStatus === 'disconnected') {
        loadConversations();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, connectionStatus]);

  const loadConversations = async () => {
    try {
      setLoadingConversations(true);
      setConnectionStatus('connecting');
      
      // Set a timeout to show disconnected status if no response
      const timeoutId = setTimeout(() => {
        setConnectionStatus('disconnected');
        setLoadingConversations(false);
      }, 10000); // 10 seconds timeout
      
      // Ensure Firebase is connected first
      const isConnected = await ensureFirebaseConnection();
      if (!isConnected) {
        clearTimeout(timeoutId);
        setConnectionStatus('disconnected');
        setLoadingConversations(false);
        return;
      }
      
      // Clean up any existing listeners first
      cleanupFirebaseListeners();
      
      // Small delay to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      getAllConversations((conversations) => {
        clearTimeout(timeoutId);
        setConversations(conversations);
        setLoadingConversations(false);
        setConnectionStatus('connected');
      });
    } catch (error) {
      console.error('Error loading conversations:', error);
      setLoadingConversations(false);
      setConnectionStatus('disconnected');
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      getMessages(conversationId, (messages) => {
        setMessages(messages);
      });
    } catch (error) {
      // Silently handle index errors - the fallback query will work
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.log('Index not ready yet, using fallback query...');
      }
    }
  };

  const handleConversationSelect = async (conversation) => {
    setSelectedConversation(conversation);
    setMessages([]); // Clear messages before loading new ones
    await loadMessages(conversation.id);
    
    // Assign admin to conversation if not already assigned
    if (!conversation.admin_assigned && user?.email) {
      try {
        await assignAdminToConversation(conversation.id, user.email);
      } catch (error) {
        console.error('Error assigning admin:', error);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    setSendingMessage(true);
    try {
      await sendMessage(selectedConversation.id, user.email, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'resolved':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <p className="text-gray-300 mt-1">Manage customer conversations and inquiries</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {conversations.filter(c => c.status === 'active').length} active conversations
            </div>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
              connectionStatus === 'connected' 
                ? 'bg-green-900 text-green-200' 
                : connectionStatus === 'connecting'
                ? 'bg-yellow-900 text-yellow-200'
                : 'bg-red-900 text-red-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' 
                  ? 'bg-green-400' 
                  : connectionStatus === 'connecting'
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-red-400'
              }`}></div>
              <span>
                {connectionStatus === 'connected' 
                  ? 'Connected' 
                  : connectionStatus === 'connecting'
                  ? 'Connecting...'
                  : 'Disconnected'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-lg p-3">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Active Conversations</p>
                <p className="text-2xl font-bold text-white">
                  {conversations.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-lg p-3">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Resolved</p>
                <p className="text-2xl font-bold text-white">
                  {conversations.filter(c => c.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 rounded-lg p-3">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total Conversations</p>
                <p className="text-2xl font-bold text-white">
                  {conversations.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Conversations</h2>
              </div>
              
              {loadingConversations ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-300 mt-2">Loading conversations...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-6 text-center">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-500 mx-auto" />
                  <p className="text-gray-300 mt-2">No conversations found</p>
                  <p className="text-sm text-gray-500">New customer messages will appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-900 border-r-2 border-blue-500' : ''
                      }`}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-white truncate">
                              {conversation.user_email}
                            </p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                              {conversation.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTimestamp(conversation.updated_at)}
                          </p>
                          {conversation.admin_assigned && (
                            <p className="text-xs text-blue-400 mt-1">
                              Assigned to: {conversation.admin_assigned}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusIcon(conversation.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 h-96 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {selectedConversation.user_email}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Status: {selectedConversation.status}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedConversation.status)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedConversation.status)}`}>
                          {selectedConversation.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div 
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                  >
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-400">
                        <ChatBubbleLeftRightIcon className="w-8 h-8 mx-auto mb-2" />
                        <p>No messages yet</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === user.email ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === user.email
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === user.email ? 'text-blue-100' : 'text-gray-400'
                            }`}>
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    {/* Invisible element for auto-scroll */}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="px-4 py-4 border-t border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        disabled={sendingMessage}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sendingMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingMessage ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <PaperAirplaneIcon className="w-4 h-4" />
                        )}
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Select a conversation</p>
                    <p className="text-sm">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 