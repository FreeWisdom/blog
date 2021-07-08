import React, { createContext, useReducer } from "react";

// initState
const initState = {
  color: "green"
};

// reducer
export const UPDATE_COLOR = "UPDATE_COLOR";
const reducer = (state, action) => {

  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
};

/**
 * 创建 context；
 */
export const ReduxContext = createContext({});

export function useRedux() {
  /**
   * 创建 ReduxContainer 组件，ReduxContainer 组件包裹的所有子组件都可以通过调用 ReduxContext 访问到 store；
   */
  const ReduxContainer = (props) => {
    const [color, dispatch] = useReducer(reducer, initState.color);

    return (
      <ReduxContext.Provider value={{ color, dispatch }}>
        {props.children}
      </ReduxContext.Provider>
    );
  };
  return ReduxContainer;
}