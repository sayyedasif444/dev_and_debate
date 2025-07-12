import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  limit 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, limit: pageLimit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(pageLimit);

    // Query published blogs
    const blogsQuery = query(
      collection(db, 'blogs'),
      where('status', '==', 'published'),
      orderBy('published_at', 'desc'),
      limit(itemsPerPage)
    );

    const querySnapshot = await getDocs(blogsQuery);
    
    const blogs = [];
    querySnapshot.forEach((doc) => {
      const blogData = doc.data();
      blogs.push({
        id: doc.id,
        title: blogData.title,
        content: blogData.content,
        slug: blogData.slug,
        tone: blogData.tone,
        wordCount: blogData.wordCount,
        images: blogData.images || [],
        published_at: blogData.published_at,
        created_at: blogData.created_at,
        created_by: blogData.created_by
      });
    });

    // Get total count for pagination
    const countQuery = query(
      collection(db, 'blogs'),
      where('status', '==', 'published')
    );
    const countSnapshot = await getDocs(countQuery);
    const totalBlogs = countSnapshot.size;

    const totalPages = Math.ceil(totalBlogs / itemsPerPage);
    const hasNextPage = pageNumber < totalPages;
    const hasPrevPage = pageNumber > 1;

    res.status(200).json({
      blogs,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalBlogs,
        hasNextPage,
        hasPrevPage,
        itemsPerPage
      }
    });
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
} 