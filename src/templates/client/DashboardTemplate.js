import React from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "../../components/client/globals/Footer";
import Header from "../../components/client/globals/Header";

export default function DashboardTemplate({ Component, ...restParams }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <div className="busService">
              <Header/>
              <Component {...propsRoute} />
              <Footer />
            </div>
          </>
        );
      }}
    />
  );
}
