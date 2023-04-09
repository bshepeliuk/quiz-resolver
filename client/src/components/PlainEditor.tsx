import { useMemo } from "react";
import axios from "axios";
import { createEditor, Descendant, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { useStateContext } from "../hooks/useStateContext";

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
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const items: DescendantType[] = context.lines.map((item) => ({ type: "paragraph", children: [{ text: item }] }));

  const handleChange = (values: Node[]) => {};

  const handleResolve = () => {
    axios.post("http://localhost:3000/api/resolve", { content: serialize(items) });
  };

  if (!context.hasLines) return <div>No file selected.</div>;

  return (
    <Slate key={context.lines.join()} editor={editor} value={items} onChange={handleChange}>
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
