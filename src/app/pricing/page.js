'use client';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import axios from 'axios';

const page = () => {

  const handleSubscribe = async () => {
    console.log("Button clicked");

    const user = JSON.parse(localStorage.getItem("user"));
   const userId = user?.uid; // Use optional chaining to avoid crashing
   console.log("userId check:", userId);
   console.log("userId", userId);

    if(!userId) return;

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_LINKAPI + 'create-order', {
        name: "الخطة المدفوعة",
        description: "تحليل غير محدود + دعم فني مباشر + سرعة أعلى",
        quantity: 1,
        price: 5,
        totalAmount: 5,
        user_id: userId

      });
      console.log("Response data:", response.data); // 👀 Check this
      const { approvalUrl } = response.data;

      if (approvalUrl?.approvalUrl) {
        window.location.href = approvalUrl.approvalUrl; // now it's a string!
      } else {
        alert("الرابط غير صحيح أو مفقود من السيرفر.");
      }
      
    } catch (error) {
      console.error("Error creating PayPal order:", error.message);
      alert("فشل إنشاء الطلب. حاول مرة أخرى.");
    }
  };
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
    
      <section className="text-right space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-900">خطط الأسعار</h2>
        <p className="text-gray-600 text-base">اختر الخطة التي تناسب احتياجاتك</p>
      </section>

      <section className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 rounded-xl border border-gray-200 hover:border-blue-100 p-6">
          <h3 className="text-xl font-medium text-gray-900">الخطة المجانية</h3>
          <p className="text-3xl font-light text-gray-900">مجانًا</p>
          <ul className="space-y-3 text-gray-600 text-sm mt-4">
            <li className="flex items-center gap-2">✅ تحليل 3 مستندات PDF شهريًا</li>
            <li className="flex items-center gap-2">✅ خصائص أساسية</li>
          </ul>
          <Button variant="outline" className="w-full mt-6">
            البدء الآن
          </Button>
        </div>

        <div className="flex-1 rounded-xl border-2 border-customPurple bg-gradient-to-b from-blue-50/20 to-white p-6">
          <h3 className="text-xl font-medium text-gray-900">الخطة المدفوعة</h3>
          <p className="text-3xl font-light text-gray-900">
            $5 <span className="text-sm text-gray-500">/شهريًا</span>
          </p>
          <ul className="space-y-3 text-gray-600 text-sm mt-4">
            <li className="flex items-center gap-2">✅ تحليل غير محدود للمستندات</li>
            <li className="flex items-center gap-2">✅ دعم فني مباشر</li>
            <li className="flex items-center gap-2">✅ سرعة استجابة أعلى</li>
          </ul>
          <Button onClick={handleSubscribe} className="w-full mt-6 bg-customPurple text-white hover:bg-blue-600">
                الاشتراك الآن
              </Button>
        </div>
      </section>
    </main>
  );
};

export default page;
