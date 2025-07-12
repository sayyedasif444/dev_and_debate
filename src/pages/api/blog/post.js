import { 
  collection, 
  query, 
  where, 
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug, id } = req.query;
    
    if (!slug && !id) {
      return res.status(400).json({ error: 'Slug or ID is required' });
    }

    let blog = null;

    if (id) {
      // Try to get by ID first
      const blogRef = doc(db, 'blogs', id);
      const blogSnap = await getDoc(blogRef);
      
      if (blogSnap.exists()) {
        const blogData = blogSnap.data();
        // Only return if published
        if (blogData.status === 'published') {
          blog = {
            id: blogSnap.id,
            ...blogData
          };
        }
      }
    }

    if (!blog && slug) {
      // Try to get by slug
      const blogsQuery = query(
        collection(db, 'blogs'),
        where('slug', '==', slug),
        where('status', '==', 'published')
      );
      
      const querySnapshot = await getDocs(blogsQuery);
      
      if (!querySnapshot.empty) {
        const blogDoc = querySnapshot.docs[0];
        blog = {
          id: blogDoc.id,
          ...blogDoc.data()
        };
      }
    }

    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        error: 'Blog post not found or not published' 
      });
    }

    res.status(200).json({
      success: true,
      blog: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        slug: blog.slug,
        tone: blog.tone,
        wordCount: blog.wordCount,
        images: blog.images || [],
        published_at: blog.published_at,
        created_at: blog.created_at,
        created_by: blog.created_by
      }
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch blog post' 
    });
  }
} 