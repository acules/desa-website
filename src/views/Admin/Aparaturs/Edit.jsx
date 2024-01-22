import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const AparatursEdit = () => {
    document.title = "Edit Aparaturs - Desa Digital";
    const navigate = useNavigate();
    //get ID from parameter URL
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [names, setNames] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [errors, setErros] = useState([]);

    const token = Cookies.get("token");

    // mengambil data berdasarkan id
    const fetchDataAptbyId = async () => {
        await Api.get(`/api/admin/aparaturs/${id}`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //set response data to state
          setImage(response.data.data.image);
          setNames(response.data.data.name);
          setJabatan(response.data.data.role);          
        });
      };
  
      useEffect(() => {
        fetchDataAptbyId();
      }, []);

      const updateDataAparaturs = async (e) => {
        e.preventDefault();
    
        //define formData
        const formData = new FormData();
    
        //append data to "formData"
        formData.append("image", image);
        formData.append("name", names);
        formData.append("role", jabatan);
        formData.append("_method", "PUT");
    
        await Api.post(`/api/admin/aparaturs/${id}`, formData, {
        
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
            navigate("/admin/aparaturs");
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
                to="/admin/aparaturs"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Create Aparatur
                  </h6>
                  <hr />
                  <form onSubmit={updateDataAparaturs}>
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

                    <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            placeholder="Enter Name"
                          />
                        </div>
                        {errors.names && (
                          <div className="alert alert-danger">
                            {errors.names[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Jabatan (Position)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={jabatan}
                            onChange={(e) => setJabatan(e.target.value)}
                            placeholder="Enter Jabatan"
                          />
                        </div>
                        {errors.jabatan && (
                          <div className="alert alert-danger">
                            {errors.jabatan[0]}
                          </div>
                        )}
                      </div>
                    </div>
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
