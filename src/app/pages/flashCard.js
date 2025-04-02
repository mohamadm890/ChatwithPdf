'use client'

import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const FlashCardApp = () => {
  // Flashcards Data (questions and answers)
  const flashcards = [
    {
      question: 'ما هو React؟',
      answer: 'مكتبة JavaScript لبناء واجهات المستخدم.',
    },
    {
      question: 'ما هو JSX؟',
      answer: 'إضافة لكتابة JavaScript التي تبدو كـ HTML.',
    },
    {
      question: 'ما هو الـ state في React؟',
      answer: 'الـ state يحتفظ بالمعلومات التي تؤثر على المخرجات عند الإظهار.',
    },
    // You can continue adding more flashcards here
  ];

  // State to track the current flashcard index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next card
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  // Function to go to the previous card
  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  // FlashCard component for rendering individual flashcards
  const FlashCard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    return (
      <div
        className="w-[400px] h-[250px] cursor-pointer"
        onClick={handleClick}
      >
        <div
          className="flashcard-inner"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s',
          }}
        >
          {/* Front Side */}
          <div
            className="flashcard-front"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#333333',
              border: '1px solid #232323',
              borderRadius: '24px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backfaceVisibility: 'hidden',
              textAlign: 'center',
            }}
          >
            <p className='text-white'>{question}</p>
          </div>

          {/* Back Side */}
          <div
            className="flashcard-back"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#232323',
              borderRadius: '24px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backfaceVisibility: 'hidden',
              textAlign: 'center',
              transform: 'rotateY(180deg)',
              border: '1px solid #333333',
            }}
          >
            <p className='text-white'>{answer}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flashcard-app"
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Display the current flashcard */}
      <FlashCard
        key={currentIndex}
        question={flashcards[currentIndex].question}
        answer={flashcards[currentIndex].answer}
      />
      
      {/* Display the current card number out of total */}
    

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems:"center",
          width: '80%',
          marginTop: '20px',
        }}
      >
        {/* Previous Button */}
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#232323',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            border: '1px solid #333333',
          }}
        >
          <IoIosArrowForward />
        </button>
         <p className='text-white'> {currentIndex + 1} / {flashcards.length}</p>
        {/* Next Button */}
        <button
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#232323',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            cursor: currentIndex === flashcards.length - 1 ? 'not-allowed' : 'pointer',
            border: '1px solid #333333',
          }}
        >
          <IoIosArrowBack />
        </button>
      </div>
    </div>
  );
};

export default FlashCardApp;
