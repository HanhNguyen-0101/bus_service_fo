import { CalendarOutlined, EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStation } from "../../../redux/actions/StationAction";
import { removeAccents } from "../../../utils/stringFunc";
import { history } from "../../../utils/history";
import moment from "moment";
import { setLocation } from "../../../redux/actions/SearchAction";
import { useTranslation } from "react-i18next";
const { Option, OptGroup } = Select;

export default function SearchForm({hasValue}) {
  const { stationList } = useSelector((state) => state.StationReducer);
  const { locationSelected } = useSelector((state) => state.SearchReducer);
  const show = !(window.location.pathname?.startsWith('/your-trip') && !hasValue);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    dispatch(getAllStation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      from: locationSelected && show ? JSON.stringify(locationSelected.from) : null,
      to: locationSelected && show ? JSON.stringify(locationSelected.to) : null,
      date: locationSelected && show ? locationSelected.date : null,
    },
    validationSchema: Yup.object({
      from: Yup.mixed().required(t("pleaseSelect", {title: t("start")})),
      to: Yup.mixed().required(t("pleaseSelect", {title: t("end")})),
      date: Yup.mixed().required(t("pleaseSelect", {title: t("startDate")})),
    }),
    onSubmit: (values) => {
      const {from, to, date} = values;
      const fromObj = JSON.parse(from);
      const toObj = JSON.parse(to);
      values = {
        ...values,
        from: fromObj,
        to: toObj
      }
      dispatch(setLocation(values));
      history.push(`/your-trip/from=${removeAccents(fromObj.name?.replace(/ /g,"_").toLowerCase())}&&to=${removeAccents(toObj.name?.replace(/ /g,"_").toLowerCase())}&&date=${moment(date).format('DD-MM-YYYY')}`);
      window.location.reload();
    },
  });
  return (
    <form
      className="sm:flex justify-center m-auto items-center flex-row w-full bg-white search-form"
      onSubmit={formik.handleSubmit}
    >
      <Select
        showSearch
        placeholder={t("city")}
        defaultActiveFirstOption={false}
        onChange={handleChange("from")}
        name="from"
        value={formik.values.from}
        notFoundContent={null}
        className="p-2.5 w-full text-left text-base border-b sm:border-y-0 sm:border-l-0 sm:border-r-2"
        suffixIcon={
          <span className="text-alibus text-2xl leading-none">
            <EnvironmentOutlined />
          </span>
        }
      >
        <OptGroup
          label={
            <span className="font-medium text-black text-sm">
              {t("city")}
            </span>
          }
        >
          {stationList?.map((station, idx) => {
            return (
              <Option
                key={`city-${idx}`}
                value={JSON.stringify(station)}
                className="py-2"
              >
                {station.name}
              </Option>
            );
          })}
        </OptGroup>
      </Select>
      <Select
        showSearch
        placeholder={t("city")}
        defaultActiveFirstOption={false}
        onChange={handleChange("to")}
        name="to"
        value={formik.values.to}
        notFoundContent={null}
        className="p-2.5 w-full text-left text-base border-b sm:border-y-0 sm:border-l-0 sm:border-r-2"
        suffixIcon={
          <span className="text-alibus text-2xl leading-none">
            <EnvironmentOutlined />
          </span>
        }
      >
        <OptGroup
          label={
            <span className="font-medium text-black text-sm">
              {t("city")}
            </span>
          }
        >
          {stationList?.map((station, idx) => {
            return (
              <Option
                key={`city-${idx}`}
                value={JSON.stringify(station)}
                className="py-2"
              >
                {station.name}
              </Option>
            );
          })}
        </OptGroup>
      </Select>
      <DatePicker
        className="w-full border-x-0 pr-1 border-t-0 border-b sm:border-0 pl-4"
        size="large"
        placeholder={t("startDate")}
        allowClear={false}
        dropdownClassName="w-auto text-center"
        name="date"
        value={formik.values.date ? moment(formik.values.date) : null}
        format='DD/MM/YYYY'
        onChange={handleChange("date")}
        suffixIcon={
          <span className="mr-2 pb-2 text-alibus text-2xl">
            <CalendarOutlined />
          </span>
        }
      />
      <button
        type="submit"
        disabled={!((formik.isValid && formik.dirty) || (formik.values.date && formik.values.to && formik.values.from))}
        className="uppercase text-xl w-full sm:w-auto lg:w-full px-3 font-bold rounded-none bg-alibus focus:outline-none focus:bg-alibus focus:border-alibus focus:shadow-none border-alibus hover:bg-alibusblur hover:border-alibusblur text-white"
        style={{ height: 83 }}
      >
        <span className="hidden sm:block lg:hidden"><SearchOutlined /></span>
        <span className="block sm:hidden lg:block">{t("find")}</span>
      </button>
    </form>
  );
}
