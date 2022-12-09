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
import { deleteStation, findStationById, findStationByKeyword, getAllStation } from "../../redux/actions/StationAction";
import AddStationForm from "../../components/admin/forms/AddStationForm";
import EditStationForm from "../../components/admin/forms/EditStationForm";
const { Search } = Input;

export default function StationManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { stationList } = useSelector((state) => state.StationReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (station) => {
    dispatch(deleteStation(station));
  };

  const handleAddStation = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{t("add", {title: t("station")})}</span>,
        <AddStationForm />
      )
    );
  };

  const handleEditStation = (station) => {
    dispatch(showDrawer());
    dispatch(findStationById(station));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{t("update", {title: t("place")})}</span>,
        <EditStationForm />
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
          let accountA = a.id;
          let accountB = b.id;
          if (accountA > accountB) {
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
      title: <span className="capitalize">{t("name", {title: t("place")})}</span>,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => {
          let nameA = a.name.toLowerCase().trim();
          let nameB = b.name.toLowerCase().trim();
          if (nameA > nameB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
    },
    {
      title: <span className="capitalize">{t("image")}</span>,
      dataIndex: "image",
      render: (text) => {
        return (
          <div className="text-center">
            <Image
              width={150}
              src={text}
              preview={false}
            />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("address")}</span>,
      dataIndex: "address",
      sorter: {
        compare: (a, b) => {
          let addressA = a.address.toLowerCase().trim();
          let addressB = b.address.toLowerCase().trim();
          if (addressA > addressB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
    },
    {
      title: <span className="capitalize">{t("city")}</span>,
      dataIndex: "provinceObj",
      width: 170,
      render: (text) => {
        return (
          <div className="text-center">
            <Tag color="#f47920">
              <span className="uppercase">{text?.name}</span>
            </Tag>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => {
          let typeA = a.provinceObj.name.toLowerCase().trim();
          let typeB = b.provinceObj.name.toLowerCase().trim();
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
                onClick={() => handleEditStation(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", {title: t("place")})}
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
      dispatch(findStationByKeyword(searchText));
    }, 300);
  };

  useEffect(() => {
    dispatch(getAllStation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">
        {t("manage", {title: t("place")})}
      </h3>
      <Button
        onClick={handleAddStation}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", {title: t("station")})}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={stationList} rowKey="id" />
    </div>
  );
}
