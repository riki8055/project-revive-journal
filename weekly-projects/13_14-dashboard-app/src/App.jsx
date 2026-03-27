import "./App.css";
import ControlledForm from "./components/ControlledForm";
import HeavyForm from "./components/HeavyForm";
import UncontrolledForm from "./components/UncontrolledForm";
import LoginForm from "./components/LoginForm";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <div style={{ marginTop: "100px" }}>
      <LoginForm />
      <FeedbackForm />
    </div>
  );
}

export default App;
