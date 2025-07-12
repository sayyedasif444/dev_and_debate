import { useState, useEffect } from 'react';
import { XMarkIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { generateSlug, updateBlogPost } from '@/lib/blog-api-simple';

export default function BlogEditPopup({ isOpen, onClose, onSuccess, blog }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('');
  const [category, setCategory] = useState('Educational');
  const [status, setStatus] = useState('draft');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState('');

  // Initialize form with blog data
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setTone(blog.tone || '');
      setCategory(blog.category || 'Educational');
      setStatus(blog.status || 'draft');
      setGeneratedSlug(blog.slug || '');
    }
  }, [blog]);

  // Generate slug when title changes
  useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      setGeneratedSlug(slug);
    } else {
      setGeneratedSlug('');
    }
  }, [title]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please ensure title and content are filled');
      return;
    }

    setIsSaving(true);

    try {
      const updates = {
        title: title.trim(),
        content: content.trim(),
        tone: tone.trim(),
        category: category,
        status: status
      };

      const result = await updateBlogPost(blog.id, updates);
      
      if (result.success) {
        alert('Blog updated successfully!');
        
        if (onSuccess) {
          onSuccess({
            ...blog,
            ...updates,
            category: category,
            slug: generatedSlug
          });
        }
        
        onClose();
      } else {
        throw new Error(result.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert(`Error updating blog: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const insertHTML = (tag) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
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
    
    const newContent = content.substring(0, start) + insertText + content.substring(end);
    setContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + insertText.length, start + insertText.length);
    }, 0);
  };

  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <PencilIcon className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Edit Blog Post</h2>
              <p className="text-sm text-gray-400">Update your blog post details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Blog Info */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Blog Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Original Idea</label>
                <p className="text-white text-sm">{blog.idea || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Word Count</label>
                <p className="text-white text-sm">{blog.wordCount || 0} words</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Created</label>
                <p className="text-white text-sm">
                  {blog.created_at?.toDate ? 
                    blog.created_at.toDate().toLocaleDateString() : 
                    'N/A'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog title..."
              />
            </div>

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

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Writing Tone
              </label>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., professional, casual, technical..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Educational">Educational</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Informative">Informative</option>
                <option value="Programming">Programming</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white">Blog Content *</label>
                <button
                  onClick={toggleEditing}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <PencilIcon className="w-4 h-4" />
                  {isEditing ? 'Preview' : 'Edit'}
                </button>
              </div>
              {isEditing ? (
                <div>
                  <div className="flex gap-1 mb-2">
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
                  <textarea
                    id="content-editor"
                    value={content}
                    onChange={handleContentChange}
                    className="w-full h-96 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Edit your blog content here... Use HTML tags for formatting."
                  />
                </div>
              ) : (
                <div className="bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div 
                    className="prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content || '<p>No content available</p>' }}
                  />
                </div>
              )}
            </div>

            {/* Images */}
            {blog.images && blog.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">Generated Images</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {blog.images.slice(0, 6).map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Blog image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-4 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 