import { db, doc, getDoc, updateDoc, deleteDoc } from '@/app/api/firebase';

// GET: جلب مستند بناءً على المعرف
export async function GET(request, { params }) {
    const { id } = params;

    try {
        const docRef = doc(db, 'students', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return new Response(JSON.stringify(docSnap.data()), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response('No such document!', { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        return new Response('Failed to fetch student by ID', { status: 500 });
    }
}

// PUT: تحديث مستند بناءً على المعرف
export async function PUT(request, { params }) {
    const { id } = params;
    const data = await request.json();
    console.log('Data received for update:', data);
  
    try {
      const docRef = doc(db, 'students', id);
      await updateDoc(docRef, data);
  
      return new Response('Student updated successfully', { status: 200 });
    } catch (error) {
      console.error('Error updating student:', error);
      return new Response('Failed to update student', { status: 500 });
    }
  }
  

// DELETE: حذف مستند بناءً على المعرف
export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const docRef = doc(db, 'students', id);
        await deleteDoc(docRef);

        return new Response('Student deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting student:', error);
        return new Response('Failed to delete student', { status: 500 });
    }
}
