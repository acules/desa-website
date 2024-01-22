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
import { PostsIndex } from "../views/Admin/Posts/Index";
import { PostsCreate } from "../views/Admin/Posts/Create";
import { PostEdit } from "../views/Admin/Posts/Edit";
import { PagesIndex } from "../views/Admin/Pages/Index";
import { PagesCreate } from "../views/Admin/Pages/Create";
import { PagesEdit } from "../views/Admin/Pages/Edit";
import { ProductsIndex } from "../views/Admin/Products/Index";
import { ProductsCreate } from "../views/Admin/Products/Create";
import { ProductsEdit } from "../views/Admin/Products/Edit";
import { SliderIndex } from "../views/Admin/Sliders/Index";
import { AparatursIndex } from "../views/Admin/Aparaturs/Index";
import { PhotosIndex } from "../views/Admin/Photos/Index";
import { AparatursCreate } from "../views/Admin/Aparaturs/Create";
import { AparatursEdit } from "../views/Admin/Aparaturs/Edit";
import Home from "../views/Web/Home/Index";
import { Aparaturs } from "../views/Web/Aparaturs/Index";
import { WebPagesIndex } from "../views/Web/Pages/Index";
import { WebPagesShow } from "../views/Web/Pages/Show";
import { WebPhotosIndex } from "../views/Web/Photos/Index";
import { WebPostsIndex } from "../views/Web/Posts/Index";
import { WebProductsIndex } from "../views/Web/Products/Index";
import { WebPostsShow } from "../views/Web/Posts/Show";
import { WebProductsShow } from "../views/Web/Products/Show";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
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

      <Route
        path="/admin/posts"
        element={
          <PrivateRoutes>
            <PostsIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/posts/create"
        element={
          <PrivateRoutes>
            <PostsCreate />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/posts/edit/:id"
        element={
          <PrivateRoutes>
            <PostEdit />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/pages"
        element={
          <PrivateRoutes>
            <PagesIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/pages/create"
        element={
          <PrivateRoutes>
            <PagesCreate />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/pages/edit/:id"
        element={
          <PrivateRoutes>
            <PagesEdit />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/products"
        element={
          <PrivateRoutes>
            <ProductsIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/products/create"
        element={
          <PrivateRoutes>
            <ProductsCreate />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/products/edit/:id"
        element={
          <PrivateRoutes>
            <ProductsEdit />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/photos"
        element={
          <PrivateRoutes>
            <PhotosIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/sliders"
        element={
          <PrivateRoutes>
            <SliderIndex />
          </PrivateRoutes>
        }
      />
      
      <Route
        path="/admin/aparaturs"
        element={
          <PrivateRoutes>
            <AparatursIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/aparaturs/create"
        element={
          <PrivateRoutes>
            <AparatursCreate />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/aparaturs/edit/:id"
        element={
          <PrivateRoutes>
            <AparatursEdit />
          </PrivateRoutes>
        }
      />
    
    {/* Route Webs */}
    <Route path="/" element={<Home />} />
    <Route path="/aparaturs" element={<Aparaturs />} />
    <Route path="/pages" element={<WebPagesIndex />} />
    <Route path="/pages/:slug" element={<WebPagesShow />} />
    <Route path="/photos" element={<WebPhotosIndex />} />
    <Route path="/posts" element={<WebPostsIndex />} />
    <Route path="/posts/:slug" element={<WebPostsShow />} />
    <Route path="/products" element={<WebProductsIndex />} />
    <Route path="/products/:slug" element={<WebProductsShow />} />
    
    
    
    
    
    
    

      




      
      

      

      
      
      
      

      
    </Routes>
  );
}