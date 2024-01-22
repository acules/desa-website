import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Library WSIWYG
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const PagesEdit = () => {
    document.title = "Edit Pages - Desa Digital";
    const navigate = useNavigate();
    //get ID from parameter URL
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [errors, setErros] = useState([]);
    const token = Cookies.get("token");

    // mengambil data berdasarkan id
    const fetchDataPagesbyId = async () => {
        await Api.get(`/api/admin/pages/${id}`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //set response data to state
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
        });
      };

      useEffect(() => {
        fetchDataPagesbyId();
    }, []);

    //function Update Data
  const updateDataPages = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    await Api.post(`/api/admin/pages/${id}`, formData, {
    
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
        navigate("/admin/pages");
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
                to="/admin/pages"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Edit Pages
                  </h6>
                  <hr />
                  <form onSubmit={updateDataPages}>

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
