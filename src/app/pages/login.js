"use client";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import userVideoStore from "./storedata";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser, user, setAuthenticated } = userVideoStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("idToken", token);
        setUser({
          uid: user.uid,
          email: user.email,
          accessToken: token,
        });


        setAuthenticated(true);
      } else {
        localStorage.removeItem("idToken");
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        setUser({ uid: user.uid, email: user.email, accessToken: token });
        toast.success("تم تسجيل الدخول بنجاح");
      } else {
        // SIGNUP
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: "User" });
        toast.success("تم إنشاء الحساب بنجاح");
      }

    } catch (err) {
      console.error("Auth Error:", err);
      setError("حدث خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError("");
  };

  return (
    <div className="m-auto flex flex-col items-center  p-12">
      <h1 className="text-2xl font-semibold mb-8">
        {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
      </h1>
        <ToastContainer />

      <form onSubmit={handleAuth} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-[300px] h-[50px] rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-[300px] h-[50px] rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="p-4 bg-blue-600 w-full rounded-2xl mt-4 text-white"
        >
          {loading ? "جاري المعالجة..." : isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}
        </button>

        <p className="text-sm text-center mt-4">
          {isLogin ? "ليس لديك حساب؟" : "هل لديك حساب؟"}{" "}
          <button type="button" onClick={toggleMode} className="text-blue-500 hover:underline">
            {isLogin ? "أنشئ حسابك الآن" : "تسجيل الدخول"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
