import React from "react";
import Footer from "./Footer/Footer";
import MainPanel from "./MainPanel";
import Navbar from "./Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Full-width Navbar */}
      <header className="w-100">
        <Navbar />
      </header>

      {/* Full-width Main Content */}
      <main className="flex-grow-1 w-100">
        <div className="container-fluid py-4">
          <MainPanel>
            {children}
          </MainPanel>
        </div>
      </main>

      {/* Full-width Footer */}
      <footer className="mt-auto bg-light py-3 w-100">
        <div className="container-fluid text-center">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;
