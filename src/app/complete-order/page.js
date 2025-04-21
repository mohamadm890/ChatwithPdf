"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Move the component logic to a child component
const CompleteOrderContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const PayerID = searchParams.get('PayerID');

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token && PayerID) {
      const capturePayment = async () => {
        setIsLoading(true);
        try {
          const res = await axios.post(process.env.LINKAPI + 'capture-payment', {
            orderID: token,
            payerId: PayerID,
          });
          setPaymentStatus(res.data.status);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage('Error capturing payment. Please try again.');
          setIsLoading(false);
        }
      };
      capturePayment();
    }
  }, [token, PayerID]);

  return (
    <div className="dir-rtl text-right min-h-screen flex flex-col justify-center items-center bg-gray-50 p-8 font-sans">
      {isLoading && <p>Processing your payment...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {paymentStatus && !isLoading && (
        <div>
          <h1 className="text-green-600 text-4xl font-semibold mb-6">
            لقد قمت بالدفع بنجاح، وتم تفعيل خطتك المميزة الآن.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            شكراً لك على ثقتك بنا! يمكنك الآن الاستفادة من جميع مميزات الخطة المدفوعة.
          </p>
        </div>
      )}
    </div>
  );
};

// Main page component with proper Suspense boundary
const Page = () => (
  <Suspense fallback={<div>Loading payment details...</div>}>
    <CompleteOrderContent />
  </Suspense>
);

export default Page;