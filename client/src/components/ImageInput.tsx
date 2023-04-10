import { ChangeEvent } from "react";
import useRecognize from "../hooks/useRecognize";
import { useStateContext } from "../hooks/useStateContext";

function ImageInput() {
  const { recognize } = useRecognize("ocr");
  const context = useStateContext();

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null) return;

    const content = await recognize(files[0]);

    context.setContent(content);
  };

  return (
    <div>
      <input id="image-file" className="hidden-input" type="file" accept=".jpeg,.png,.jpg" onChange={handleChange} />
      <label htmlFor="image-file">Image</label>
    </div>
  );
}

export default ImageInput;
