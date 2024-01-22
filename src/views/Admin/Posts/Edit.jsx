import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Library WSIWYG
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const PostEdit = () => {
    document.title = "Edit Posts - Desa Digital";
    const navigate = useNavigate();
    //get ID from parameter URL
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [content, setContent] = useState("");

    const [categories, setCategories] = useState([]);

    const [errors, setErros] = useState([]);
    const token = Cookies.get("token");

    //   Fetch Data Category
    const fetchDataCategories = async () => {
    await Api.get("/api/admin/categoriest/all", {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
        }).then((response) => {
            setCategories(response.data.data);
        });
    };

    // mengambil data berdasarkan id
    const fetchDataPostbyId = async () => {
        await Api.get(`/api/admin/posts/${id}`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //set response data to state
            setTitle(response.data.data.title);
            setCategoryID(response.data.data.category_id);
            setContent(response.data.data.content);
        });
      };

      useEffect(() => {
        fetchDataCategories();
        fetchDataPostbyId();
    }, []);

    //function Update Data
  const updateDataPosts = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category_id", categoryID);
    formData.append("content", content);
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/posts/${id}`, formData, {
    
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
        navigate("/admin/posts");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };
    

  return (
    <LayoutAdmin>
        <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/posts"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Create Post
                  </h6>
                  <hr />
                  <form onSubmit={updateDataPosts}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <p className="text-danger">Kosongkan, jika tidak ingin mengubah foto</p>
                    </div>
                    {errors.image && (
                      <div className="alert alert-danger">
                        {errors.image[0]}
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Title Post"
                      />
                    </div>
                    {errors.title && (
                      <div className="alert alert-danger">
                        {errors.title[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Category</label>
                      <select
                        className="form-select"
                        value={categoryID}
                        onChange={(e) => setCategoryID(e.target.value)}
                      >
                        <option value="">-- Select Category --</option>
                        {categories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.category_id && (
                      <div className="alert alert-danger">
                        {errors.category_id[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Content</label>
                      <ReactQuill
                        theme="snow"
                        rows="5"
                        value={content}
                        onChange={(content) => setContent(content)}
                      />
                    </div>
                    {errors.content && (
                      <div className="alert alert-danger">
                        {errors.content[0]}
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Update
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
    
  )
}
