import * as React from "react";
const SvgCorrect = (props) => (
  <svg
    style={{
      enableBackground: "new 0 0 612 792",
    }}
    viewBox="0 0 612 792"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path id="correct_svg__a" d="M50 140h512v512H50z" />
    </defs>
    <clipPath id="correct_svg__b">
      <use
        style={{
          overflow: "visible",
        }}
        xlinkHref="#correct_svg__a"
      />
    </clipPath>
    <path
      d="M306 629.5c128.8 0 233.5-104.7 233.5-233.5S434.8 162.5 306 162.5 72.5 267.2 72.5 396 177.2 629.5 306 629.5z"
      style={{
        clipPath: "url(#correct_svg__b)",
        fill: "none",
        stroke: "#41ad49",
        strokeWidth: 45,
      }}
    />
    <path
      style={{
        fill: "#41ad49",
      }}
      d="M421.4 271 241.9 450.5l-67-67-52.9 52.9 119.9 119.8 15.4-15.4h.1l216.9-216.9-52.9-52.9z"
    />
  </svg>
);
export default SvgCorrect;
