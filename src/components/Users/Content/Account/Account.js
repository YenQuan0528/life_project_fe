import React, { useState } from 'react';
import { API_URL_IMG } from '../../../../utils/config';
import { useUserRights } from '../../../../usecontext/UserRights';
import AccountEdit from './Account_Edit';
import Notification from '../../../activity/Notification';
import { SiFoodpanda } from 'react-icons/si';

const Account = () => {
  const { user } = useUserRights();
  const [edit, setEdit] = useState(false);
  const [editOK, setEditOK] = useState(false);

  function clickEdit() {
    setEdit(true);
  }
  const showEditOK = () => {
    setEditOK(true);
    setTimeout(() => {
      setEditOK(false);
    }, 2000);
  };

  return (
    <>
    
      <h3>個人檔案</h3>
      {!edit ? (
        <div className="account">
          <div className="edit " onClick={clickEdit}>
            <p>
              編輯 <i className="fa-solid fa-angle-right"></i>
            </p>
          </div>
          <div className="avata-group">
            <figure className="avata ">
              <img src={`${API_URL_IMG}${user.photo}`} alt="" />
            </figure>
            <p className="userTitle username">{user.name}</p>
          </div>
          <div className="information">
            <div className="userData ">
              <p className="userTitle">性別：</p>
              <p>{user.gender}</p>
            </div>
            <div className="userData ">
              <p className="userTitle">生日：</p>
              <p>{user.birth}</p>
            </div>
            <div className="userData ">
              <p className="userTitle">信箱：</p>
              <p>{user.email}</p>
            </div>
            <div className="userData ">
              <p className="userTitle">電話：</p>
              <p>{user.phone}</p>
            </div>
            <div className="userData ">
              <p className="userTitle">地址：</p>
              <p>{`${user.city}${user.area}`}</p>
            </div>
            <div className="userData datatextarea">
              <p className=" userTitle">簡介：</p>
              <textarea
                className="intro"
                name=""
                id=""
                cols="30"
                rows="10"
                value={user.intro}
                readOnly
              />
            </div>
          </div>
        </div>
      ) : (
        <AccountEdit setEdit={setEdit} showEditOK={showEditOK} />
      )}

      {editOK && (
        <Notification contaninText="資料修改成功" iconSize={2} bottom={30}>
          <SiFoodpanda />
        </Notification>
      )}
    </>
  );
};

export default Account;
