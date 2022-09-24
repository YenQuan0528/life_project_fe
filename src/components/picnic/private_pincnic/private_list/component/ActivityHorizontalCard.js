import React from 'react';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityHorizontalCard.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { API_URL_IMG } from '../../../../../utils/config';

function ActivityHorizontalCard({ data }) {
  const progressBar = (item) => {
    if (data.currentJoin === 0) {
      return 0;
    } else {
      let width = (item.currentJoin / item.join_limit) * 100 + '%';
      console.log('progressBar', width);
      return `${width}`;
    }
  };
  return (
    <>
      {data.map((item) => {
        return (
          <div className={classes.activityHorizontalStyle} key={uuidv4()}>
            <div className={classes.activityImg}>
              <img src={`${API_URL_IMG}/picnic/${item.img1}`} alt="/" />
            </div>
            <div className={classes.activityInfo}>
              <div className={`${classes.activityTitle} mb-2`}>
                <div className={classes.title}>{item.picnic_title}</div>
                <IconContext.Provider value={{ className: classes.collectBtn }}>
                  <FaHeart className={classes.collect} />
                </IconContext.Provider>
              </div>
              <div className="d-flex">
                <div className={classes.label}>{item.location}</div>
                <div
                  className={`${classes.label} ${
                    item.activity_state === '即將開團'
                      ? `${classes.coming}`
                      : item.activity_state === '開團中'
                      ? `${classes.ing}`
                      : item.activity_state === '已成團'
                      ? `${classes.found}`
                      : item.activity_state === '開團已截止'
                      ? `${classes.end}`
                      : ''
                  }`}
                >
                  {item.activity_state}
                </div>
              </div>
              <div className={`${classes.content} my-2`}>
                <div>
                  {item.start_date} ~ {item.end_date}
                </div>
              </div>
              <div className={classes.activityText}>
                <div className={classes.activityInt}>活動簡介：</div>
                <div className={classes.intContent}>{item.intr}</div>
              </div>
              <div className={`${classes.intMore} mt-3`}>
                <div>
                  <div className={classes.progressBar}>
                    <div
                      className={classes.bar}
                      style={{ width: progressBar(item) }}
                    ></div>
                  </div>
                  <div className={classes.progressBarText}>
                    <div className={classes.limit}>
                      目前人數：{item.currentJoin}
                    </div>
                    <div className={classes.limit}>
                      活動名額：{item.join_limit}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/activity/picnic/official/${item.id}`}
                  className={classes.more}
                >
                  更多資訊
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ActivityHorizontalCard;
