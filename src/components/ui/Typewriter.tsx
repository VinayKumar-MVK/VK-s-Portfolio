import { useState, useEffect } from "react";

export function Typewriter({ words, delay = 100, pause = 2000 }: { words: string[], delay?: number, pause?: number }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === currentWord) {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(type, isDeleting ? delay / 2 : delay);
      }
    };

    timeout = setTimeout(type, 50);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, delay, pause]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {currentText}
      <span className="inline-block w-1 h-1em bg-primary ml-1 animate-pulse" />
    </span>
  );
}
