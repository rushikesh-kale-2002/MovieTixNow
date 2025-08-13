// import AdminNavbar from "./AdminNavbar"
// import Sidebar from "./Sidebar"
// import { Outlet } from "react-router-dom";

// const Layout = ({ children }) => {
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-2 p-0">
//           <Sidebar />
//            <Outlet />
//         </div>
//         <div className="col-md-10 p-0">
//           <AdminNavbar />
//           <main className="main-content p-4">{children}</main>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout
import AdminNavbar from "./AdminNavbar"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        
        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-md-10 p-0">
          <AdminNavbar />
          <main className="main-content p-4">
            <Outlet /> {/* Pages will render here */}
          </main>
        </div>

      </div>
    </div>
  )
}

export default Layout
