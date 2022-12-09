import React from "react";
import { Drawer, Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideDrawer } from "../redux/actions/DrawerAction";
import { useTranslation } from "react-i18next";

export default function DrawerHOC() {
  const { visible, title, FormComponent, submitAction } = useSelector(
    (state) => state.DrawerReducer
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    dispatch(hideDrawer());
  };
  return (
    <Drawer
      title={title}
      placement="right"
      visible={visible}
      closable={false}
      size="large"
      footer={
        <Space>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button type="primary" onClick={submitAction}>
            {t("confirm")}
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: "right" }}
    >
      {FormComponent}
    </Drawer>
  );
}
