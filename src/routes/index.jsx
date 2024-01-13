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
import { RolesEdit } from "../views/Admin/Roles/Edit";
import { UserIndex } from "../views/Admin/Users/Index";
import { UserCreate } from "../views/Admin/Users/Create";
import { UserEdit } from "../views/Admin/Users/Edit";
import { CategoriesIndex } from "../views/Admin/Categories/Index";
import { CategoriesCreate } from "../views/Admin/Categories/Create";
import { CategoriesEdit } from "../views/Admin/Categories/Edit";

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

      <Route
        path="/admin/roles/edit/:id"
        element={
          <PrivateRoutes>
            <RolesEdit />
          </PrivateRoutes>
        }
      />
      
      <Route
        path="/admin/users"
        element={
          <PrivateRoutes>
            <UserIndex />
          </PrivateRoutes>
        }
      />

    <Route
        path="/admin/users/create"
        element={
          <PrivateRoutes>
            <UserCreate />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/users/edit/:id"
        element={
          <PrivateRoutes>
            <UserEdit />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <PrivateRoutes>
            <CategoriesIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/categories/create"
        element={
          <PrivateRoutes>
            <CategoriesCreate />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/categories/edit/:id"
        element={
          <PrivateRoutes>
            <CategoriesEdit />
          </PrivateRoutes>
        }
      />

      
      
      
      

      
    </Routes>
  );
}