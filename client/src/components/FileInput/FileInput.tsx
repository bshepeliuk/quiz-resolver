import { useLanguageContext } from "../../hooks/useLanguageContext";
import useRecognize from "../../hooks/useRecognize";
import { useStateContext } from "../../hooks/useStateContext";
import { Input, Label } from "./fileInput.styled";

function FileInput() {
  const { recognize } = useRecognize();
  const { languages } = useLanguageContext();
  const context = useStateContext();

  const handleChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null) return;

    context.setIsRecognizing(true);

    const content = await recognize({ languages, file: files[0] });

    context.setIsRecognizing(false);
    context.setContent(content);
  };

  return (
    <div>
      <Input type="file" id="file" onChange={handleChange} />
      <Label htmlFor="file">Select File</Label>
    </div>
  );
}

export default FileInput;
