import { useMemo } from "react";
import { createEditor, Descendant, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { useStateContext } from "../hooks/useStateContext";
import { useResolveQuiz } from "../hooks/useResolveQuiz";

interface TextNode {
  text: string;
}

interface ElementNode {
  type: string;
  children: Descendant[];
}

type DescendantType = TextNode | ElementNode;

const styles = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  minHeight: "100px",
};

function PlainEditor() {
  const context = useStateContext();
  const { resolve } = useResolveQuiz();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  // TODO: refactoring;
  if (context.isRecognizing) return <div>Recognizing...</div>;
  if (context.content === null) return <div>No file selected.</div>;

  const items: DescendantType[] = context.content.items.map((item) => ({
    type: "paragraph",
    children: [{ text: item }],
  }));

  const handleChange = (values: Node[]) => {};

  const handleResolve = () => {
    resolve(serialize(items));
  };

  return (
    <Slate key={context.content.id} editor={editor} value={items} onChange={handleChange}>
      <Editable style={styles} />

      <button type="button" onClick={handleResolve}>
        resolve
      </button>
    </Slate>
  );
}

const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

export default PlainEditor;
