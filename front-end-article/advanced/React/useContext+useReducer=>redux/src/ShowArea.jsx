import React, { useContext } from "react";
import { ReduxContext } from "./useRedux";

const ShowArea = (props) => {
  const { color } = useContext(ReduxContext);

  console.log("color", color, useContext(ReduxContext))
  return <div style={{ color }}>字体颜色展示为blue</div>;
};

export default ShowArea;
