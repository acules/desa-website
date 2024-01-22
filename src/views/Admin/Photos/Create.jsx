import { useState } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function PhotosCreate(props) {
 
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const [errors, setErros] = useState([]);
  const token = Cookies.get("token");

  //function "storePhoto"
  const storePhoto = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("caption", caption);

    await Api.post("/api/admin/photos", formData, {
      
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
    
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });


        //set input file to null
        document.getElementById("filen").value = "";
        document.getElementById("caps").value = "";
     

        //fetch data
        props.fetchData();
      })
      .catch((error) => {
        //set state "errors"
        setErros(error.response.data);
      });
  };

  return (
    <div className="card border-0 rounded shadow-sm border-top-success">
      <div className="card-body">
        <form onSubmit={storePhoto}>
          <div className="mb-3">
            <label className="form-label fw-bold">Image</label>
            <input
              type="file"
              id="filen"
              className="form-control"
              accept="images/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {errors.image && (
            <div className="alert alert-danger">{errors.image[0]}</div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Caption</label>
            <input
              type="text"
              id="caps"
              className="form-control"
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter Title Photo"
            />
          </div>
          {errors.caption && (
            <div className="alert alert-danger">{errors.caption[0]}</div>
          )}
          <div>
            <button type="submit" className="btn btn-md btn-primary me-2">
              <i className="fa fa-save"></i> Upload
            </button>
            <button type="reset" className="btn btn-md btn-warning">
              <i className="fa fa-redo"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}