import { useState, useEffect } from 'react';
import { XMarkIcon, SparklesIcon, CheckCircleIcon, MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import { saveBlogPost, generateSlug } from '@/lib/firebase-blog';

export default function BlogCreationPopup({ isOpen, onClose, onSuccess }) {
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [trackingId, setTrackingId] = useState(null);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [completedJob, setCompletedJob] = useState(null);
  const [timelineMessages, setTimelineMessages] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [blogStatus, setBlogStatus] = useState('draft');
  const [isSaving, setIsSaving] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState('');

  // Generate slug when title changes
  useEffect(() => {
    if (editedTitle) {
      const slug = generateSlug(editedTitle);
      setGeneratedSlug(slug);
    } else {
      setGeneratedSlug('');
    }
  }, [editedTitle]);

  // Status polling effect
  useEffect(() => {
    let interval;
    
    if (trackingId && status !== 'completed' && status !== 'failed') {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/blog/status?trackingId=${trackingId}`);
          if (response.ok) {
            const data = await response.json();
            const job = data.job;
            
            setStatus(job.status);
            setProgress(job.progress || 0);
            setMessage(job.message || '');
            
            // Add new message to timeline if it's different from the last one
            if (job.message && job.message !== timelineMessages[timelineMessages.length - 1]?.message) {
              setTimelineMessages(prev => [...prev, {
                id: Date.now(),
                message: job.message,
                progress: job.progress || 0,
                timestamp: new Date().toLocaleTimeString()
              }]);
            }
            
            if (job.status === 'completed') {
              setIsGenerating(false);
              setCompletedJob(job);
              setEditedTitle(job.title || '');
              setEditedContent(job.content || '');
              clearInterval(interval);
            } else if (job.status === 'failed') {
              setIsGenerating(false);
              clearInterval(interval);
              alert(`Blog generation failed: ${job.message}`);
            }
          }
        } catch (error) {
          console.error('Error polling status:', error);
        }
      }, 3000); // Poll every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [trackingId, status, timelineMessages]);

  // Effect to handle completed job data
  useEffect(() => {
    if (completedJob) {
      setEditedTitle(completedJob.title || '');
      setEditedContent(completedJob.content || '');
    }
  }, [completedJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      alert('Please enter a blog idea');
      return;
    }

    if (!tone.trim()) {
      alert('Please enter a tone');
      return;
    }

    setIsGenerating(true);
    setStatus('init');
    setProgress(0);
    setMessage('Initializing blog generation...');
    setCompletedJob(null);
    setTimelineMessages([{
      id: Date.now(),
      message: 'Initializing blog generation...',
      progress: 0,
      timestamp: new Date().toLocaleTimeString()
    }]);

    try {
      const response = await fetch('/api/blog/generate-async', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idea: idea.trim(),
          tone: tone.trim()
        })
      });

      if (response.ok) {
        const result = await response.json();
        setTrackingId(result.trackingId);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to start blog generation');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert(`Error creating blog: ${error.message}`);
      setIsGenerating(false);
      setStatus(null);
      setProgress(0);
      setMessage('');
      setTimelineMessages([]);
    }
  };

  const handleSaveToFirebase = async (status = 'draft') => {
    if (!completedJob || !editedTitle.trim() || !editedContent.trim()) {
      alert('Please ensure title and content are filled');
      return;
    }

    setIsSaving(true);

    try {
      const blogData = {
        title: editedTitle.trim(),
        content: editedContent.trim(),
        idea: completedJob.idea || idea,
        tone: completedJob.tone || tone,
        status: status,
        wordCount: completedJob.wordCount || 0,
        rating: completedJob.rating || null,
        images: completedJob.images || []
      };

      const result = await saveBlogPost(blogData, 'admin');
      
      if (result.success) {
        alert(`Blog saved as ${status}!`);
        
        if (onSuccess) {
          onSuccess({
            ...completedJob,
            title: editedTitle,
            content: editedContent,
            firebaseId: result.blogId,
            status: status,
            slug: result.blog.slug
          });
        }
        
        onClose();
      } else {
        throw new Error(result.error || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog to Firebase:', error);
      alert(`Error saving blog: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
    }
  };

  const resetForm = () => {
    setIdea('');
    setTone('professional');
    setIsGenerating(false);
    setTrackingId(null);
    setStatus(null);
    setProgress(0);
    setMessage('');
    setCompletedJob(null);
    setTimelineMessages([]);
    setExpandedImage(null);
    setIsEditing(false);
    setEditedTitle('');
    setEditedContent('');
    setBlogStatus('draft');
    setIsSaving(false);
    setGeneratedSlug('');
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const insertHTML = (tag) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editedContent.substring(start, end);
    
    let insertText = '';
    switch (tag) {
      case 'h1':
        insertText = `<h1>${selectedText || 'Heading 1'}</h1>`;
        break;
      case 'h2':
        insertText = `<h2>${selectedText || 'Heading 2'}</h2>`;
        break;
      case 'h3':
        insertText = `<h3>${selectedText || 'Heading 3'}</h3>`;
        break;
      case 'p':
        insertText = `<p>${selectedText || 'Paragraph text'}</p>`;
        break;
      case 'strong':
        insertText = `<strong>${selectedText || 'Bold text'}</strong>`;
        break;
      case 'em':
        insertText = `<em>${selectedText || 'Italic text'}</em>`;
        break;
      case 'ul':
        insertText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`;
        break;
      case 'ol':
        insertText = `<ol>\n  <li>${selectedText || 'List item'}</li>\n</ol>`;
        break;
      case 'blockquote':
        insertText = `<blockquote>${selectedText || 'Quote text'}</blockquote>`;
        break;
      default:
        insertText = `<${tag}>${selectedText || 'Text'}</${tag}>`;
    }
    
    const newContent = editedContent.substring(0, start) + insertText + editedContent.substring(end);
    setEditedContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + insertText.length, start + insertText.length);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <SparklesIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create New Blog</h2>
              <p className="text-sm text-gray-400">Generate a blog post with AI</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isGenerating}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isGenerating && !completedJob ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blog Idea */}
              <div>
                <label htmlFor="idea" className="block text-sm font-medium text-white mb-2">
                  Blog Idea *
                </label>
                <textarea
                  id="idea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your blog post idea, topic, or what you want to write about..."
                  className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Be specific about what you want to cover in your blog post
                </p>
              </div>

              {/* Tone Input */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-white mb-2">
                  Writing Tone *
                </label>
                <input
                  id="tone"
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  placeholder="e.g., professional, casual, technical, creative, educational, humorous..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Describe the tone you want for your blog post (e.g., professional, casual, technical, etc.)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <SparklesIcon className="w-5 h-5" />
                  Generate Blog
                </button>
              </div>
            </form>
          ) : completedJob ? (
            /* Completed Blog Details */
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Blog Generated Successfully!</h3>
                <p className="text-gray-400">Your blog post is ready to edit and save</p>
              </div>

              {/* Blog Details */}
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Blog Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Tone</label>
                      <p className="text-white">{completedJob.tone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Word Count</label>
                      <p className="text-white">{completedJob.wordCount} words</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Quality Rating</label>
                      <p className="text-white">{completedJob.rating?.score}/10</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                      <select
                        value={blogStatus}
                        onChange={(e) => setBlogStatus(e.target.value)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>

                {completedJob.rating?.review && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Quality Review</label>
                    <p className="text-gray-300 text-sm">{completedJob.rating.review}</p>
                  </div>
                )}

                {/* Generated Slug */}
                {generatedSlug && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">URL Slug</label>
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-green-400 text-sm font-mono">
                        /blog/{generatedSlug}
                      </code>
                      <span className="text-xs text-gray-400">(Auto-generated from title)</span>
                    </div>
                  </div>
                )}

                {/* Editable Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Blog Title</label>
                    <button
                      onClick={toggleEditing}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      <PencilIcon className="w-4 h-4" />
                      {isEditing ? 'Preview' : 'Edit'}
                    </button>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter blog title..."
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-white">{editedTitle || 'No title available'}</h2>
                  )}
                  {/* Debug info */}
                  <p className="text-xs text-gray-500 mt-1">Debug - editedTitle: "{editedTitle}"</p>
                </div>

                {/* Editable Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Blog Content</label>
                    {isEditing && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => insertHTML('h1')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          H1
                        </button>
                        <button
                          onClick={() => insertHTML('h2')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          H2
                        </button>
                        <button
                          onClick={() => insertHTML('h3')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          H3
                        </button>
                        <button
                          onClick={() => insertHTML('p')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          P
                        </button>
                        <button
                          onClick={() => insertHTML('strong')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          B
                        </button>
                        <button
                          onClick={() => insertHTML('em')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          I
                        </button>
                        <button
                          onClick={() => insertHTML('ul')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          UL
                        </button>
                        <button
                          onClick={() => insertHTML('ol')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          OL
                        </button>
                        <button
                          onClick={() => insertHTML('blockquote')}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-500"
                        >
                          Q
                        </button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      id="content-editor"
                      value={editedContent}
                      onChange={handleContentChange}
                      className="w-full h-96 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Edit your blog content here... Use HTML tags for formatting."
                    />
                  ) : (
                    <div className="bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <div 
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: editedContent || '<p>No content available</p>' }}
                      />
                    </div>
                  )}
                  {/* Debug info */}
                  <p className="text-xs text-gray-500 mt-1">Debug - editedContent length: {editedContent?.length || 0} characters</p>
                </div>

                {completedJob.images && completedJob.images.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Generated Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {completedJob.images.slice(0, 6).map((image, index) => (
                        <div key={index} className="aspect-video bg-gray-700 rounded-lg overflow-hidden relative group cursor-pointer">
                          <img 
                            src={image} 
                            alt={`Blog image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => setExpandedImage({ url: image })}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <MagnifyingGlassIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Create Another Blog
                </button>
                <button
                  onClick={() => handleSaveToFirebase('draft')}
                  disabled={isSaving}
                  className="flex-1 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSaveToFirebase('published')}
                  disabled={isSaving}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Publishing...' : 'Publish Blog'}
                </button>
              </div>
            </div>
          ) : (
            /* Generation Progress */
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Generating Your Blog</h3>
                <p className="text-gray-400">{message}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-blue-400">{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Dynamic Timeline */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300">Generation Timeline</h4>
                <div className="space-y-3">
                  {timelineMessages.map((timelineItem, index) => (
                    <div key={timelineItem.id} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        index === timelineMessages.length - 1 ? 'bg-blue-500 text-white animate-pulse' : 'bg-green-500 text-white'
                      }`}>
                        {index === timelineMessages.length - 1 ? '●' : '✓'}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">{timelineItem.timestamp}</div>
                        <div className="text-white">{timelineItem.message}</div>
                        {timelineItem.progress > 0 && (
                          <div className="text-xs text-blue-400 mt-1">{timelineItem.progress}% complete</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <img 
              src={expandedImage.url} 
              alt="Expanded blog image"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
} 