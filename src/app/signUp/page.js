
'use client';
// pages/login.js
import { useState } from 'react';
import { auth } from '../firebase/config';  // Import Firebase auth
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopu} from 'firebase/auth';  // Import Firebase auth methods
import Link from 'next/link';

const signup = () => {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign in using Firebase authentication
      const auth_user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth_user);
      await router.push('/dash');  // Redirect to the dashboard or home page after successful login
    } catch (err) {
      setError(err.message);  // Show error message if login fails
    } finally {
      setLoading(false);
    }
  };


 

  return (
    <div className=' h-full w-full m-auto flex flex-col items-center  min-h-screen p-12'>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-600 mb-12">
إنشاء حساب جديد</h3>

      <form onSubmit={handleLogin}>
      <div className='flex flex-col gap-4 '>

        <input
className="w-[300px] h-[50px] rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
className="w-[300px] h-[50px] rounded-2xl p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md"

          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> 
         </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className='p-4 bg-blue-600 w-full rounded-2xl  mt-12 text-white' disabled={loading}>
        {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
        </button>

        <p className="text-center text-sm mt-4">
  لديك حساب؟ <Link href="/login" className="text-blue-500 hover:underline">تسجيل الدخول</Link>
</p>
      </form>
    
    </div>
  );
};

export default signup;
