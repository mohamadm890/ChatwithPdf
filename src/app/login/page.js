"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js"; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors before a new login attempt

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      alert("Login successful!");
      await router.push('/dash');  // Redirect to the dashboard or home page after successful login

      // You can redirect the user to another page here
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className=' h-full w-full m-auto flex flex-col items-center  min-h-screen p-12'>
      <h1 className="text-2xl font-semibold text-center mb-8">تسجيل الدخول</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
        
          <input
            type="email"
            id="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[300px] h-[50px] rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
            />
        </div>

        <div>
        
          <input
            type="password"
            id="password"
            name="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-[300px] h-[50px] rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
            />
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="p-4 bg-blue-600 w-full rounded-2xl  mt-12 text-white"
        >
          تسجيل الدخول
        </button>
       
        <p className="text-center text-sm">ليس لديك حساب؟ <Link href="/signUp">أنشئ حسابك الآن</Link></p>

      </form>
    </div>
  );
};

export default Login;
