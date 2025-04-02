
'use client'
function Setting() {
    return (
      <div className=" p-12">
        <h2 className="text-[32px] font-bold text-gray-50">إعدادات </h2>
        <ul className="mt-16 flex flex-col gap-8">
          <li className="flex flex-col gap-2   pb-4">
            <span className="font-bold text-lg text-secon">الاسم الكامل:</span>
            <span className="text-white text-lg">Mohamed le meqqdem</span>
          </li>
          <li className="flex flex-col gap-2   pb-4">
            <span className="font-bold text-lg text-secon">البريد الإلكتروني:</span>
            <span className="text-white text-lg">mohamad@gmail.com</span>
          </li>
          <li className="flex flex-col gap-2  border-secon  pb-4">
            <span className="font-bold text-lg text-secon">الخطة الحالية :</span>
            <span className="text-white text-lg">خطة المبتدئين</span>
          </li>
  
          <li>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-200">
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>
    );
  }
  


export default Setting;
