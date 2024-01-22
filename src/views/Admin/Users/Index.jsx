import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import LayoutAdmin from "../../../layouts/Admin";
import hasAnyPermission from "../../../utils/Permissions";
import Pagination from "../../../components/general/Pagination";

// Untuk Delete Data
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";

export const UserIndex = () => {
    document.title = "Roles - Desa Digital";
    const [users, setUsers] = useState([]);

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

    await Api.get(`/api/admin/users?search=${keywords}&page=${page}`, {
    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response
      setUsers(response.data.data.data);
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });    
  };
  
  useEffect(() => {
    //call method "fetchData"
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  const deleteUser = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/users/${id}`, {
             
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
          
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
        <div class="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
              {hasAnyPermission(["users.create"]) && (
                  <div className="col-md-3 col-12 mb-2">
                    <Link
                      to="/admin/users/create"
                      className="btn btn-md btn-primary border-0 shadow w-100"
                      type="button"
                    >
                      <i className="fa fa-plus-circle"></i> Add New
                    </Link>
                  </div>
                )}
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
                    <table className="table table-bordered table-centered table-nowrap mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                        <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Name</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Roles</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada
                          users.length > 0 ? (
                            //looping data "roles" dengan "map"
                            users.map((usr, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{usr.name}</td>
                                <td>{usr.email}</td>                     
                                <td>
                                  {usr.roles.map((role, index) => (
                                    <span
                                      className="btn btn-warning btn-sm shadow-sm border-0 ms-2 mb-2 fw-normal"
                                      key={index}
                                    >
                                      {role.name}
                                    </span>
                                  ))}
                                </td>
                                <td >
                                {hasAnyPermission(["users.edit"]) && (
                                    <Link
                                      to={`/admin/users/edit/${usr.id}`}
                                      className="btn btn-primary btn-sm me-2"
                                    >
                                      <i className="fa fa-pencil-alt"></i>
                                    </Link>
                                  )}

                                  {hasAnyPermission(["users.delete"]) && (
                                    <button onClick={() => deleteUser(usr.id)} className="btn btn-danger btn-sm">
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
