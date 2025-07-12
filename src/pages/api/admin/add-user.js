import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, role = 'admin' } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUserQuery = query(
      collection(db, 'auth'),
      where('email', '==', email.toLowerCase())
    );
    
    const existingUserSnapshot = await getDocs(existingUserQuery);
    
    if (!existingUserSnapshot.empty) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Add new user to auth collection
    const userData = {
      email: email.toLowerCase(),
      password: password, // In production, you should hash this
      role: role,
      created_at: new Date()
    };

    const docRef = await addDoc(collection(db, 'auth'), userData);

    res.status(201).json({ 
      success: true, 
      message: 'Admin user created successfully',
      userId: docRef.id 
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Failed to create admin user' });
  }
} 