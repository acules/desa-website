import React, { useEffect, useState } from 'react'
import LayoutWeb from '../../../layouts/Web'
import Api from "../../../services/Api";
import { useParams } from "react-router-dom";

import Loading from "../../../components/general/Loading";

export const WebPagesShow = () => {

  const [page, setPage] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);

  const { slug } = useParams();

  const fetchDetailDataPage = async () => {

    setLoadingPage(true);

    //fetch data
    await Api.get(`/api/website/pages/${slug}`).then((response) => {
      setPage(response.data.data);

      document.title = `${response.data.data.title} - Desa Digital`;

      setLoadingPage(false);
    });
  };

  useEffect(() => {
    fetchDetailDataPage();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        {loadingPage ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-uppercase">
                <i className="fa fa-info-circle"></i> {page.title}
              </h4>
              <hr />
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body post-content">
                  <p dangerouslySetInnerHTML={{ __html: page.content }}></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWeb>
  )
}
