export interface Comment {
  id: string;
  blogId: string;
  name: string;
  email: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
}

export interface CommentResponse {
  success: boolean;
  comments?: Comment[];
  comment?: Comment;
  error?: string;
}

export interface LikesResponse {
  success: boolean;
  likes?: number;
  error?: string;
}

// Fetch comments for a blog post
export const fetchComments = async (blogId: string): Promise<CommentResponse> => {
  try {
    const response = await fetch(`/api/blogs/comments?blogId=${blogId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false, error: 'Failed to fetch comments' };
  }
};

// Add a new comment
export const addComment = async (commentData: {
  blogId: string;
  name: string;
  email: string;
  content: string;
}): Promise<CommentResponse> => {
  try {
    const response = await fetch('/api/blogs/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: 'Failed to add comment' };
  }
};

// Fetch likes count for a blog post
export const fetchLikes = async (blogId: string): Promise<LikesResponse> => {
  try {
    const response = await fetch(`/api/blogs/likes?blogId=${blogId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    return { success: false, error: 'Failed to fetch likes' };
  }
};

// Toggle like for a blog post
export const toggleLike = async (blogId: string, action: 'like' | 'unlike'): Promise<LikesResponse> => {
  try {
    const response = await fetch('/api/blogs/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId, action }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling like:', error);
    return { success: false, error: 'Failed to toggle like' };
  }
}; 