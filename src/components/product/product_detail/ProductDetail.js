import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../public_component/Header';
import ProductInfo from './ProductInfo';
import Footer from '../../public_component/Footer';
import ProductTab from './ProductTab';
import ProductTabContent from './ProductTabContent';
import Tools from '../Tools';
import { API_URL } from '../../../utils/config';
import axios from 'axios';
const ProductDetail = () => {
  // const [params, setParams] = useParams();
  const [tabNow, setTabNow] = useState(1);
  const [productData, setProductData] = useState([]);
  // const id = searchParams.get('id');
  const { id } = useParams();
  // like data
  const [item, setItem] = useState([]);
  const [fav, setFav] = useState([]);
  const [productLikeId, setProductLikeId] = useState(false);
  const [start, setStart] = useState(false);
  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/products/${id}`);
      setProductData(result.data[0]);
    })();
    (async () => {
      let result = await axios.get(`${API_URL}/products/like`, {
        withCredentials: true,
      });
      setItem(result.data);
      let favNumber = result.data.map((v) => v.product_id);
      setFav(favNumber)
    })();
  }, [id, productLikeId, start]);
  return (
    <>
      <Header />
      <ProductInfo
        data={productData}
        item={item}
        fav={fav}
        setProductLikeId={setProductLikeId}
        productLikeId={productLikeId}
        start={start}
        setStart={setStart}
      />
      <ProductTab tabNow={tabNow} setTabNow={setTabNow} />
      <ProductTabContent
        data={productData}
        tabNow={tabNow}
        setTabNow={setTabNow}
        spec={productData.spec}
      />
      <Tools
        item={item}
        setItem={setItem}
        setProductLikeId={setProductLikeId}
        productLikeId={productLikeId}
      />
      <Footer />
    </>
  );
};

export default ProductDetail;
