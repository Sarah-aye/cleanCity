import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>CleanCity+ © 2026</span>
          <span>Track something that matters.</span>
        </div>
      </footer>
    </>
  );
}
