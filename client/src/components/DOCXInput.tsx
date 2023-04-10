import useRecognize from "../hooks/useRecognize";
import { useStateContext } from "../hooks/useStateContext";

function DOCXInput() {
  const { recognize } = useRecognize("docx");
  const context = useStateContext();

  const handleChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null) return;

    const content = await recognize(files[0]);

    context.setContent(content);
  };

  return (
    <div>
      <input id="docx-file" className="hidden-input" type="file" accept=".doc,.docx" onChange={handleChange} />
      <label htmlFor="docx-file">DOCX</label>
    </div>
  );
}

export default DOCXInput;
