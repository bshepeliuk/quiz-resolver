import { useMemo } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Button, CircularProgress } from "@mui/material";

import { useStateContext } from "../hooks/useStateContext";
import { useResolveQuiz } from "../hooks/useResolveQuiz";
import { serializeSlateNodes } from "../utils/serializeTextNodes";
import { toSlateElementNodes } from "../utils/toSlateElementNodes";

const styles = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  minHeight: "300px",
  width: "700px",
  marginBottom: "10px",
};

function QuestionsEditor() {
  const context = useStateContext();
  const { resolve, isResolving } = useResolveQuiz();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  if (context.isRecognizing) return <div>Recognizing...</div>;
  if (context.content === null) return <div>Please select a file to continue.</div>;

  const handleChange = (values: Node[]) => {
    const nodes = values.map((n) => Node.string(n));

    context.setContent({ id: context.content!.id, items: nodes });
  };

  const handleResolve = async () => {
    const result = await resolve(serializeSlateNodes(toSlateElementNodes(context.content!.items)));

    if (result !== null) {
      context.setSolution(result.data);
    }
  };

  return (
    <Slate
      key={context.content.id}
      editor={editor}
      value={toSlateElementNodes(context.content!.items)}
      onChange={handleChange}
    >
      <Editable style={styles} />
      <Button variant="contained" onClick={handleResolve} disabled={isResolving}>
        {isResolving ? <CircularProgress size={20} /> : "resolve"}
      </Button>
    </Slate>
  );
}

export default QuestionsEditor;
