import { ChangeEvent, useState } from "react";
import { Image } from "../api/api";
import { useStateContext } from "../hooks/useStateContext";

const useRecognizeImage = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isError, setIsError] = useState(false);

  const recognize = async (file: File): Promise<string[]> => {
    try {
      setIsRecognizing(true);
      setIsError(false);

      const result = await Image.recognize(file);

      setIsRecognizing(false);

      return result.data.content.split("\n").filter(Boolean);
    } catch (error) {
      setIsError(true);
      setIsRecognizing(false);
    }

    return [];
  };

  return {
    recognize,
    isError,
    isRecognizing,
  };
};

function ImageInput() {
  const { recognize } = useRecognizeImage();
  const context = useStateContext();

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null) return;

    const result = await recognize(files[0]);

    context.setLines(result);
  };

  return (
    <div>
      <input id="image-file" className="hidden-input" type="file" accept=".jpeg,.png,.jpg" onChange={handleChange} />
      <label htmlFor="image-file">Image</label>
    </div>
  );
}

export default ImageInput;
