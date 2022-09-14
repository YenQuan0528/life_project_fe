import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { IconContext } from 'react-icons';
import { GiCampingTent } from 'react-icons/gi';
import {
  IoIosCafe,
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from 'react-icons/io';
import { FaWifi, FaPlug, FaUserFriends, FaPaw, FaHeart } from 'react-icons/fa';
import {
  MdOutlineLocalParking,
  MdAddCircle,
  MdRemoveCircle,
} from 'react-icons/md';

import '../../../styles/camping/camping_detail/_campingDetailPage.scss';
import Slide from './component/slider/Slide';
import ProductSlide from './component/slider/ProductSlide';
import PlaceSlide from './component/slider/PlaceSlide';
import CampingDetailInfo from './component/CampingDetailInfo';
import CampingDetailJoinSlide from './component/CampingDetailJoinSlide';
import CampingDetailAside from './component/CampingDetailAside';
import { useUserRights } from '../../../usecontext/UserRights';
const stateClassName = (state) => {
  switch (state) {
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
const aboutIcons = [
  {
    icon: GiCampingTent,
    iconTitle: '免費裝備露營',
  },
  {
    icon: FaWifi,
    iconTitle: 'WiFi',
  },
  {
    icon: IoIosCafe,
    iconTitle: '販賣部',
  },
  {
    icon: MdOutlineLocalParking,
    iconTitle: '停車場',
  },
  {
    icon: FaUserFriends,
    iconTitle: '交誼廳',
  },
  {
    icon: FaPlug,
    iconTitle: '延長線',
  },
];
const aboutDetailContent = [
  {
    detailTitle: '餐飲需求',
    detailText:
      '預定成功後，將有勤美學團隊聯繫確認。若有餐食特殊需求（例如素食或不吃牛等），敬請主動告知。',
  },
  {
    detailTitle: '住宿基本設備說明',
    detailText:
      '帳篷提供有五米帳篷，內有床墊，寢具，冷氣與基本電力供3C充電使用，帳篷內無獨立盥洗間。',
  },
  {
    detailTitle: '穿著建議',
    detailText:
      '勤美學場域位於開放的大自然環境中，蚊蟲難免，請自備防蚊、防曬、防寒和雨具用品。建議穿著運動鞋、攜帶水壺，隨時補充水分。',
  },
];

const products = [
  { name: 'Moomin多功能電烤盤', img: 'BRUNO_BOE059_BGR_CE_02.jpeg' },
  { name: '隨行果汁機', img: 'CHANCOO_CC5800_GRE_03.webp' },
  { name: '多功能電烤盤-經典款', img: 'BRUNO_BOE021_RD_03.jpeg' },
  { name: '多功能計時鬆餅機', img: 'Giaretti_gtswt26_03.jpg' },
  { name: 'Ball Mason Jar隨鮮瓶果汁機', img: 'OSTER_ BLSTMM_BA4_02.jpeg' },
  { name: '熱壓吐司鬆餅機', img: 'COOKPOWER_MF1115P_02.jpg' },
  { name: '多功能電烤盤-經典款', img: 'BRUNO_ BOE026_CGR_02.webp' },
  { name: 'SOU‧SOU 多功能電烤盤', img: 'BRUNO_BOE021_SOUSOU_02.webp' },
  { name: '單片熱壓三明治機', img: 'Toffy_khs3_p_02.jpg' },
  { name: 'Luxury440', img: 'luxury440_w_003.jpg' },
];

function CampingDetailPage() {
  const [aboutIcon, setAboutIcon] = useState(aboutIcons);
  const [aboutDetail, setAboutDetail] = useState(aboutDetailContent);
  const [scrollDown, setScrollDown] = useState(false);
  const [product, setProduct] = useState(products);
  const productLength = product.length;
  // console.log(productLength);

  const [detailData, setDetailData] = useState([]);
  const [joinCount, setJoinCount] = useState([]);
  // console.log(joinLength);

  const [productSlider, setProductSlider] = useState(0);
  const [placeSlider, setPlaceSlider] = useState(0);
  const [joinSlider, setJoinSlider] = useState(0);

  const { campingId } = useParams();
  const { user, setUser } = useUserRights();
  const [userJoin, setUserJoin] = useState([]);
  const [userCollected, setUserCollected] = useState([]);

  // console.log(campingId);

  useEffect(() => {
    let getCampingDetailData = async () => {
      let response = await axios.get(`${API_URL}/camping/${campingId}`);
      // console.log(response.data.result);
      setDetailData(response.data.result);
      setJoinCount(response.data.joinResult);
    };
    getCampingDetailData();
  }, []);

  useEffect(() => {
    let getAllJoin = async () => {
      let response = await axios.get(`${API_URL}/camping/campingHadJoin`, {
        withCredentials: true,
      });
      // console.log('getAll', response.data);
      let hadJoin = response.data.map((v) => v.activity_id);
      // console.log(hadJoin)
      setUserJoin(hadJoin);
    };
    if (user) {
      getAllJoin();
    }

    let getAllCollect = async () => {
      let response = await axios.get(`${API_URL}/camping/campingCollected`, {
        withCredentials: true,
      });
      // console.log('getAll', response.data);
      let collected = response.data.map((v) => v.activity_id);
      setUserCollected(collected);
    };
    if (user) {
      getAllCollect();
    }
  }, [user]);

  // sliderAll right
  const sliderAllRight = (cardWidth, cardLength, displayTotal) => {
    let nowSlide = 0;
    // 移動區塊
    let cardWidthTtl = cardWidth * displayTotal;
    // 移動次數
    let moveCount = Math.ceil(cardLength / displayTotal);
    // limit
    let moveWidth = -cardWidthTtl * moveCount + cardWidthTtl;

    let slider = joinSlider - cardWidthTtl;
    if (moveWidth > slider) return nowSlide;

    setJoinSlider(slider);
    nowSlide = slider;
  };

  // sliderAll left
  const sliderAllLeft = (cardWidth, displayTotal) => {
    let nowSlide = 0;
    // 移動區塊 925
    let cardWidthTtl = cardWidth * displayTotal;

    let slider = joinSlider + cardWidthTtl;
    if (slider > 0) return nowSlide;

    setJoinSlider(slider);
    nowSlide = slider;
  };

  // sticky
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let scrollNow = window.scrollY;
    setScrollDown(scrollNow > scrollY);
    scrollY = scrollNow;
  });

  let joinLength = joinCount.length;

  return (
    <>
      {detailData.map((v) => {
        function dataReplace(date) {
          return date.replace(/-/g, '/');
        }

        const handleAddJoin = async (campingId) => {
          // console.log(campingId);
          let response = await axios.post(
            `${API_URL}/camping/campingJoin/${campingId}`,
            {},
            { withCredentials: true }
          );
          let hadJoin = response.data.getJoin.map((v) => v.activity_id);
          setUserJoin(hadJoin);
          console.log('add', response.data);
          //TODO: 改掉alert
          alert('已加入活動');
        };

        const handleDelJoin = async (campingId) => {
          // console.log(campingId);
          let response = await axios.delete(
            `${API_URL}/camping/campingJoin/${campingId}`,
            { withCredentials: true }
          );
          let hadJoin = response.data.getJoin.map((v) => v.activity_id);
          setUserJoin(hadJoin);
          console.log('del', response.data);
          //TODO: 改掉alert
          alert('已取消活動');
        };

        const handleAddCollect = async (campingId) => {
          // console.log(campingId);
          let response = await axios.post(
            `${API_URL}/camping/campingCollect/${campingId}`,
            {},
            { withCredentials: true }
          );
          console.log('add', response.data);
          let collected = response.data.getCamping.map((v) => v.activity_id);
          setUserCollected(collected);
          // TODO: 修改alert
          alert('已加入收藏');
        };

        const handleDelCollect = async (campingId) => {
          // console.log(campingId);
          let response = await axios.delete(
            `${API_URL}/camping/campingCollect/${campingId}`,
            { withCredentials: true }
          );
          console.log('del', response.data);
          let collected = response.data.getCamping.map((v) => v.activity_id);
          setUserCollected(collected);
          // TODO: 修改alert
          alert('已取消收藏');
        };

        return (
          <main className="CampingDetailPage" key={v.id}>
            <div className="main">
              {/* breadCrumb */}
              <p className="breadCrumb py-3">LIFE --- 活動專區 </p>
              <div className="row">
                {/* 左側 */}
                <div className="col-8" style={{ backgroundColor: 'white' }}>
                  <div className="mainTitle">
                    <div className="title">{v.title}</div>

                    {/* <button
                            className="hadJoinBtn"
                            onClick={() => {
                              handleDelJoin(v.id);
                            }}
                          >
                            取消活動
                          </button> */}
                    {/* <button
                            className="joinBtn"
                            onClick={() => {
                              handleAddJoin(v.id);
                            }}
                          >
                            加入活動
                          </button> */}
                    <div className="d-flex align-items-center justify-content-center">
                      {/* collect */}
                      {user ? (
                        userCollected.includes(v.id) ? (
                          <IconContext.Provider
                            value={{
                              className: 'collectedBtn',
                            }}
                          >
                            <FaHeart
                              onClick={() => {
                                handleDelCollect(v.id);
                              }}
                            />
                          </IconContext.Provider>
                        ) : (
                          <IconContext.Provider
                            value={{
                              className: 'collectBtn',
                            }}
                          >
                            <FaHeart
                              onClick={() => {
                                handleAddCollect(v.id);
                              }}
                            />
                          </IconContext.Provider>
                        )
                      ) : (
                        <IconContext.Provider
                          value={{
                            className: 'collectBtn',
                          }}
                        >
                          <FaHeart
                            // className={classes.collect}
                            onClick={() => {
                              // TODO: 改掉alert
                              alert('請先登入會員');
                            }}
                          />
                        </IconContext.Provider>
                      )}

                      {/* join */}
                      {v.state !== '開團中' ? (
                        ''
                      ) : user ? (
                        userJoin.includes(v.id) ? (
                          <IconContext.Provider
                            value={{
                              color: '#817161',
                              size: '1.9rem',
                              className: 'joinIcon',
                            }}
                          >
                            <MdRemoveCircle
                              onClick={() => {
                                handleDelJoin(v.id);
                              }}
                            />
                          </IconContext.Provider>
                        ) : (
                          <IconContext.Provider
                            value={{
                              color: '#F2AC33',
                              size: '1.9rem',
                              className: 'joinIcon',
                            }}
                          >
                            <MdAddCircle
                              onClick={() => {
                                handleAddJoin(v.id);
                              }}
                            />
                          </IconContext.Provider>
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between ">
                    {/* 簡介 */}
                    <div className="titleContainer">
                      <IconContext.Provider
                        value={{ color: '#817161', size: '1.2em' }}
                      >
                        <div className="titleContent">
                          <FaPaw />
                          <div className="mx-2">日期：</div>
                          <div className="titleText">
                            {dataReplace(v.activity_start_date)} ~
                            {dataReplace(v.activity_end_date)}
                          </div>
                        </div>
                        <div className="titleContent">
                          <FaPaw />
                          <div className="mx-2">地點：</div>
                          <div className="titleText">{v.place}</div>
                        </div>
                        <div className="titleContent">
                          <FaPaw />
                          <div className="mx-2">地址：</div>
                          <div className="titleText">{v.address}</div>
                        </div>
                        <div className="titleContent">
                          <FaPaw />
                          <div className="mx-2">報名期間：</div>
                          <div className="titleText">
                            {dataReplace(v.start_date)} ~
                            {dataReplace(v.end_date)}
                          </div>
                        </div>
                        <div className="titleContent">
                          <FaPaw />
                          <div className="mx-2">報名費用：</div>
                          <div className="titleText">NT${v.price}</div>
                        </div>
                        <div className="titleContent">
                          <FaPaw />
                          <div className="mx-2">活動名額：</div>
                          <div className="titleText">{v.join_limit}</div>
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* weather */}
                    <div
                      style={{
                        width: '250px',
                        height: '280px',
                        border: '1px solid lightBlue',
                        margin: '25px',
                      }}
                    >
                      weather
                    </div>
                  </div>
                  {/* title img */}
                  <div className="ContainerImg">
                    <div className="titleImg">
                      <img
                        src={`/img/camping/activity_camping_img/${v.img1}`}
                        alt="/"
                      />
                    </div>
                    <div className="titleImg">
                      <img
                        src={`/img/camping/activity_camping_img/${v.img2}`}
                        alt="/"
                      />
                    </div>
                    <div className="titleImg">
                      <img
                        src={`/img/camping/activity_camping_img/${v.img3}`}
                        alt="/"
                      />
                    </div>
                  </div>

                  {/* about */}
                  <div className="aboutInt">相關資訊</div>
                  <CampingDetailInfo
                    aboutDetail={aboutDetail}
                    aboutIcon={aboutIcon}
                    v={v}
                  />

                  {/* join */}
                  <IconContext.Provider
                    value={{ color: '#817161', size: '2rem' }}
                  >
                    {detailData.map((v) => {
                      return (
                        <div className="joinUserTitle" key={v.id}>
                          參加者（{v.pepcount}/{v.join_limit}）
                        </div>
                      );
                    })}

                    <div className="joinSlide">
                      {joinLength < 6 ? (
                        ''
                      ) : (
                        <>
                          <div className="sliderLeft">
                            <IoIosArrowDropleftCircle
                              onClick={() => {
                                sliderAllLeft(185, 5);
                              }}
                            />
                          </div>
                          <div className="sliderRight">
                            <IoIosArrowDroprightCircle
                              onClick={() => {
                                sliderAllRight(185, joinLength, 5);
                              }}
                            />
                          </div>
                        </>
                      )}

                      <div className="joinContainer">
                        <div className="slide">
                          {joinLength !== 0 ? (
                            joinCount.map((v) => {
                              return (
                                <CampingDetailJoinSlide
                                  key={v.id}
                                  joinSlider={joinSlider}
                                  v={v}
                                />
                              );
                            })
                          ) : (
                            <div
                              className="ms-4 mt-4"
                              style={{ fontSize: '16px', color: '#1F9998' }}
                            >
                              暫無會員加入
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </IconContext.Provider>
                </div>

                {/* 右側 aside */}
                <IconContext.Provider value={{ color: '#444', size: '1.2rem' }}>
                  <div className="col-4 ">
                    {detailData.map((v) => {
                      function joinPep() {
                        return v.join_limit - v.pepcount;
                      }

                      return (
                        <CampingDetailAside
                          key={v.id}
                          scrollDown={scrollDown}
                          v={v}
                          stateClassName={stateClassName}
                          dataReplace={dataReplace}
                          joinPep={joinPep}
                          user={user}
                          userJoin={userJoin}
                          handleDelJoin={handleDelJoin}
                          handleAddJoin={handleAddJoin}
                        />
                      );
                    })}
                  </div>
                </IconContext.Provider>
              </div>

              {/* 商品推薦 */}
              <IconContext.Provider value={{ color: '#444', size: '2.5rem' }}>
                <div className="productTitle">輕鬆享受露營，猜你會需要...</div>
                <Slide
                  contentLength={productLength}
                  maxWidth={1260}
                  Slider={productSlider}
                  setSlider={setProductSlider}
                  cardWidth={210}
                  displayContainer={6}
                >
                  <ProductSlide
                    product={product}
                    productSlider={productSlider}
                  />
                </Slide>

                {/* 地點推薦 */}
                <div className="placeTitle">
                  喜歡露營的你，附近的活動還有...
                </div>
                <Slide
                  contentLength={productLength}
                  maxWidth={1375}
                  Slider={placeSlider}
                  setSlider={setPlaceSlider}
                  cardWidth={275}
                  displayContainer={5}
                >
                  <PlaceSlide product={product} placeSlider={placeSlider} />
                </Slide>
              </IconContext.Provider>
            </div>
          </main>
        );
      })}
    </>
  );
}

export default CampingDetailPage;
