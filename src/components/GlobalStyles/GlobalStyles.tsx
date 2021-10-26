import React from "react";
import { Global, css } from "@emotion/react";
import { reset } from "./reset";
import { COLORS } from "utils";

export const typography = css`
  /* only take latin chars to reduce bundle size */
  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: url("/fonts/Barlow-Regular.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Barlow";
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: url("/fonts/Barlow-Bold.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
`;
const variables = css`
  :root {
    /* COLORS */
    --color-gray: hsl(${COLORS.gray[500]});
    --color-gray-300: hsla(${COLORS.gray[300]});
    --color-gray-100: hsla(${COLORS.gray[100]});
    --color-white: hsl(${COLORS.white});
    --color-black: hsl(${COLORS.black});
    --color-primary: hsl(${COLORS.primary[500]});
    --color-primary-dark: hsl(${COLORS.primary[700]});
    --color-secondary: hsl(${COLORS.secondary[500]});
    --color-error: hsl(${COLORS.error[500]});
    --color-error-light: hsla(${COLORS.error[300]});

    --color-primary-transparent: hsla(${COLORS.primary[500]} / 0.4);
    --color-black-transparent: hsla(${COLORS.black} / 0.75);
    --color-white-transparent: hsla(${COLORS.white} / 0.75);

    /*
    Silence the warning about missing Reach Dialog styles
  */
    --reach-dialog: 1;

    /* 
    Keep a consistent width between the middle section and the headers
  */
    --central-content: 500px;
  }
`;

const globalStyles = css`
  ${reset};
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    line-height: 1.5;
    font-family: "Barlow", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
  }
  html,
  body {
    height: 100%;
  }
  body {
    background-color: var(--color-gray);
    color: var(--color-white);
  }
  #root {
    height: 100%;
    isolation: isolate;
  }
  .horizontal-slider {
    width: 100%;
    max-width: 500px;
    height: 50px;
    border: 1px solid grey;
  }
  .vertical-slider {
    height: 380px;
    width: 50px;
    border: 1px solid grey;
  }
  .example-thumb {
    font-size: 0.9em;
    text-align: center;
    background-color: black;
    color: white;
    cursor: pointer;
    border: 5px solid gray;
    box-sizing: border-box;
  }
  .example-thumb.active {
    background-color: grey;
  }
  .example-track {
    position: relative;
    background: #ddd;
  }
  .example-track.example-track-1 {
    background: #f00;
  }
  .example-track.example-track-2 {
    background: #0f0;
  }
  .example-mark {
    width: 8px;
    height: 8px;
    border: 2px solid #000;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }
  .horizontal-slider .example-track {
    top: 20px;
    height: 10px;
  }
  .horizontal-slider .example-thumb {
    top: 1px;
    width: 50px;
    height: 48px;
    line-height: 38px;
  }
  .horizontal-slider .example-mark {
    margin: 0 calc(25px - 6px);
    bottom: calc(50% - 6px);
  }
  .vertical-slider .example-thumb {
    left: 1px;
    width: 48px;
    line-height: 40px;
    height: 50px;
  }
  .vertical-slider .example-track {
    left: 20px;
    width: 10px;
  }
  .vertical-slider .example-mark {
    margin: calc(25px - 6px) 0;
    left: calc(50% - 6px);
  }

  ${typography}
  ${variables}
`;

const GlobalStyles = () => <Global styles={globalStyles} />;
export default GlobalStyles;
