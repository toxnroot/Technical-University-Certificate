// app/api/students/route.js
import { db, collection, getDocs } from '@/app/api/firebase'; // تأكد من استيراد Firebase بشكل صحيح

export async function GET() {
    try {
        // الحصول على مرجع لمجموعة "students"
        const studentsCollection = collection(db, 'students');
        const studentsSnapshot = await getDocs(studentsCollection);

        // التحقق من وجود مستندات
        if (!studentsSnapshot.empty) {
            const studentsList = studentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            return new Response(JSON.stringify(studentsList), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // إذا لم تكن هناك مستندات
            return new Response('No students found!', { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching all students:', error);
        return new Response('Failed to fetch all students', { status: 500 });
    }
}
