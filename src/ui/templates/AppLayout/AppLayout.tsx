// React router
import { Outlet, NavLink } from "react-router";
// Styles
import "./app-layout.scss";

export const AppLayout = () => {
  return (
    <div className="t-root">
      <header className="t-root__header">
        <nav className="t-root__nav" aria-label="Main">
          <h1>
            <NavLink to="/tasks" className="t-root__link">
              Task Management
            </NavLink>
          </h1>
        </nav>
      </header>
      <main className="t-root__main">
        <Outlet />
      </main>
      <footer className="t-root__footer">
        © {new Date().getFullYear()} Task Management
      </footer>
    </div>
  );
};
