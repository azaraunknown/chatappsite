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
      <img src="https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/logofinal.png?alt=media&token=f2ea3f6d-be2f-48ac-8fac-d60325219856" className="logo" alt="logo" />
      {user ? <Chat /> : <SignIn />}
      </div>
    </>
  );
}

export default App;
