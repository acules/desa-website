import React, { useEffect, useState } from 'react'
import LayoutWeb from '../../../layouts/Web'
import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import { CardPage } from '../../../components/general/CardPage';

export const WebPagesIndex = () => {
  document.title = "Tentang Desa - Desa Digital";

  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  const fetchDataPages = async () => {
    setLoadingPages(true);

    // Fetch Data
    await Api.get("/api/website/pages").then((response) => {
      setPages(response.data.data);
        console.log(response);
      setLoadingPages(false);
    });
  };

  useEffect(() => {
    //call method "fetchDataPages"
    fetchDataPages();
  }, []);

  return (
    <LayoutWeb>
        <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-info-circle"></i> TENTANG DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPages ? (
            <Loading />
          ) : pages.length > 0 ? (
            pages.map((page) => (
              <CardPage key={page.id} title={page.title} slug={page.slug} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  )
}
