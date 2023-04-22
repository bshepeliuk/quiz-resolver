import { SnackbarProvider } from "notistack";

import { StateProvider } from "./context/StateContext";
import QuestionsEditor from "./components/QuestionsEditor";
import { LanguageProvider } from "./context/LanguageContext";
import HeaderView from "./components/Header/HeaderView";
import AnswersEditor from "./components/AnswersEditor";

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <LanguageProvider>
        <StateProvider>
          <HeaderView />

          <main className="container main">
            <h1>Questions</h1>
            <QuestionsEditor />
            <h1>Answers</h1>
            <AnswersEditor />
          </main>
        </StateProvider>
      </LanguageProvider>
    </SnackbarProvider>
  );
}

export default App;
