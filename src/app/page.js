'use client';

import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FileUploader from './pages/fileUploader';
import Link from 'next/link';

const HomePage = () => {
  const fileUploaderRef = useRef(null);
  const newNoteId = uuidv4();

  const handleScrollToUpload = () => {
    fileUploaderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        {/* Animated Background */}
        <div className="absolute inset-0 animate-gradient-flow opacity-50">
          <div className="absolute h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>
        </div>

        <div className="relative z-20 mx-4 flex max-w-4xl flex-col items-center space-y-8 text-center">
        <h1 className="text-5xl font-bold leading-normal text-gray-800 dark:text-white md:text-6xl xl:text-6xl xl:mt-8 xl:mb-4">
        مستنداتك، محادثة تفاعلية في لحظة
          </h1>
         <p>{process.env.NEXT_PUBLIC_FIREBASE_API_KEY}</p>
          <p className="text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
            استخرج المعلومات بذكاء، احصل على إجابات فورية، وافهم مستنداتك بشكل أعمق مع الذكاء الاصطناعي
          </p>

          <button
            onClick={handleScrollToUpload}
            className="mt-4 transform rounded-full bg-white px-6 py-3 text-blue-600 shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            <FileUploader/>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              مزايا فريدة لتحسين تجربتك
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              اكتشف القوة الحقيقية للتفاعل مع مستنداتك
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📚', title: 'فهم أسرع', description: 'تلخيص المعلومات المعقدة إلى مفاهيم بسيطة' },
              { icon: '⚡', title: 'ردود فورية', description: 'احصل على إجابات في ثوانٍ معدودة' },
              { icon: '🔍', title: 'بحث ذكي', description: 'ابحث في المستندات باستخدام لغة طبيعية' },
              { icon: '🔄', title: 'دعم متعدد اللغات', description: 'تفاعل بلغتك المفضلة' }
            ].map((feature, idx) => (
              <div key={idx} className="rounded-xl border bg-white p-6 transition-all hover:-translate-y-2 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">ماذا يقول المستخدمون؟</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { quote: 'أفضل أداة استخدمتها لفهم مستنداتي بسرعة!', name: 'سارة من مصر' },
              { quote: 'الذكاء الاصطناعي يشرح لي المحتوى بطريقة مبسطة وممتعة.', name: 'أحمد من السعودية' }
            ].map((t, idx) => (
              <div key={idx} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
                <p className="text-lg italic text-gray-700 dark:text-gray-200">“{t.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-3xl font-bold text-center text-gray-900 dark:text-white">الأسئلة الشائعة</h2>
          <div className="space-y-6">
            {[
              { q: 'هل الخدمة مجانية؟', a: 'نعم، يمكنك البدء مجانًا وتجربة جميع المزايا.' },
              { q: 'هل تدعمون مستندات PDF فقط؟', a: 'نحن ندعم ملفات PDF، وسنعمل لاحقًا على دعم تنسيقات إضافية.' }
            ].map((faq, idx) => (
              <div key={idx} className="border-b pb-4 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{faq.q}</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center dark:bg-gray-900 dark:text-gray-400">
        <p>© 2025 AI Note. جميع الحقوق محفوظة.</p>
       
      </footer>
    </div>
  );
};

export default HomePage;

