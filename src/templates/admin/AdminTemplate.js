import { Layout } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import HeaderAdmin from "../../components/admin/globals/HeaderAdmin";
import SliderNavBar from "../../components/admin/globals/SliderNavBar";
import { USER_TYPE } from "../../utils/constant";
import { history } from "../../utils/history";

const { Content } = Layout;

export default function AdminTemplate(props) {
  const {t} = useTranslation();
  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (userLogin.name && userLogin.typeObj.name === USER_TYPE.ADMIN) {
    return (
      <Route
        {...restProps}
        render={(propsRoute) => {
          return (
            <>
              <Layout>
                <SliderNavBar />
                <Layout className="site-layout">
                  <HeaderAdmin />
                  <Content
                    className="site-layout-background hidden lg:block"
                    style={{
                      margin: "24px 16px",
                      padding: 24,
                      minHeight: "calc(100vh - 112px)",
                    }}
                  >
                    <Component {...propsRoute} />
                  </Content>
                  <Content className="site-layout-background bg-alibusblurv lg:hidden"
                    style={{
                      minHeight: "calc(100vh - 112px)",
                    }}>
                    <div className="h-full text-alibus flex items-center justify-center text-2xl font-bold text-center px-4">
                      Trang web quản lý của AliBus chưa hỗ trợ cho . Vui lòng
                      truy cập trên desktop
                    </div>
                    <div className="absolute bottom-0 w-full text-xs text-center bg-alibus text-white p-2">
                      {t("copyright")} <br />
                      <span>{t("author")}</span>
                    </div>
                  </Content>
                </Layout>
              </Layout>
            </>
          );
        }}
      />
    );
  } else {
    history.push("/");
    window.location.reload();
  }
}
