import { StateProvider } from "./context/StateContext";
import DOCXInput from "./components/DOCXInput";
import TXTInput from "./components/TXTInput";
import ImageInput from "./components/ImageInput";
import PDFInput from "./components/PDFInput";
import PlainEditor from "./components/PlainEditor";

// TODO: languages switcher;
// TODO: file types validation;
// FIXME: support SVG for Tesseract; convert SVG to PNG;

function App() {
  return (
    <StateProvider>
      <header className="header">
        <div className="container">
          <div className="header-content-wrapper">
            <span className="logo">Quiz resolver</span>
            <TXTInput />
            <ImageInput />
            <PDFInput />
            <DOCXInput />
          </div>
        </div>
      </header>

      <main className="container">
        <PlainEditor />
      </main>
    </StateProvider>
  );
}

export default App;
