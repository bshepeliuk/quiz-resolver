import { SnackbarProvider } from "notistack";
import { StateProvider } from "./context/StateContext";
import PlainEditor from "./components/PlainEditor";
import FileInput from "./components/FileInput/FileInput";

// TODO: languages switcher;
// TODO: file types validation;
// FIXME: support SVG for Tesseract; convert SVG to PNG;

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <StateProvider>
        <header className="header">
          <div className="container">
            <div className="header-content-wrapper">
              <span className="logo">Quiz resolver</span>
              <FileInput />
            </div>
          </div>
        </header>

        <main className="container">
          <PlainEditor />
        </main>
      </StateProvider>
    </SnackbarProvider>
  );
}

export default App;
