import { db, auth } from './firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

// Save chat history to Firestore
export const saveHistoryToFirebase = async (conversations) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('⚠️ No user logged in, skipping Firebase save');
      return;
    }

    const userDocRef = doc(db, 'chatHistory', user.uid);
    await setDoc(userDocRef, {
      conversations: conversations,
      lastUpdated: new Date().toISOString(),
      userEmail: user.email,
    });
    console.log('✅ Chat history saved to Firebase for user:', user.email);
  } catch (error) {
    console.error('❌ Error saving to Firebase:', error);
  }
};

// Load chat history from Firestore
export const loadHistoryFromFirebase = async (user) => {
  try {
    if (!user) {
      console.log('⚠️ No user provided, cannot load from Firebase');
      return null;
    }

    console.log('🔍 Attempting to load history for user:', user.email);
    const userDocRef = doc(db, 'chatHistory', user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ Chat history loaded from Firebase:', data.conversations?.length, 'conversations');
      return data.conversations;
    } else {
      console.log('ℹ️ No chat history found in Firebase for user:', user.email);
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading from Firebase:', error);
    return null;
  }
};

// Clear chat history from Firestore
export const clearHistoryFromFirebase = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('⚠️ No user logged in, cannot clear Firebase');
      return;
    }

    const userDocRef = doc(db, 'chatHistory', user.uid);
    await deleteDoc(userDocRef);
    console.log('✅ Chat history cleared from Firebase');
  } catch (error) {
    console.error('❌ Error clearing Firebase:', error);
  }
};
