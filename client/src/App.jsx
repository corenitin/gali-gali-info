import { Outlet } from "react-router";
import { DarkModeBtn, Test, Navbar, Footer } from "./components";
import {Register, Login} from "./pages";

function App() {
  return (
    <div className="min-h-screen bg-base-light dark:bg-base-dark text-dark dark:text-light">
      <Navbar />
      <div className="min-h-screen pt-[3.75rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
