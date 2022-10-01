import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import MapAside from '../../map/component/MapAside';
import { usePicnicCart } from '../../../orderContetxt/usePicnicCart';
import classes from '../../../styles/moduleCss/picnic_offical_detail/picnicOfficalDetail.module.scss';

function AsideMessageFix({
  data,
  handleAddJoin,
  handleDeleteJoin,
  userJoin,
  user,
  setIsgo,
  setLoginBtn,
}) {
  const [scrollDown, setScrollDown] = useState(false);
  const picnicCart = usePicnicCart([]);

  const stateColor = (state) => {
    switch (state) {
      case '即將開團':
        return '#817161';
      case '開團中':
        return '#F2AC33';
      case '已成團':
        return '#1F9998';
      case '開團已截止':
        return '#B9BDC5';
      default:
        return '#817161';
    }
  };
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  function dataReplace(date) {
    return date.replace(/-/g, '/');
  }

  function lastCount(limit, currentJoin) {
    let result = limit - currentJoin;
    return result;
  }
  // console.log(data);
  return (
    <>
      <div
        className={`${classes.asideMessage} ${classes.pcView} transition`}
        style={{ top: scrollDown ? '3px' : '70px' }}
      >
        {data.map((item) => {
          return (
            <div key={uuidv4()}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p>{item.picnic_title}</p>
                <div
                  className={classes.stateBtn}
                  style={{
                    backgroundColor: `${stateColor(item.activity_state)}`,
                  }}
                >
                  {item.activity_state}
                </div>
              </div>
              <div className="mb-2">
                <FaCalendarAlt className={classes.calendarIcon} />
                {dataReplace(item.activity_date)}
              </div>
              <div className="mb-2">
                <FaMapMarkerAlt className={classes.mapMarkerIcon} />
                台北市{item.location}
              </div>
              <div className="mb-3">
                <BsPersonFill className={classes.personIcon} />
                距離結團上限, 尚可報名：
                {lastCount(item.join_limit, item.currentJoin)}人
              </div>
              <div className={`${classes.map} mb-3`}>
                <MapAside />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className={classes.price}>NT${item.price}</div>
                {item.activity_state === '開團已截止' ? (
                  <button
                    className={classes.joinInBtn}
                    style={{
                      background: '#B9BDC5',
                      color: '#444',
                    }}
                    disabled
                  >
                    開團已截止
                  </button>
                ) : item.activity_state === '即將開團' ? (
                  <button
                    className={classes.joinInBtn}
                    style={{
                      background: '#B9BDC5',
                      color: '#444',
                    }}
                    disabled
                  >
                    即將開團
                  </button>
                ) : user ? (
                  userJoin.includes(item.id) ? (
                    <button
                      className={classes.joinInBtn}
                      style={{
                        background: '#B9BDC5',
                        color: '#444',
                      }}
                      onClick={() => {
                        setIsgo(true);
                        handleDeleteJoin(item.id);
                        picnicCart.removeItem(item.id);
                      }}
                    >
                      取消活動
                    </button>
                  ) : (
                    <button
                      className={classes.joinInBtn}
                      onClick={() => {
                        setIsgo(true);
                        handleAddJoin(data[0].id);
                        picnicCart.addItem({
                          id: item.id,
                          quantity: 1,
                          name: item.picnic_title,
                          price: item.price,
                          ischecked: false,
                          img: item.img1,
                        });
                      }}
                    >
                      加入活動
                    </button>
                  )
                ) : (
                  <button
                    className={classes.joinInBtn}
                    onClick={() => {
                      setLoginBtn(true);
                    }}
                  >
                    加入活動
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RWD */}
      <div
        className={`${classes.asideMessage} ${classes.mbView} transition`}
        // style={{ top: scrollDown ? '3px' : '70px' }}
      >
        {data.map((item) => {
          return (
            <div key={uuidv4()}>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p>{item.picnic_title}</p>
                  <div
                    className={classes.stateBtn}
                    style={{
                      backgroundColor: `${stateColor(item.activity_state)}`,
                    }}
                  >
                    {item.activity_state}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <div className={classes.price}>NT${item.price}</div>
                  {item.activity_state === '開團已截止' ? (
                    <button
                      className={classes.joinInBtn}
                      style={{
                        background: '#B9BDC5',
                        color: '#444',
                      }}
                      disabled
                    >
                      開團已截止
                    </button>
                  ) : item.activity_state === '即將開團' ? (
                    <button
                      className={classes.joinInBtn}
                      style={{
                        background: '#B9BDC5',
                        color: '#444',
                      }}
                      disabled
                    >
                      即將開團
                    </button>
                  ) : user ? (
                    userJoin.includes(item.id) ? (
                      <button
                        className={classes.joinInBtn}
                        style={{
                          background: '#B9BDC5',
                          color: '#444',
                        }}
                        onClick={() => {
                          setIsgo(true);
                          handleDeleteJoin(item.id);
                          picnicCart.removeItem(item.id);
                        }}
                      >
                        取消活動
                      </button>
                    ) : (
                      <button
                        className={classes.joinInBtn}
                        onClick={() => {
                          setIsgo(true);
                          handleAddJoin(data[0].id);
                          picnicCart.addItem({
                            id: item.id,
                            quantity: 1,
                            name: item.picnic_title,
                            price: item.price,
                            ischecked: false,
                            item: item.img1,
                          });
                        }}
                      >
                        加入活動
                      </button>
                    )
                  ) : (
                    <button
                      className={classes.joinInBtn}
                      onClick={() => {
                        setLoginBtn(true);
                      }}
                    >
                      加入活動
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AsideMessageFix;
