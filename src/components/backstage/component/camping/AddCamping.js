import React, { useState, useEffect } from 'react';
import '../../../../styles/backstage/_addCamping.scss';
import { IconContext } from 'react-icons';
import { IoCloseSharp } from 'react-icons/io5';

import axios from 'axios';
import { API_URL } from '../../../../utils/config';
import AddImgCamping from './AddImgCamping';
import AddImgCamping2 from './AddImgCamping2';
import AddImgCamping3 from './AddImgCamping3';

function AddPage({
  setAddPage,
  loading,
  setLoading,
  setErrMsg,
  setLoginBtn,
  setAdding,
}) {
  const counties = {
    1: '台北市',
    2: '新北市',
    3: '基隆市',
    4: '桃園市',
    5: '新竹市',
    6: '新竹縣',
    7: '苗栗縣',
    8: '台中市',
    9: '彰化縣',
    10: '南投縣',
    11: '雲林縣',
    12: '嘉義市',
    13: '嘉義縣',
    14: '台南市',
    15: '高雄市',
    16: '屏東縣',
    17: '台東縣',
    18: '花蓮縣',
    19: '宜蘭縣',
  };
  const location = Object.keys(counties);

  const [camping, setCamping] = useState({
    title: '',
    place: '',
    lat: '',
    price: '',
    pepCount: '',
    lng: '',
    actStartDate: '',
    actEndDate: '',
    startDate: '',
    endDate: '',
    county: '',
    address: '',
    actInt: '',
    actLodging: '',
    photo: '',
  });

  function handleChange(e) {
    const newCamping = { ...camping, [e.target.name]: e.target.value };

    // console.log(newCamping['county']);
    let nowCounty = newCamping['county'];
    const campingData = {
      ...newCamping,
      countyName: counties[nowCounty],
    };

    console.log(campingData);
    setCamping(campingData);
  }

  function handleAddData() {
    setCamping({
      title: '來見斑比',
      place: '斑比跳跳',
      lat: '24.6450591118119400',
      price: '2400',
      pepCount: '13',
      lng: '120.96588392684627',
      actStartDate: '2022-12-30',
      actEndDate: '2022-12-31',
      startDate: '2022-11-15',
      endDate: '2022-12-15',
      county: '8',
      address: '三灣鄉小北埔27號',
      actInt:
        '用心打造出南洋風情，一秒來到國外。踩踩草皮、點杯飲料、曬曬太陽、吹吹風，忘記一切煩惱吧。黃昏、夜晚時刻，池畔慢慢安靜、氣氛越來越浪漫。30年來的維護自然生態，各式水鳥都把這兒當成是棲息地。',
      actLodging: '實名制入場請攜帶證件。山區午後易有短暫陣雨請攜帶雨具備用。',
      photo: '',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // let response = await axios.post(`${API_URL}/camping/campingAdd`, camping);

      let formData = new FormData();
      formData.append('title', camping.title);
      formData.append('place', camping.place);
      formData.append('lat', camping.lat);
      formData.append('price', camping.price);
      formData.append('pepCount', camping.pepCount);
      formData.append('lng', camping.lng);
      formData.append('actStartDate', camping.actStartDate);
      formData.append('actEndDate', camping.actEndDate);
      formData.append('startDate', camping.startDate);
      formData.append('endDate', camping.endDate);
      formData.append('county', camping.county);
      formData.append('address', camping.address);
      formData.append('actInt', camping.actInt);
      formData.append('actLodging', camping.actLodging);
      formData.append('countyName', camping.countyName);
      formData.append('photo1', camping.photo1);
      formData.append('photo1', camping.photo2);
      formData.append('photo1', camping.photo3);
      // formData.append('photo2', camping.photo2);
      // formData.append('photo3', camping.photo3);
      // idben.chen@gmail.com
      let response = await axios.post(
        `${API_URL}/camping/campingAdd`,
        formData
        // {
        //   withCredentials: true,
        // }
      );

      if (response.data.message === '此活動標題已存在') {
        setErrMsg(true);
        setTimeout(() => {
          setErrMsg(false);
        }, 2000);
      } else {
        setAdding(true);
        setLoginBtn('add');
        setTimeout(() => {
          setLoginBtn(false);
        }, 2000);
        setLoading(!loading);
        setTimeout(() => {
          setAddPage(false);
        }, 500);
      }
      console.log(response.data.message);
    } catch (e) {
      console.error('addCamping', e);
    }
  }

  return (
    <>
      <div className="backstageAddPage">
        <form className="formContainer">
          <IconContext.Provider
            value={{ color: '#817161', size: '2em', className: 'closeIcon' }}
          >
            <IoCloseSharp
              onClick={() => {
                setAddPage(false);
              }}
            />
          </IconContext.Provider>

          <div className="addData" onClick={handleAddData}></div>

          <div className="pageTitle">
            <p>新增活動</p>
          </div>
          <div className="d-flex justify-content-center mt-4">
            {/* title place lat */}
            <div className="d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>活動標題：</label>
                <input
                  className="input"
                  id="title"
                  name="title"
                  type="text"
                  maxLength={20}
                  value={camping.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>活動地點：</label>
                <input
                  className="input"
                  id="place"
                  name="place"
                  type="text"
                  maxLength={15}
                  value={camping.place}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>經度：</label>
                <input
                  className="input"
                  id="lat"
                  name="lat"
                  type="text"
                  maxLength={20}
                  value={camping.lat}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* price pepCount lng */}
            <div className="ms-5 d-flex flex-column align-items-end">
              <div className="mb-4">
                <label>活動價格：</label>
                <input
                  className="input"
                  id="price"
                  name="price"
                  type="number"
                  maxLength={10}
                  value={camping.price}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>活動人數：</label>
                <input
                  className="input"
                  id="pepCount"
                  name="pepCount"
                  type="number"
                  maxLength={3}
                  value={camping.pepCount}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label>緯度：</label>
                <input
                  className="input"
                  id="lng"
                  name="lng"
                  type="text"
                  maxLength={20}
                  value={camping.lng}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* actDate */}
          <div className="mb-4 leftInput dateInput">
            <label>活動日期：</label>
            <input
              className="input"
              id="actStartDate"
              name="actStartDate"
              type="date"
              maxLength={10}
              value={camping.actStartDate}
              onChange={handleChange}
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              id="actEndDate"
              name="actEndDate"
              type="date"
              maxLength={10}
              value={camping.actEndDate}
              onChange={handleChange}
            />
          </div>

          {/* date */}
          <div className="mb-4 leftInput dateInput">
            <label>報名日期：</label>
            <input
              className="input "
              id="startDate"
              name="startDate"
              type="date"
              maxLength={10}
              value={camping.startDate}
              onChange={handleChange}
            />
            <span>&emsp;～&emsp;</span>
            <input
              className="input"
              id="endDate"
              name="endDate"
              type="date"
              maxLength={10}
              value={camping.endDate}
              onChange={handleChange}
            />
          </div>

          {/* address */}
          <div className="mb-4 leftInput">
            <label>活動地址：</label>
            <select
              name="county"
              id="county"
              // value={camping.countyName}
              value={camping.county}
              onChange={handleChange}
            >
              {location.map((v, i) => {
                return (
                  <option
                    key={v}
                    value={v}
                    // selected={camping.county === v ? true : false}
                  >
                    {counties[i + 1]}
                  </option>
                );
              })}
            </select>
            <input
              className="input addressSty"
              id="address"
              name="address"
              type="text"
              maxLength={25}
              value={camping.address}
              onChange={handleChange}
            />
          </div>

          {/* int */}
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">活動介紹：</label>
            <textarea
              className="textContent "
              placeholder="限150字"
              id="actInt"
              name="actInt"
              rows="5"
              cols="68"
              maxLength={150}
              value={camping.actInt}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 d-flex flex-column align-items-start leftInput">
            <label className="mb-2">注意事項：</label>
            <textarea
              className="textContent"
              placeholder="限150字"
              id="actLodging"
              name="actLodging"
              rows="5"
              cols="68"
              maxLength={150}
              value={camping.actLodging}
              onChange={handleChange}
            />
          </div>

          {/* img */}
          <div className="mb-4 leftInput">活動照片：</div>
          <div className="mb-4 d-flex justify-content-center">
            <AddImgCamping camping={camping} setCamping={setCamping} />
            <AddImgCamping2 camping={camping} setCamping={setCamping} />
            <AddImgCamping3 camping={camping} setCamping={setCamping} />
          </div>
          {/* btn */}
          <div className="mt-5 mb-4 text-center">
            <button className="addBtn" type="submit" onClick={handleSubmit}>
              新增
            </button>
            <button
              className="cancelBtn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setAddPage(false);
              }}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPage;
