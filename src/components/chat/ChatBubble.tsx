'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserRegistration from './UserRegistration';
import ChatInterface from './ChatInterface';
import { createOrUpdateUser, getActiveConversation, createConversation } from '@/lib/firebase-chat';

interface ChatBubbleProps {
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'dark' | 'light';
}

export default function ChatBubble({ 
  position = 'bottom-right',
  theme = 'dark'
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isChatAvailable, setIsChatAvailable] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check chat availability (10 AM to 8 PM)
  useEffect(() => {
    if (!isClient) return;
    
    const checkChatAvailability = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const isAvailable = currentHour >= 10 && currentHour < 20; // 10 AM to 8 PM
      setIsChatAvailable(isAvailable);
      
      // Format current time for display - use consistent formatting
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const timeString = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      setCurrentTime(timeString);
    };

    checkChatAvailability();
    const interval = setInterval(checkChatAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isClient]);

  // Check if user is already registered (from localStorage) - only on client
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const savedUser = localStorage.getItem('chat_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsRegistered(true);
        initializeConversation(userData.email);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [isClient]);

  const initializeConversation = async (email: string) => {
    if (!isClient) return;
    
    try {
      // Get active conversation or create new one
      const { success, conversation } = await getActiveConversation(email);
      
      if (success && conversation) {
        setConversationId(conversation.id);
      } else {
        // Create new conversation
        const { success: createSuccess, conversationId: newConversationId } = await createConversation(email);
        if (createSuccess && newConversationId) {
          setConversationId(newConversationId);
        }
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

  const handleUserRegistration = async (name: string, email: string) => {
    if (!isClient) return;
    
    setIsLoading(true);
    try {
      const { success, user: userData } = await createOrUpdateUser(email, name);
      
      if (success && userData) {
        const userInfo = { email, name };
        setUser(userInfo);
        setIsRegistered(true);
        
        // Save to localStorage
        localStorage.setItem('chat_user', JSON.stringify(userInfo));
        
        // Initialize conversation
        await initializeConversation(email);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (!isClient || !isChatAvailable) return;
    setIsOpen(!isOpen);
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={`absolute w-64 sm:w-72 md:w-80 h-[420px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden bottom-16 left-0`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              maxHeight: 'calc(100vh - 120px)',
              maxWidth: 'calc(100vw - 32px)'
            }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary/20 via-primary/15 to-primary/20 px-2 sm:px-3 py-2 text-white border-b border-white/10">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/10 rounded-full blur-lg transform -translate-x-8 translate-y-8"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 overflow-hidden">
                      <img 
                        src="/images/logo.png" 
                        alt="Dev & Debate Logo" 
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                      />
                    </div>
                    {/* Online indicator */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-white ${
                      isChatAvailable ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-white">Support Chat</h3>
                    <p className={`text-xs flex items-center gap-1 ${
                      isChatAvailable ? 'text-primary/80' : 'text-gray-400'
                    }`}>
                      <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
                        isChatAvailable ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                      }`}></span>
                      {isChatAvailable ? 'Online now' : 'Offline'}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={toggleChat}
                  className="text-white/70 hover:text-white transition-colors p-0.5 sm:p-1 rounded-full hover:bg-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="h-[368px] overflow-y-auto bg-black/50">
              {!isChatAvailable ? (
                <div className="min-h-full flex flex-col justify-center items-center p-4 text-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-white mb-2">Chat Unavailable</h3>
                  <p className="text-gray-400 text-xs mb-3">
                    Our support team is currently offline.
                  </p>
                  <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <p className="text-xs text-gray-300 mb-1">
                      <strong>Available Hours:</strong>
                    </p>
                    <p className="text-xs text-gray-400">
                      Monday - Friday<br />
                      10:00 AM - 8:00 PM IST
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Current time: {isClient ? currentTime : '--:-- --'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    You can still leave a message and we'll respond when we're back online.
                  </p>
                </div>
              ) : !isRegistered ? (
                <UserRegistration 
                  onRegister={handleUserRegistration}
                  isLoading={isLoading}
                />
              ) : (
                <ChatInterface 
                  user={user!}
                  conversationId={conversationId}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.div
        onHoverStart={() => {
          setIsHovered(true);
        }}
        onHoverEnd={() => {
          setIsHovered(false);
        }}
        className="relative"
      >
        <motion.button
          onClick={toggleChat}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className={`group relative p-2.5 sm:p-3 rounded-full shadow-xl border border-white/20 backdrop-blur-sm transition-all duration-300 ${
            isChatAvailable 
              ? 'bg-gradient-to-br from-primary via-primary to-blue-600 hover:from-primary/90 hover:via-primary/90 hover:to-blue-500 text-white' 
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          }`}
          style={{
            boxShadow: isChatAvailable 
              ? '0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
          whileHover={{ 
            scale: isChatAvailable ? 1.05 : 1.02,
            boxShadow: isChatAvailable 
              ? '0 15px 35px -10px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              : '0 15px 35px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
          whileTap={{ scale: isChatAvailable ? 0.95 : 0.98 }}
        >
          {/* Animated background */}
          {isChatAvailable && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-blue-600/30 rounded-full blur-lg"></div>
          )}
          
          {/* Chat Icon */}
          <div className="relative z-10">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          {/* Pulse Animation - only when available */}
          {isChatAvailable && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-blue-600/20 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1], 
                opacity: [0.3, 0, 0.3] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Notification Badge - only when available and not open */}
          {!isOpen && isChatAvailable && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
            >
              <span className="text-xs text-white font-bold">1</span>
            </motion.div>
          )}
        </motion.button>

        {/* Enhanced Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-full mb-2 sm:mb-3 px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-xl text-white text-xs sm:text-sm rounded-lg border border-white/10 shadow-xl whitespace-nowrap left-0 z-50 ${
                isChatAvailable ? 'bg-black/95' : 'bg-gray-800/95'
              }`}
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isChatAvailable ? 'bg-primary animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span className="font-medium">
                  {isChatAvailable ? 'Chat with us' : 'Chat unavailable'}
                </span>
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isChatAvailable ? 'bg-primary animate-pulse' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                {isChatAvailable ? 'Available now' : 'Available only between 10 AM - 8 PM'}
              </div>
              <div className={`absolute top-full w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent left-2 sm:left-3 ${
                isChatAvailable ? 'border-t-black/95' : 'border-t-gray-800/95'
              }`}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 