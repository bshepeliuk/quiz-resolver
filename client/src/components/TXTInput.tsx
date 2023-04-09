import { ChangeEvent } from "react";

import { useRecognizeTxt } from "../hooks/useRecognizeTxt";
import { useStateContext } from "../hooks/useStateContext";

function TXTInput() {
  const { recognize } = useRecognizeTxt();
  const context = useStateContext();

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null || files[0].type !== "text/plain") return;

    const file = files[0];
    const content = await recognize(file);

    context.setLines(content);
  };

  return (
    <div>
      <input className="hidden-input" id="txt-file" type="file" accept=".txt" onChange={handleChange} />
      <label htmlFor="txt-file">TXT</label>
    </div>
  );
}

export default TXTInput;
