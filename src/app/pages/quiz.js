// pages/quiz.js
'use client';
import { useState } from 'react';
import Confetti from "react-confetti";

const questions = [
    {
      question: "ما هي عاصمة فرنسا؟",
      options: ["برلين", "مدريد", "باريس", "روما"],
      correct: 2,
    },
    {
      question: "أي كوكب يعرف بالكوكب الأحمر؟",
      options: ["الأرض", "المريخ", "المشتري", "زحل"],
      correct: 1,
    },
    {
      question: "ما هو أكبر حيوان ثديي؟",
      options: ["الفيل", "الحوت الأزرق", "القرش", "الزرافة"],
      correct: 1,
    },
  ];
  

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
  };

  return (
    <div className="quiz-container max-w-[680px] ">
      {!quizFinished ? (
        <div className="question-card">
          <h2 className='text-4xl font-bold text-gray-200 mb-12'>{questions[currentQuestionIndex].question}</h2>
          <div className="options flex flex-col gap-4">
            {questions[currentQuestionIndex].options.map((option, index) => (

              <div
                key={index}
                className={`option p-8 border border-Card rounded-md cursor-pointer transition-all duration-300 ${
                    selectedAnswer === index 
                      ? 'bg-blue-500 text-white border-blue-500'  // Selected state: blue background, white text, blue border
                      : 'hover:bg-Card text-gray-200'  // Unselected state: gray hover background, gray text
                  }`}
                                  onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </div>


            ))}
          </div>
          <button
  onClick={handleNext}
  className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-300 mt-12"
>
  Next
</button>
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
          <Confetti width={windowWidth} height={windowHeight} />
          <h2 className="text-3xl font-semibold text-green-600 mb-4">تم الانتهاء من الاختبار!</h2>
<p className="text-xl text-gray-800 mb-4">
  نتيجتك: <span className="font-bold">{score}</span>/{questions.length}
</p>
<button
  onClick={handleRestart}
  className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
>
  إعادة بدء الاختبار
</button>
        </div>
      )}
    </div>
  );
}
