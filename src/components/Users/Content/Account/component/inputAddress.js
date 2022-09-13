import React, { useState } from 'react';
import jsondata from '../CityCountyData.json';

const InputAddress = () => {
  const [cityName, setCityName] = useState('');

  const [areaName, setAreaName] = useState('');

  const city = jsondata.filter((v, i) => {
    return v.CityName === cityName;
  });

  return (
    <div className="addressGroup d-flex">
      <label className="userData" htmlFor="address">
        地址：
      </label>
      <select
        value={cityName}
        onChange={(e) => {
          setCityName(e.target.value);
        }}
      >
        <option value="">請選擇</option>
        {jsondata.map((v, i) => {
          return (
            <option key={i} value={v.CityName}>
              {v.CityName}
            </option>
          );
        })}
      </select>
      <select
        value={areaName}
        onChange={(e) => {
          setAreaName(e.target.value);
        }}
      >
        <option value="">請選擇</option>;
        {city.map((v, i) => {
          <option key={i}></option>;
          return v.AreaList.map((v2, i2) => {
            return (
              <option key={i2} value={v2.AreaName}>
                {v2.AreaName}
              </option>
            );
          });
        })}
      </select>
    </div>
  );
};

export default InputAddress;

// const addressGroup = css`
//   line-height: 3rem;
//   select {
//     border-radius: 10px;
//     margin: 0 5px;
//   }
//   input {
//     margin-left: 4.8rem;
//   }
// `;

// const input = css`
//   border-radius: 10px;
//   height: 20px;
//   padding: 15px 0px 15px 5px;
//   width: 300px;
// `;
