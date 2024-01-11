//import react router dom
import { Routes, Route } from "react-router-dom";
//import private routes
import PrivateRoutes from "./PrivateRoutes";

//import view login
import Login from "../views/Auth/Login";
import Forbidden from "../views/Auth/Forbidden";

import Dashboard from "../views/Admin/Dashboard/Index";
import PermissionsIndex from "../views/Admin/Permissions/Index";
import RolesIndex from "../views/Admin/Roles/Index";
import RolesCreate from "../views/Admin/Roles/Create";


export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/" element={<Login />} />
      <Route path="/forbidden" element={<Forbidden />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />

<Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />
      

      
    </Routes>
  );
}