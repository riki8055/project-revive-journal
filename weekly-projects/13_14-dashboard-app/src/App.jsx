import "./App.css";
import ControlledForm from "./components/ControlledForm";
import HeavyForm from "./components/HeavyForm";
import UncontrolledForm from "./components/UncontrolledForm";
import LoginForm from "./components/LoginForm";
import FeedbackForm from "./components/FeedbackForm";
import ErrorBoundary from "./components/ErrorBoundary";
import { Crash } from "./components/Crash";
import LazyExample from "./components/LazyExample";

function App() {
  return (
    <div style={{ marginTop: "100px" }}>
      <LazyExample />
    </div>
  );
}

export default App;
