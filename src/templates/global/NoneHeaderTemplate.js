import React from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";

export default function NoneHeaderTemplate({ Component, ...restParams }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
}
