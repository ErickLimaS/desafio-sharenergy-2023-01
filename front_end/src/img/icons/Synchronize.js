import * as React from "react";
const SvgSynchronize = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
    <path
      style={{
        fill: "none",
        stroke: "#000",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeMiterlimit: 10,
      }}
      d="M6.294 21.706C8.306 24.313 11.452 26 15 26c5.589 0 10.193-4.171 10.896-9.568M23.706 8.294C21.694 5.687 18.548 4 15 4 9.411 4 4.807 8.171 4.104 13.568"
    />
    <path d="m26 11-6-1 5-5zM3 19l6 1-5 5z" />
  </svg>
);
export default SvgSynchronize;
