import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@/app/api/firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null); // تخزين حالة المستخدم
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // تخزين الأخطاء

  // تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
  const login = async (email, password) => {
    const auth = getAuth();
    setError(null); // إعادة تعيين الأخطاء
    setLoading(true); // تعيين حالة التحميل
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // تحديث حالة المستخدم
      return userCredential.user; // إرجاع بيانات المستخدم عند الحاجة
    } catch (err) {
      setError(err.message); // تخزين رسالة الخطأ
      console.error("فشل تسجيل الدخول:", err);
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  // تسجيل الخروج
  const logout = async () => {
    const auth = getAuth();
    setLoading(true); // تعيين حالة التحميل
    try {
      await signOut(auth); // تسجيل الخروج
      setUser(null); // تحديث حالة المستخدم إلى null
    } catch (err) {
      setError(err.message); // تخزين رسالة الخطأ
      console.error("فشل تسجيل الخروج:", err);
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  // مراقبة حالة المستخدم باستخدام onAuthStateChanged
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // تنظيف الاشتراك عند إلغاء تحميل المكون
  }, []);

  return { user, loading, error, login, logout }; // إرجاع القيم والوظائف المطلوبة
};
