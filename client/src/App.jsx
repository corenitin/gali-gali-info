import { Outlet } from "react-router";
import { Navbar, Footer } from "./components";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen text-dark dark:text-light">
      <div className="flex justify-center">
        <Navbar />
      </div>
      <div className="min-h-screen bg-primary-dark/5 pt-13 flex justify-center">
        <Outlet />
      </div>
      {user && user.role === "individual" && <Footer />}
    </div>
  );
}

export default App;
