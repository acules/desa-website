import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const CategoriesEdit = () => {
    document.title = "Edit Role - Desa Digital";
    const navigate = useNavigate();
    //get ID from parameter URL
    const { id } = useParams();

    const [names, setName] = useState("");
    const [errors, setErros] = useState([]);

    const token = Cookies.get("token");

    // mengambil data berdasarkan id
    const fetchDataCategories = async () => {
        await Api.get(`/api/admin/categories/${id}`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //set response data to state
          setName(response.data.data.name);
        });
      };

      useEffect(() => {
        fetchDataCategories();
      }, []);

      //function Update Data
  const updateCategories = async (e) => {
    e.preventDefault();

    //sending data
    await Api.post(
      `/api/admin/categories/${id}`,
      {
        //data
        name: names,
        _method: "PUT",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });
        navigate("/admin/categories");
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
                to="/categories"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-shield-alt"></i> Edit Category
                  </h6>
                  <hr />
                  <form onSubmit={updateCategories}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={names}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Category Name"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
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
