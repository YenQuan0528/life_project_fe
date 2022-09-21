import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';


const ProductListSlider = ({ now, total, data }) => {
  const [recommendArr, setRecommendArr] = useState([]);
  const { category } = data;
  console.log(category);
  useEffect(() => {
    (async () => {
      let result = await axios.get(
        `${API_URL}/products/recommend?category=${category}`
      );
      console.log(result.data);
      setRecommendArr(result.data);
    })();
  }, [category]);

  return (
    <>
      {recommendArr.map((v, i) => {
        const { id, name, img, color, price } = v;
        return (
          <>
            <Link to={`/products/${id}`} >
              <figure
                style={{
                  transform: `translateX(${now}px)`,
                }}
                key={i}
              >
                <div
                  style={{
                    minHeight: '345px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img src={`/img/product/product_img/${img}`} alt="" />
                </div>
                <p>
                  <span className="me-2">BRUNO</span>
                  {name}
                  <span className="ms-2">({color})</span>
                </p>
                <p>
                  NT${' '}
                  {JSON.stringify(price).replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ','
                  )}
                </p>
              </figure>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default ProductListSlider;
