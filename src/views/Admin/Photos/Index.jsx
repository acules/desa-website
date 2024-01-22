import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import LayoutAdmin from "../../../layouts/Admin";
import hasAnyPermission from "../../../utils/Permissions";
import Pagination from "../../../components/general/Pagination";

// Untuk Delete
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

//import component photo create
import PhotoCreate from './Create'

export const PhotosIndex = () => {
    document.title = "Photos - Desa Digital";
    const [photos, setPhotos] = useState([]);

    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
      });

    const [keywords, setKeywords] = useState("");
    const token = Cookies.get("token");

    //function fetchData
    const fetchData = async (pageNumber = 1, keywords = "") => {
        const page = pageNumber ? pageNumber : pagination.currentPage;
    
        await Api.get(`/api/admin/photos?search=${keywords}&page=${page}`, {
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          //set data response
          setPhotos(response.data.data.data);
          setPagination(() => ({
            currentPage: response.data.data.current_page,
            perPage: response.data.data.per_page,
            total: response.data.data.total,
          }));
        });    
      };

      useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
      }, []);
    
      const searchData = async (e) => {
        //set value to state "keywords"
        setKeywords(e.target.value);
        fetchData(1, e.target.value);
      };

    //function Delete Data
    const deletePhoto = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/photos/${id}`, {
             
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
              {hasAnyPermission(["photos.create"]) && (
                <PhotoCreate fetchData={fetchData} />
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here..."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
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
                          <th className="border-0">Caption</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada
                          photos.length > 0 ? (
                            //looping data "photos" dengan "map"
                            photos.map((photo, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td className="text-center">
                                  <img
                                    src={photo.image}
                                    width={"90px"}
                                    // height={"20px"}
                                    className="rounded"
                                  />
                                </td>
                                <td>{photo.caption}</td>
                                <td className="text-center">
                                {hasAnyPermission(["photos.delete"]) && (
                                    <button onClick={() => deletePhoto(photo.id)} className="btn btn-danger btn-sm">
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilkan pesan data belum tersedia
                            <tr>
                              <td colSpan={5}>
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
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  )
}
