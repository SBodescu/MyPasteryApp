import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Layout(){
    return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <footer>© 2026 Pastery Copyright</footer>
    </div>
  );
}