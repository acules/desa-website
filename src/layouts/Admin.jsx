import "../assets/admin/css/styles.css";
import "../assets/admin/css/custom.css";
import "../assets/admin/js/bootstrap.bundle.min.js";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

export default function admin({ children }) {
  const today = new Date(); //Membuat tahun Samsul
  return (
    <>
      <Navbar />
      <div id="layoutSidenav" className="mt-5">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>

        <div id="layoutSidenav_content">
          {children}

          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-end small">
                <div className="text-muted">Copyright &copy;{today.getFullYear()} Samsul Hidayat.</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}