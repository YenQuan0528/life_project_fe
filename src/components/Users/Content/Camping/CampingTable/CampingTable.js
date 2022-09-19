import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CampingTable = ({ data }) => {
  const title = ['活動名稱', '活動時間', '活動地點', '活動狀態', '查看'];

  return (
    <div className="activity-table">
      <table className="table table-sm mt-5">
        <thead>
          <tr>
            {title.map((v, i) => {
              return <th key={i}>{v}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.title}</td>
                <td>{`${v.activity_start_date}~${v.activity_end_date}`}</td>
                <td>{v.place}</td>
                <td>{v.state}</td>
                <td>
                  <Link to={`/activity/camping/${v.id}`}>
                    <button>活動詳情</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CampingTable;