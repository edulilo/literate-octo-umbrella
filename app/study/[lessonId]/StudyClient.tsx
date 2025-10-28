"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Vocabulary } from "@/lib/db/schema";

interface StudyClientProps {
  vocabulary: Vocabulary[];
  lessonId: string;
}

export default function StudyClient({
  vocabulary,
  lessonId,
}: StudyClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = vocabulary[currentIndex];

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
    nextCard();
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
    nextCard();
  };

  const nextCard = () => {
    setShowAnswer(false);
    if (currentIndex + 1 >= vocabulary.length) {
      setIsComplete(true);
      // Save study session
      saveStudySession();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const saveStudySession = async () => {
    try {
      await fetch("/api/study-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          duration: 0, // Could track actual time
          itemsStudied: vocabulary.length,
          itemsCorrect: correctCount + 1, // +1 for the last card
        }),
      });
    } catch (error) {
      console.error("Failed to save study session:", error);
    }
  };

  if (isComplete) {
    const accuracy = Math.round((correctCount / vocabulary.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Great Job!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-lg">
              You studied <strong>{vocabulary.length}</strong> words
            </p>
            <p className="text-lg">
              Accuracy: <strong>{accuracy}%</strong>
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                ✓ {correctCount} correct
              </div>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                ✗ {incorrectCount} incorrect
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Card {currentIndex + 1} of {vocabulary.length}
            </span>
            <span>
              ✓ {correctCount} | ✗ {incorrectCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / vocabulary.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="bg-white rounded-xl shadow-lg p-8 min-h-[400px] flex flex-col justify-center cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {!showAnswer ? (
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-4">
                What does this mean?
              </div>
              <div className="text-5xl font-bold mb-4">
                {currentCard.japanese}
              </div>
              {currentCard.hiragana && (
                <div className="text-2xl text-gray-600 mb-2">
                  {currentCard.hiragana}
                </div>
              )}
              <div className="text-xl text-gray-500">{currentCard.romaji}</div>
              <div className="mt-8 text-sm text-gray-400">
                Click to reveal answer
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold mb-4">
                {currentCard.english}
              </div>
              {currentCard.exampleSentence && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-lg text-gray-700 mb-2">
                    {currentCard.exampleSentence}
                  </div>
                  {currentCard.exampleTranslation && (
                    <div className="text-gray-500">
                      {currentCard.exampleTranslation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {showAnswer && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleIncorrect}
              className="flex-1 px-6 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              ✗ Incorrect
            </button>
            <button
              onClick={handleCorrect}
              className="flex-1 px-6 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              ✓ Correct
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
