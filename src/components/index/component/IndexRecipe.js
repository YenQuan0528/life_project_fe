import React from 'react';
import Slider from 'react-slick';
import CardSm from '../../public_component/CardSm';
import { API_URL_IMG } from '../../../utils/config';

const IndexRecipe = ({ data = [] }) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
  };

  return (
    <div className="recipeCard">
      <Slider {...settings}>
        {data.map((d) => {
          return (
            <div key={d.id}>
              <CardSm
                img={`${API_URL_IMG}${d.image}`}
                type={d.recipe_category_name}
                name={d.name}
                link={`/recipeDetail?id=${d.id}`}
                className="rounded-1"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default IndexRecipe;
