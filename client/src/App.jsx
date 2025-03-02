import { Outlet } from "react-router";
import { Navbar, Footer } from "./components";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-base-light dark:bg-base-dark text-dark dark:text-light">
      <Navbar />
      <div className="min-h-screen pt-[3.75rem]">
        <Outlet />
      </div>
      {user && user.role === 'individual' && <Footer />}
    </div>
  );
}

export default App;
