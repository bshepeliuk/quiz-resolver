import { ChangeEvent } from "react";
import useRecognize from "../hooks/useRecognize";
import { useStateContext } from "../hooks/useStateContext";

function PDFInput() {
  const { recognize } = useRecognize("pdf");
  const context = useStateContext();

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null || files[0].type !== "application/pdf") return;

    const content = await recognize(files[0]);

    context.setContent(content);
  };

  return (
    <div>
      <input id="pdf-file" type="file" className="hidden-input" accept=".pdf" onChange={handleChange} />
      <label htmlFor="pdf-file">PDF</label>
    </div>
  );
}

export default PDFInput;
