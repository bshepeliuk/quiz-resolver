import useRecognizeDocx from "../hooks/useRecognizeDocx";
import { useStateContext } from "../hooks/useStateContext";

function DOCXInput() {
  const { recognize } = useRecognizeDocx();
  const context = useStateContext();

  const handleChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null) return;

    const file = files[0];

    const content = await recognize(file);

    context.setLines(content);
  };

  return (
    <div>
      <input id="docx-file" className="hidden-input" type="file" accept=".doc,.docx" onChange={handleChange} />
      <label htmlFor="docx-file">DOCX</label>
    </div>
  );
}

export default DOCXInput;
