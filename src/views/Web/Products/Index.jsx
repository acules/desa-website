import React, { useEffect, useState } from 'react'
import LayoutWeb from '../../../layouts/Web'

import Api from "../../../services/Api";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Loading from "../../../components/general/Loading";
import Pagination from '../../../components/general/Pagination';

//import card product
import { CardProduct } from "../../../components/general/CardProduct";

export const WebProductsIndex = () => {
    document.title = "Product - Desa Digital";
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
      });

      const fetchDataProducts = async (pageNumber = 1) => {

        setLoadingProducts(true);    
        const page = pageNumber ? pageNumber : pagination.currentPage;    
        await Api.get(`/api/website/products?page=${page}`).then((response) => {

          setProducts(response.data.data.data);
    
          setPagination(() => ({
            currentPage: response.data.data.current_page,
            perPage: response.data.data.per_page,
            total: response.data.data.total,
          }));
    
          setLoadingProducts(false);
        });
      };
    
      useEffect(() => {
        fetchDataProducts();
      }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-shopping-bag"></i> PRODUK DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingProducts ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((product) => (
              <CardProduct
                key={product.id}
                image={product.image}
                title={product.title}
                slug={product.slug}
                price={product.price}
                phone={product.phone}
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
          onChange={(pageNumber) => fetchDataProducts(pageNumber)}
          position="center"
        />
      </div>
    </LayoutWeb>
  )
}
