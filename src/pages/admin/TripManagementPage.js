import { Button, Image, Input, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { setContentDrawer, showDrawer } from "../../redux/actions/DrawerAction";
import {
  deleteTrip,
  findTripById,
  findTripByKeyword,
  getTrip,
} from "../../redux/actions/TripAction";
import AddTripForm from "../../components/admin/forms/AddTripForm";
import EditTripForm from "../../components/admin/forms/EditTripForm";
import moment from "moment";
const { Search } = Input;

export default function TripManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { tripList } = useSelector((state) => state.TripReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (trip) => {
    dispatch(deleteTrip(trip));
  };
  const handleAddTrip = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{t("add", {title: t("trip")})}</span>,
        <AddTripForm />
      )
    );
  };

  const handleEditTrip = (trip) => {
    dispatch(showDrawer());
    dispatch(findTripById(trip));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("update", {title: t("trip")})}
        </span>,
        <EditTripForm />
      )
    );
  };

  const columns = [
    {
      title: <span className="uppercase">{t("id")}</span>,
      dataIndex: "id",
      width: 140,
      sorter: {
        compare: (a, b) => {
          let tripA = a.id;
          let tripB = b.id;
          if (tripA > tripB) {
            return 1;
          }
          return -1;
        },
        multiple: 1,
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: <span className="capitalize">{t("name", {title: t("trip")})}</span>,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => {
          let stationA = `${a.fromStationObj.name} - ${a.toStationObj.name}`
            .toLowerCase()
            .trim();
          let stationB = `${b.fromStationObj.name} - ${b.toStationObj.name}`
            .toLowerCase()
            .trim();
          if (stationA > stationB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text, { fromStationObj, toStationObj }) => {
        return (
          <div className="text-center">
            <Tag color="green">
              <span className="uppercase font-medium">{`${fromStationObj.name} - ${toStationObj.name}`}</span>
            </Tag>
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("time", {title: t("trip")})}</span>,
      dataIndex: "name",
      render: (text, { startTime, tripAt }) => {
        return (
          <div className="text-center py-2">
            <span className="font-medium">
              <p className="uppercase">
                {tripAt ? moment(tripAt).format("hh:mm a, DD/MM/YYYY") : ""}
              </p>{" "}
              ({t("minute", {time: startTime})})
            </span>
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("image")}</span>,
      dataIndex: "image",
      render: (text) => {
        return (
          <div className="text-center">
            <Image width={150} src={text} preview={false} />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{`${t("time", {title: t("trip")})} (VND)`}</span>,
      dataIndex: "price",
      width: 170,
      render: (text) => {
        return (
          <div className="text-center">
            <Tag color="volcano">
              <span className="uppercase font-medium">
                {text?.toLocaleString()}
              </span>
            </Tag>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => {
          let typeA = a.price;
          let typeB = b.price;
          if (typeA > typeB) {
            return 1;
          }
          return -1;
        },
        multiple: 3,
      },
    },
    {
      title: <span className="capitalize">{t("action")}</span>,
      dataIndex: "",
      width: 200,
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Space>
              <button
                className="mx-2 text-blue-600 text-2xl focus-within:outline-none"
                onClick={() => handleEditTrip(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", {title: t("trip")})}
                onConfirm={() => confirmDelete(record)}
                okText={t("confirm")}
                cancelText={t("cancel")}
              >
                <button className="mx-2 text-alibus text-2xl focus-within:outline-none">
                  <DeleteOutlined />
                </button>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  const onSearch = (e) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      let searchText = e.target.value ? e.target.value.trim() : e.target.value;
      dispatch(findTripByKeyword(searchText));
    }, 300);
  };

  useEffect(() => {
    dispatch(getTrip());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">{t("manage", {title: t("trip")})}</h3>
      <Button
        onClick={handleAddTrip}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", {title: t("trip")})}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={tripList} rowKey="id" />
    </div>
  );
}
