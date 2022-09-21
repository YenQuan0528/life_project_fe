import React from 'react';
import { useState } from 'react';
import classes from '../../../../../styles/moduleCss/picnic_main/ActivityDateFilter.module.scss';

function ActivityDateFilter({
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  maxDateValue,
  setMaxDateValue,
  minDateValue,
  setMinDateValue,
  setPage,
  setDateRemind,
  dateRemind,
}) {
  return (
    <>
      <div className={classes.activityDate}>
        <p className={`${classes.dateText}`}>活動日期</p>
        <div
          className={`${classes.dateInputGrop} d-flex ms-auto ms-sm-0 mt-sm-3`}
        >
          <input
            type="date"
            onChange={(e) => {
              let newDate = e.target.value;
              setMinDateValue(newDate);
              // console.log(newDate);
            }}
          />
          <div className="mx-2">-</div>
          <input
            type="date"
            onChange={(e) => {
              let newDate = e.target.value;
              setMaxDateValue(newDate);
              // console.log(newDate);
            }}
          />
        </div>
        <div className="dateBtn">
          <div className="mt-auto ms-3" style={{ fontSize: '14px' }}>
            {dateRemind}
          </div>
          <button
            onClick={() => {
              if (minDateValue > maxDateValue) {
                setDateRemind('開始日期不得大於結束日期');
              } else if (minDateValue !== '' && maxDateValue !== '') {
                setMinDate(minDateValue);
                setMaxDate(maxDateValue);
                setPage(1);
                setDateRemind('');
              } else {
                setMinDate('');
                setMaxDate('');
                setPage(1);
                setDateRemind('');
              }
            }}
          >
            篩選
          </button>
        </div>
      </div>
    </>
  );
}

export default ActivityDateFilter;
