import { useEffect, useRef, useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';

type LangType = 'eng' | 'ua';

const RECOGNIZING_TEXT = 'recognizing text';

function useTextRecognitionByLang(lang: LangType) {
  const [progress, setProgress] = useState<number>(0);
  const workerRef = useRef<Tesseract.Worker | null>(null);

  useEffect(() => {
    const loadWorker = async () => {
      const worker = await createWorker({
        logger: (m) => {
          if (m.status === RECOGNIZING_TEXT) {
            setProgress(Math.round(m.progress * 100));
            console.log(m);
          }
        },
      });

      await worker.loadLanguage(lang);
      await worker.initialize(lang);

      workerRef.current = worker;
    };

    loadWorker();

    return () => {
      if (workerRef.current !== null) {
        workerRef.current.terminate();
      }
    };
  }, [lang]);

  const recognizeText = async (url: string): Promise<{ text: string; confidence: number }> => {
    if (workerRef.current === null) return { text: '', confidence: 0 };

    const result = await workerRef.current.recognize(url);

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  };

  return {
    recognizeText,
    progress,
  };
}

export default useTextRecognitionByLang;
