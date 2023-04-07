import { ChangeEvent, useMemo, useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import axios from "axios";
import { createEditor, Descendant, Node, Editor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";

GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.js";

// TODO: languages switcher;
// TODO: file types validation;
// FIXME: support SVG for Tesseract; convert SVG to PNG;
// FIXME: support and .DOCX
// TODO: support .PDF

async function pdfToText(pdfUrl: string): Promise<string[][]> {
  const doc = await getDocument(pdfUrl).promise;
  const pages = await Promise.all(Array.from({ length: doc.numPages }, (_, i) => doc.getPage(i + 1)));
  const text = await Promise.all(pages.map((page) => page.getTextContent())).then((contents) => {
    return contents.map((content) => content.items.map((item) => getTextFromItem(item)));
  });

  return text;
}

function getTextFromItem(item: TextItem | TextMarkedContent): string {
  if ("str" in item) {
    return item.str;
  }

  return "";
}

function App() {
  return (
    <div>
      <h1>Quiz resolver</h1>
      <p>TXT files</p>
      <FileInput />
      <p>OCR (images)</p>
      <OCRComponent />
      <p>PDF</p>
      <PDFComponent />
      <p>DOCX</p>
      <DOCInput />
    </div>
  );
}

function FileInput() {
  const [lines, setLines] = useState<string[]>([]);

  const hasLines = lines.length > 0;

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null || files[0].type !== "text/plain") return;

    const file = files[0];
    const text = await file.text();
    const lines = text.split("\n");

    setLines(lines);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {hasLines && <ResultList lines={lines} />}
    </div>
  );
}

function OCRComponent() {
  const [lines, setLines] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(0);

  const hasLines = lines.length > 0;

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files === null) return;

    const formData = new FormData();

    formData.append("file", files[0]);

    const result = await axios.post("http://localhost:3000/api/ocr", formData);
    const lines = result.data.content.split("\n");

    setLines(lines);
    setConfidence(result.data.confidence);
  };

  return (
    <div>
      {hasLines && <div>Confidence: {confidence} %</div>}
      <input type="file" onChange={handleChange} />
      {hasLines && <ResultList lines={lines} />}
    </div>
  );
}

function PDFComponent() {
  const [lines, setLines] = useState<string[]>([]);

  const hasLines = lines.length > 0;

  const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files === null || files[0].type !== "application/pdf") return;

    const url = URL.createObjectURL(files[0]);
    const lines = await pdfToText(url);

    setLines(lines[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {hasLines && <ResultList lines={lines} />}
    </div>
  );
}

function DOCInput() {
  const [lines, setLines] = useState<string[]>([]);

  const hasLines = lines.length > 0;

  const handleChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files === null) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post("http://localhost:3000/api/docx", formData);
    const lines = result.data.content.split("\n").filter(Boolean);

    setLines(lines);

    console.log({ result: result.data.content.split("\n").filter(Boolean) });
  };

  return (
    <div>
      <input type="file" accept=".doc,.docx" onChange={handleChange} />
      {hasLines && <ResultList lines={lines} />}
    </div>
  );
}

interface IResultList {
  lines: string[];
}

function ResultList({ lines }: IResultList) {
  const items: DescendantType[] = lines.map((item) => ({ type: "paragraph", children: [{ text: item }] }));

  return (
    <>
      <PlainEditor items={items} />
    </>
  );
}

interface TextNode {
  text: string;
}

interface ElementNode {
  type: string;
  children: Descendant[];
}

type DescendantType = TextNode | ElementNode;

function PlainEditor({ items }: { items: Node[] }) {
  const [value, setValue] = useState<Node[]>(items);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleChange = (values: Node[]) => {
    setValue(values);
  };

  const handleResolve = () => {
    axios.post("http://localhost:3000/api/resolve", { content: serialize(value) });
  };

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Editable
        placeholder="Enter some plain text..."
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          minHeight: "100px",
        }}
      />
      <button type="button" onClick={handleResolve}>
        resolve
      </button>
    </Slate>
  );
}

const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

export default App;
