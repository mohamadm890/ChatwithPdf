"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config.js"; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import userVideoStore from "./storedata.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser, user, setAuthenticated } = userVideoStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("تم تسجيل الخروج بنجاح!");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("حدث خطأ أثناء تسجيل الخروج");
    }
  };

  // Track user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
        setAuthenticated(true);
      } else {
      setAuthenticated(false);

    }
    });
    
    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []); // Add setlogin as a dependency

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors before a new login attempt

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser({
        uid: user.uid,
        email: user.email,
      });
      console.log(user);
      if (!user.displayName) {
        await updateProfile(user, { displayName: "User" }); 
        console.log("Display name updated successfully!");
      }

      alert("Login successful!");

    } catch (err) {
      console.error("Login Error:", err);
      setError("فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.");
    }
  };
console.log("user",user);

  return (
    <div className='m-auto flex flex-col items-center'>
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
          className="p-4 bg-blue-600 w-full rounded-2xl mt-12 text-white"
        >
          تسجيل الدخول
        </button>
       
        <p className="text-center text-sm">ليس لديك حساب؟ <Link href="/signUp">أنشئ حسابك الآن</Link></p>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
