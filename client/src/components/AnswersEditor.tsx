import { useMemo } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Button } from "@mui/material";

import { useStateContext } from "../hooks/useStateContext";
import { toSlateElementNodes } from "../utils/toSlateElementNodes";
import { useDownloadAnswers } from "../hooks/useDownloadAnswers";

const styles = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  minHeight: "300px",
  width: "700px",
  marginBottom: "10px",
};

function AnswersEditor() {
  const context = useStateContext();
  const { saveAsDocx } = useDownloadAnswers();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  if (context.solution === null) return <div>We don't have any answers yet.</div>;

  const handleChange = (values: Node[]) => {
    const nodes = values.map((n) => Node.string(n));

    context.setSolution({ id: context.content!.id, items: nodes });
  };

  const handleSave = () => {
    saveAsDocx(context.solution!.items);
  };

  return (
    <Slate
      key={context.solution.id}
      editor={editor}
      value={toSlateElementNodes(context.solution.items)}
      onChange={handleChange}
    >
      <Editable style={styles} />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Slate>
  );
}

export default AnswersEditor;
