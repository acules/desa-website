import React, { useEffect, useState } from "react";
import LayoutWeb from '../../../layouts/Web'

import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import Pagination from "../../../components/general/pagination";
import { CardPhoto } from "../../../components/general/CardPhoto";

export const WebPhotosIndex = () => {
    document.title = "Photos - Desa Digital";

    //init state photos
  const [photos, setPhotos] = useState([]);
  const [loadingPhoto, setLoadingPhotos] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const fetchDataPhotos = async (pageNumber = 1) => {

    setLoadingPhotos(true);
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/website/photos?page=${page}`).then((response) => {
      //assign response to state "photos"
      setPhotos(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      setLoadingPhotos(false);
    });
  };

  useEffect(() => {
    fetchDataPhotos();
  }, []);

  return (
    <LayoutWeb><div className="container mt-4 mb-3">
    <div classname="row">
      <div className="col-md-12">
        <h5 className="text-uppercase">
          <i className="fa fa-images"></i> GALERI FOTO
        </h5>
        <hr />
      </div>
    </div>
    <div className="row mt-4">
      {loadingPhoto ? (
        <Loading />
      ) : photos.length > 0 ? (
        photos.map((photo) => (
          <CardPhoto
            key={photo.id}
            image={photo.image}
            caption={photo.caption}
          />
        ))
      ) : (
        <AlertDataEmpty />
      )}
    </div>
    <Pagination
      currentPage={pagination.currentPage}
      perPage={pagination.perPage}
      total={pagination.total}
      onChange={(pageNumber) => fetchDataPhotos(pageNumber)}
      position="center"
    />
  </div></LayoutWeb>
  )
}
