import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AllHtmlEntities } from "html-entities";

const App = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [streak, setStreak] = useState(0);
  const [highscore, setHighScore] = useState(0);

  const entities = new AllHtmlEntities();

  // for first render
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=1&type=boolean"
      )
      .then((response) => {
        const result = response.data.results[0];
        setQuestion(result.question);
        setAnswer(result.correct_answer);
      });
  }, []);

  // keeps track of streak
  const streakSetter = (answerGiven) => {
    if (answerGiven === answer) {
      setStreak(streak + 1);
      if(streak >= highscore) {
        setHighScore(streak);
      }
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center bg-black text-white">
      <div className="flex flex-col justify-center text-center font-mono bold ">
      <div><h1 className="text-2xl text-center mb-5 text-black bg-white rounded">The Trivia Game</h1></div>
        <div className="mb-2">{entities.decode(question)}</div>
        <div>
          <button className="border-2 m-2 rounded bold font-mono border-green-600 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
            onClick={() => {
              streakSetter("True");
              axios
                .get(
                  "https://opentdb.com/api.php?amount=1&type=boolean"
                )
                .then((response) => {
                  const result = response.data.results[0];
                  setQuestion(result.question);
                  setAnswer(result.correct_answer);
                });
            }}
          >
            True
          </button>
        </div>
        <div>
          <button className="border-2 m-2 rounded bold font-mono border-red-600 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            onClick={() => {
              streakSetter("False");
              axios
                .get(
                  "https://opentdb.com/api.php?amount=1&type=boolean"
                )
                .then((response) => {
                  const result = response.data.results[0];
                  setQuestion(result.question);
                  setAnswer(result.correct_answer);
                });
            }}
          >
            False
          </button>
          <div className="text-black bg-white rounded">Streak: {streak} High score: {highscore} </div>
        </div>
      </div>
    </div>
  );
};

export default App;
