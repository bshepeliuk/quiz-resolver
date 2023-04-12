import { SnackbarProvider } from "notistack";
import { StateProvider } from "./context/StateContext";
import PlainEditor from "./components/PlainEditor";
import { LanguageProvider } from "./context/LanguageContext";
import HeaderView from "./components/Header/HeaderView";

// TODO: languages switcher;
// TODO: file types validation;
// FIXME: support SVG for Tesseract; convert SVG to PNG;

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <LanguageProvider>
        <StateProvider>
          <HeaderView />

          <main className="container">
            <PlainEditor />
          </main>
        </StateProvider>
      </LanguageProvider>
    </SnackbarProvider>
  );
}

export default App;
