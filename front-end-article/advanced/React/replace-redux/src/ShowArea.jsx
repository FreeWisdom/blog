import React, { useContext } from "react";
import { ColorContext } from "./color";

const ShowArea = (props) => {
  const { color } = useContext(ColorContext);
  return <div style={{ color }}>字体颜色展示为blue</div>;
};

export default ShowArea;
