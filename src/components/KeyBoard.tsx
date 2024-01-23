import styles from './KeyBoard.module.css';

const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

type KeyBoardProps = {
  disabled ?: boolean,
  activeLetters: string[],
  inactiveLetters: string[],
  addGuessedLetter: (letter:string) =>void
}

const KeyBoard = ({disabled = false, activeLetters, inactiveLetters, addGuessedLetter}: KeyBoardProps) => {
  return (
    <div className={styles.keyboard}>
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button 
            className={`${styles.button} ${isActive? styles.active:""} ${isInactive ? styles.inactive: ""}
            `} 
            disabled = {isActive || isInactive || disabled}
            key={key}
            onClick = {() => addGuessedLetter(key)}
          >
            {key}
          </button>
        )
      })}
      
    </div>
  )
}

export default KeyBoard;  
