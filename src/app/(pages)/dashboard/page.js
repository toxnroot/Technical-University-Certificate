"use client";

import { useAuth } from "@/app/hooks/useAuth"; // استيراد hook
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // استخدام التوجيه من Next.js
import ViewTwentyStudents from "@/app/components/viewTwentyStudents/viewTwentyStudents";
import UploadFile from "@/app/components/uploadFile/UploadFile";

const Page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // إذا لم يكن هناك مستخدم، إعادة التوجيه إلى صفحة تسجيل الدخول
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    // عرض شاشة تحميل أثناء التحقق من حالة المستخدم
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ViewTwentyStudents />
      <UploadFile />
    </div>
  );
};

export default Page;
