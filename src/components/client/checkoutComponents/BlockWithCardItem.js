import React, { useEffect } from "react";
import { Collapse, Radio } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentMethod } from "../../../redux/actions/GlobalAction";
import { setPaymentCheckout } from "../../../redux/actions/CheckoutAction";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

export default function BlockWithCardItem() {
  const { paymentMethodList } = useSelector((state) => state.GlobalReducer);
  const { paymentData } = useSelector((state) => state.CheckoutReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllPaymentMethod());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = (e) => {
    dispatch(setPaymentCheckout({ paymentMethod: e.target.value }));
  };
  const renderMethod = () => {
    return paymentMethodList?.map((i, idx) => {
      return (
        <div
          className="border-b px-3 hover:bg-alibusblurv focus:bg-alibusblurv py-4 space-y-2"
          key={idx}
        >
          <Radio value={i.id}>
            <div className="leading-6">
              <div className="flex items-center space-x-2 text-xs">
                <img alt={i.logo} src={i.logo} />
                <span className="text-base font-medium">{i.name}</span>
              </div>
              <div className="flex flex-col justify-between">
                <div>{i.subTitle}</div>
                <div className="text-green-700">{i.promo}</div>
              </div>
              <NavLink
                to={i.conditionLink || "#"}
                className="text-alibus underline capitalize hover:text-alibus text-sm"
                target="_blank"
              >
                {t("conditions")}
              </NavLink>
              {i.paymentIntro && (
                <Collapse
                  onChange={onChange}
                  className="bg-transparent"
                  bordered={false}
                  expandIcon={({ isActive }) => {}}
                >
                  <Panel
                    className="border-0"
                    header={
                      <div
                        style={{ margin: "-16px" }}
                        className="underline text-alibus text-sm capitalize"
                      >
                        {t("intropayment")}
                      </div>
                    }
                    key="1"
                  >
                    <p dangerouslySetInnerHTML={{ __html: i.paymentIntro }} />
                  </Panel>
                </Collapse>
              )}
            </div>
          </Radio>
        </div>
      );
    });
  };
  return (
    <div className="border rounded flex flex-col divide-gray-700">
      <Radio.Group onChange={onChange} value={paymentData?.paymentMethod}>
        {renderMethod()}
      </Radio.Group>
    </div>
  );
}
