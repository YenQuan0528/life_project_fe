/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import RecipeIntroMaterial from './RecipeIntroMaterial';
import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import { Link } from 'react-router-dom';
import { API_URL_IMG } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import BreadCrumb from '../../../public_component/BreadCrumb';

const focusClrY = '#F2AC33';
const subClrBrown = '#817161';
// title
const recipeName = css`
  font-size: 40px;
  @media (max-width: 1000px) {
    font-size: 32px;
  }
`;
const tag = css`
  background: ${subClrBrown};
  color: #fff !important;
  padding: 0 0.5rem;
  font-size: 0.5rem;
  border-radius: 50px;
  user-select: none;
`;
// container
const container = css`
  display: flex;
  gap: 1rem;
  color: #444;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
// Left Section
const introContainer = css`
  flex: 1 0 600px;
  @media (max-width: 1000px) {
    flex: 1 1 auto;
  }
`;

const recipeContainer = css`
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
`;
// Right Section >> author
const infoContainer = css`
  flex: 1 1 auto;
  width: 500px;
  @media (max-width: 1000px) {
    width: auto;
  }
`;
const authorDetail = css`
  border: 1px solid ${focusClrY};
  border-radius: 3px;
  max-width: 500px;
`;
const avatarContainer = css`
  max-width: 80px;
  border-radius: 50%;
  overflow: hidden;
`;
const btn = css`
  color: ${focusClrY};
  border: 1px solid ${focusClrY};
  border-radius: 3px;
  transition: 0.15s;
  background: #fff;
  &:hover {
    color: #fff;
    background: ${focusClrY};
  }
`;

const recipeCollectBtn = css`
  width: 100%;
  padding: 0.5rem 0;
`;

// Right Section >> material
const materialContainer = css`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${subClrBrown};
  padding-bottom: 1rem;
  margin: 0 auto;
`;
const materialTitle = css`
  background: ${subClrBrown};
  color: #fff;
  padding: 0.5rem 0;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
  &::after {
    content: '';
    border: 5px solid ${subClrBrown};
    transform: translateY(200%) rotate(45deg);
    position: absolute;
  }
`;
const materialMain = css`
  display: flex;
  flex-wrap: wrap;
`;

const RecipeIntro = ({ data, id, setRecipeData, setLoginBtn, setToast }) => {
  // get recipe material
  const [material, setMaterial] = useState([]);
  const [like, setLike] = useState(false);

  const { user } = useUserRights();

  useEffect(() => {
    (async () => {
      let result = await axios.get(`${API_URL}/recipes/${id}/material`);
      setMaterial(result.data);
      let likeResult = await axios.get(`${API_URL}/recipes/like`, {
        withCredentials: true,
      });
      setLike(likeResult.data.data.includes(id));
    })();
  }, [id]);

  // recipe like
  const likeHandler = async () => {
    if (!user) return setLoginBtn(true);
    if (!like) {
      await axios.post(
        `${API_URL}/recipes/${id}/like`,
        {},
        { withCredentials: true }
      );
      setLike(true);
      setToast(1);
    } else {
      await axios.delete(`${API_URL}/recipes/${id}/like`, {
        withCredentials: true,
      });
      setLike(false);
      setToast(2);
    }
    setTimeout(() => {
      setToast(0);
    }, 2000);
    // recipe detail
    let result = await axios.get(`${API_URL}/recipes/${id}`);
    setRecipeData(result.data[0]);
  };

  return (
    <>
      <BreadCrumb last={data.name} />
      {/* Title */}
      <div
        css={recipeName}
        className="d-flex align-items-center flex-wrap mb-2"
      >
        <div>{data.name}</div>
        <div className="flexCenter">
          <Link
            to={`/recipes?recipeCate=${data.category}`}
            css={tag}
            className="mx-1"
          >
            {data.recipe_category_name}
          </Link>
          <Link to={`/recipes?productCate=${data.product_category}`} css={tag}>
            {data.product_category_name}
          </Link>
        </div>
      </div>
      <div css={container}>
        {/* left side */}
        <div className="d-flex flex-column" css={introContainer}>
          {/* recipe Image */}
          <figure css={recipeContainer}>
            <img
              src={`${API_URL_IMG}${data.image}`}
              alt=""
              className="objectContain"
            />
          </figure>
          {/* recipe content */}
          <p className="fs-6">{data.content}</p>
        </div>
        {/* right side */}
        <div className="" css={infoContainer}>
          {/* author detail */}
          <div css={authorDetail} className="p-3 mb-3 mx-auto">
            <div
              className="d-flex justify-content-between mb-3 pb-3 align-items-center"
              css={css`
                border-bottom: 1px solid ${focusClrY};
              `}
            >
              {/* author detail left */}
              <div className="d-flex align-items-center gap-3">
                <figure css={avatarContainer} className="m-0 p-2">
                  <img
                    src={API_URL_IMG + data.user_photo}
                    alt=""
                    className="objectContain"
                  />
                </figure>
                <div className="d-flex flex-column">
                  <span>作者：{data.user_name}</span>
                  <span>
                    {data.likes} 收藏 {data.comments} 留言
                  </span>
                </div>
              </div>
              {/* author detail right */}
              {/* <button css={btn} className="py-2 px-3">
                追蹤
              </button> */}
            </div>
            <button css={[recipeCollectBtn, btn]} onClick={likeHandler}>
              {like ? '取消收藏' : '收藏食譜'}
            </button>
          </div>
          {/* material section */}
          <div css={materialContainer}>
            <div className="flexCenter" css={materialTitle}>
              食材
            </div>
            <div className="w-100 px-3" css={materialMain}>
              {material.map((m) => {
                return (
                  <RecipeIntroMaterial
                    name={m.name}
                    quantity={m.quantity}
                    key={m.id}
                  ></RecipeIntroMaterial>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeIntro;
