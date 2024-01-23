import { useCallback, useEffect, useState } from "react";
import words from './wordList.json';
import './App.css'
import KeyBoard from "./components/KeyBoard";
import HangmanWord from "./components/HangmanWord";
import HangmanDrawing from "./components/HangmanDrawing";

const getWord = ()=> {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(currentLetters => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      gap: "2rem",
      alignItems: "center"
    }}>
      <div style={{
        fontSize: "2rem",
        textAlign: "center"
      }}>
        {isWinner && "Winner! Press Enter to try again."}
        {isLoser && "Nice Try! Press Enter to try again."}
      </div>
      <div style={{ display: "flex", gap: "15rem", marginTop:'8vh' }}>
        <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
        <div style={{ alignSelf: 'stretch' }}>
          <KeyBoard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
            inactiveLetters={inCorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
      </div>
      <HangmanWord reveal = {isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
    </div>
  );
}

export default App;
