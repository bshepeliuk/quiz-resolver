import { ChangeEvent } from "react";
import useRecognize from "../hooks/useRecognize";

import { useStateContext } from "../hooks/useStateContext";

function TXTInput() {
  const { recognize } = useRecognize("txt");
  const context = useStateContext();

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null || files[0].type !== "text/plain") return;

    const content = await recognize(files[0]);

    context.setContent(content);
  };

  return (
    <div>
      <input className="hidden-input" id="txt-file" type="file" accept=".txt" onChange={handleChange} />
      <label htmlFor="txt-file">TXT</label>
    </div>
  );
}

export default TXTInput;
