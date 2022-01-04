import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import '../../styles/auth.css';

export default function Trademark() {
  const [importantFunctionality, setImportantFunctionality] = useState(false);

  const onClickTrademark = () => {
    if (!importantFunctionality && Math.random() > 0.8) {
      setImportantFunctionality(true);
    } else setImportantFunctionality(false);
  };
  return (
    <div className="auth-trademark">
      <div className="auth-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 391.17 434.21">
          <g id="圖層_2" data-name="圖層 2" transform="translate(0.007 0.008)">
            <g id="圖層_1" data-name="圖層 1">
              <path
                id="Path_1"
                data-name="Path 1"
                d="M89.85,309.69C83.1,197.46,148.23,57,176.74,50.39c12.63-2.92,26.8,42.83,30.35,66.4"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.01"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M172.14,96.1a66.89,66.89,0,0,0-13.29,24.68"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.01"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M292,94.28c-8.71,9-15.62,25-15.62,25"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.01"
              />
              <path
                id="Path_4"
                data-name="Path 4"
                d="M304.39,195.15c11.46-18.49,34.53-7.56,40.5-4.3.64.35,1.43-1.21,1.38-1.95-1.22-21.4-21.27-31.31-27.38-59.6-4-18.35,12.73-72.27.84-77.59-30.38-13.59-70,55.75-70,55.75a70.13,70.13,0,0,0-19.35-.51"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.01"
              />
              <path
                id="Path_5"
                data-name="Path 5"
                d="M213.14,207.31s14.18-27.39,48.86-2.92"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="17.01"
              />
              <path
                id="Path_6"
                data-name="Path 6"
                d="M380.82,267.87s11.49,51.24-24.43,35.52a5.08,5.08,0,0,0-5,.44c-11.14,8-60.44,37-124.65-17.8,0,0,1.85,30.21,56.94,65.62,32.12,20.65,38,56.11,53.4,67.38,22.58,16.48,45.57.59,41.61-28-2.4-17.35-11.35-37.75-22.84-54"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.01"
              />
              <path
                id="Path_7"
                data-name="Path 7"
                d="M320.92,342.45c11.83,12.41,18.13,22.42,23.67,35.28"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.01"
              />
              <path
                id="Path_8"
                data-name="Path 8"
                d="M333.18,230.52c-38.88,11.39-3.47,35.94,10.1,44.18a7.56,7.56,0,0,0,9-.82c10-8.89,27.88-31.63,12.57-40.57C356.75,228.61,342.25,227.86,333.18,230.52Z"
                fill="#000000"
              />
              <path
                id="Path_9"
                data-name="Path 9"
                d="M273,18.16A202.37,202.37,0,0,0,209.78,8.6h0C97.78,9.49,7.71,101,8.6,213h0C9.49,325,101,415.06,213,414.17h0a202.219,202.219,0,0,0,60-9.55"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="17.2"
              />
            </g>
          </g>
        </svg>
      </div>
      <div>
        <span
          className="auth-trademark-main"
          style={{
            fontSize: '2.4rem',
            lineHeight: 57 / 48,
            fontFamily: 'Azonix',
          }}
        >
          {importantFunctionality ? 'RDOGS 6.0' : 'PDOGS 6.0'}
        </span>
        <Typography className="auth-trademark-caption" variant="body1" onClick={onClickTrademark}>
          Department of Information Management,
          <br />
          National Taiwan University
          <br />
          2021 All rights reserved.
        </Typography>
      </div>
    </div>
  );
}
