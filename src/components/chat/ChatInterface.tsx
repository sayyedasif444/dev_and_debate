'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { sendMessage, sendMessageWithAutoReply, getMessages, checkAndSendAutoReply, cleanupFirebaseListeners, ChatMessage } from '@/lib/firebase-chat';

interface ChatInterfaceProps {
  user: { email: string; name: string };
  conversationId: string | null;
}

export default function ChatInterface({ user, conversationId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const autoReplyCheckRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (conversationId && isClient) {
      let isActive = true;

      // Subscribe to messages with enhanced error handling
      const setupMessagesListener = () => {
        try {
          const unsubscribe = getMessages(conversationId!, (newMessages) => {
            if (isActive) {
              setMessages(newMessages);
              setConnectionError(false);
              setIsReconnecting(false);
            }
          });
          
          if (isActive) {
            unsubscribeRef.current = unsubscribe;
          } else {
            unsubscribe();
          }
        } catch (error) {
          console.error('❌ Error setting up messages listener:', error);
          setConnectionError(true);
          setIsReconnecting(true);
          
          // Attempt to reconnect after a delay
          if (isActive) {
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isActive) {
                setupMessagesListener();
              }
            }, 3000); // 3 second delay
          }
        }
      };

      setupMessagesListener();

      // Set up periodic auto-reply check every 5 minutes
      const checkAutoReply = async () => {
        if (conversationId && isActive && !connectionError) {
          try {
            await checkAndSendAutoReply(conversationId, user.email);
          } catch (error) {
            console.error('❌ Error checking auto-reply:', error);
            // Don't set connection error for auto-reply failures
          }
        }
      };

      // Initial check
      checkAutoReply();

      // Set up periodic check every 5 minutes
      autoReplyCheckRef.current = setInterval(checkAutoReply, 5 * 60 * 1000);

      return () => {
        isActive = false;
        if (unsubscribeRef.current) {
          try {
            unsubscribeRef.current();
          } catch (error) {
            console.error('❌ Error cleaning up messages listener:', error);
          }
        }
        if (autoReplyCheckRef.current) {
          clearInterval(autoReplyCheckRef.current);
        }
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };
    }
  }, [conversationId, user.email, isClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        try {
          unsubscribeRef.current();
        } catch (error) {
          console.error('❌ Error cleaning up on unmount:', error);
        }
      }
      if (autoReplyCheckRef.current) {
        clearInterval(autoReplyCheckRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isClient) {
      scrollToBottom();
    }
  }, [messages, isClient]);

  // Auto-scroll to bottom immediately when component mounts
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

  const scrollToBottom = () => {
    if (messagesEndRef.current && isClient) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !isClient) return;

    setIsLoading(true);
    try {
      // Use the enhanced sendMessage function with auto-reply
      const { success } = await sendMessageWithAutoReply(conversationId, user.email, newMessage.trim());
      if (success) {
        setNewMessage('');
        setConnectionError(false);
        setIsReconnecting(false);
        // Scroll to bottom after sending message
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } else {
        setConnectionError(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setConnectionError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = () => {
    setConnectionError(false);
    setIsReconnecting(true);
    
    // Clear existing listeners and reconnect
    if (unsubscribeRef.current) {
      try {
        unsubscribeRef.current();
      } catch (error) {
        console.error('❌ Error cleaning up for retry:', error);
      }
    }
    
    // Retry after a short delay
    setTimeout(() => {
      if (conversationId && isClient) {
        const unsubscribe = getMessages(conversationId, (newMessages) => {
          setMessages(newMessages);
          setConnectionError(false);
          setIsReconnecting(false);
        });
        unsubscribeRef.current = unsubscribe;
      }
    }, 1000);
  };

  const renderMessage = (message: ChatMessage) => {
    const isUserMessage = message.sender === user.email;
    const isSystemMessage = message.type === 'system';

    if (isSystemMessage) {
      return (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="bg-primary/10 border border-primary/20 px-3 py-2 rounded-lg text-sm max-w-xs text-center shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary text-xs font-medium">System</span>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            </div>
            <p className="text-white/90 leading-relaxed">{message.content}</p>
            <p className="text-primary/70 text-xs mt-1">
              {isClient ? new Date(message.timestamp?.toDate?.() || Date.now()).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) : ''}
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-sm backdrop-blur-sm ${
            isUserMessage
              ? 'bg-primary text-white'
              : 'bg-white/10 text-white border border-white/20'
          }`}
        >
          <p className="leading-relaxed">{message.content}</p>
          <p className={`text-xs mt-1 ${
            isUserMessage ? 'text-white/70' : 'text-white/50'
          }`}>
            {isClient ? new Date(message.timestamp?.toDate?.() || Date.now()).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : ''}
          </p>
        </div>
      </motion.div>
    );
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 space-y-2 scroll-smooth bg-black/30">
          <div className="text-center text-white/50 text-sm py-6">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm backdrop-blur-sm border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-medium">Loading chat...</p>
          </div>
        </div>
        <div className="p-3 border-t border-white/10 bg-black/50 shadow-lg backdrop-blur-sm">
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/50 text-sm">
              Loading...
            </div>
            <div className="px-3 py-2 bg-white/20 rounded-lg text-white/50 text-sm min-w-[50px] flex items-center justify-center">
              ...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Connection Error Banner */}
      {connectionError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 px-3 py-2 text-red-300 text-xs text-center backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Connection issue detected. Messages may be delayed.</span>
            {!isReconnecting && (
              <button
                onClick={handleRetryConnection}
                className="text-red-200 hover:text-white underline text-xs"
              >
                Retry
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Reconnecting Banner */}
      {isReconnecting && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/20 border border-yellow-500/30 px-3 py-2 text-yellow-300 text-xs text-center backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-yellow-300/30 border-t-yellow-300 rounded-full"
            />
            <span>Reconnecting...</span>
          </div>
        </motion.div>
      )}

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 space-y-1 scroll-smooth bg-black/30"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-white/50 text-xs py-4">
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1 shadow-sm backdrop-blur-sm border border-white/20">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-medium">No messages yet</p>
            <p className="text-xs mt-0.5">Start the conversation!</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 border-t border-white/10 bg-black/50 shadow-lg backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-2 py-1.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-white/50 text-xs shadow-sm backdrop-blur-sm"
            disabled={isLoading || !conversationId || connectionError}
          />
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim() || !conversationId || connectionError}
            className="px-2 py-1.5 bg-primary hover:bg-primary/90 disabled:bg-white/20 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center justify-center min-w-[40px] shadow-sm backdrop-blur-sm text-xs"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 