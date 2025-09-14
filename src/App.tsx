import AuthRouter from "./AuthRouter";
import "./style/global.css";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <AuthRouter />
      <Toaster />
    </>
  );
}

export default App;
