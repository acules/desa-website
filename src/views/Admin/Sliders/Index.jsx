import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import LayoutAdmin from "../../../layouts/Admin";
import hasAnyPermission from "../../../utils/Permissions";

import { SliderCreate } from "./Create";

// Untuk Delete
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

export const SliderIndex = () => {
    document.title = "Sliders - Desa Digital";
    const [slider, setSliders] = useState([]);

    const [keywords, setKeywords] = useState("");
    const token = Cookies.get("token");

    //function fetchData
    const fetchData = async () => {
        await Api.get(`/api/admin/sliders`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //set response data to state
          setSliders(response.data.data.data);
        });
      };

      useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    //function Delete Data
    const deleteSliders = (id) => {
        //show confirm alert
        confirmAlert({
          title: "Are You Sure ?",
          message: "want to delete this data ?",
          buttons: [
            {
              label: "YES",
              onClick: async () => {
                await Api.delete(`/api/admin/sliders/${id}`, {
                 
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }).then((response) => {
                  //show toast
                  toast.success(response.data.message, {
                    position: "top-right",
                    duration: 4000,
                  });
    
                  fetchData();
                });
              },
            },
            {
              label: "NO",
              onClick: () => {},
            },
          ],
        });
      };

  return (
    <LayoutAdmin>
        <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              {hasAnyPermission(["sliders.create"]) && (
                <SliderCreate fetchData={fetchData} />
              )}
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Image</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada
                          slider.length > 0 ? (
                            //looping data
                            slider.map((sld, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index}
                                </td>
                                <td className="text-center">
                                  <img
                                    src={sld.image}
                                    width={"90px"}
                                    // height={"20px"}
                                    className="rounded"
                                  />
                                </td>
                                <td className="text-center">
                                {hasAnyPermission(["sliders.delete"]) && (
                                    <button onClick={() => deleteSliders(sld.id)} className="btn btn-danger btn-sm">
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilkan pesan data belum tersedia
                            <tr>
                              <td colSpan={3}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Belum Tersedia!.
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  )
}
