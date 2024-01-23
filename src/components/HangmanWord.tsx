type HangmanWordProps={
  wordToGuess: string,
  guessedLetters: string[],
  reveal ?: boolean,
}

const HangmanWord = ({wordToGuess, guessedLetters, reveal= false}: HangmanWordProps) => {
  return (
    <div style={{
      display:'flex',
      gap:'0.25em',
      fontSize:'5rem',
      fontWeight:'bold',
      textTransform:'uppercase',
      fontFamily:'monospace',
    }}>
      {wordToGuess.toLowerCase().split('').map((letter, index)=>(
        <span style={{borderBottom: '.1em solid black'}} key={index}>
          <span 
            style={{
              visibility:guessedLetters.includes(letter) || reveal 
                ? 'visible'
                : 'hidden',
                color: !guessedLetters.includes(letter) && reveal ? "red" :'black',
        }}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}

export default HangmanWord
