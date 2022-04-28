// File by: Griffin
import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
    <div className="bruh">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap"
        rel="stylesheet"/>

      {user ? <Chat /> : <SignIn />}
      </div>
    </>
  );
}

export default App;
