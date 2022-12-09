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
  deleteVehicle,
  findVehicleById,
  findVehicleByKeyword,
  getAllVehicle,
} from "../../redux/actions/VehicleAction";
import AddVehicleForm from "../../components/admin/forms/AddVehicleForm";
import EditVehicleForm from "../../components/admin/forms/EditVehicleForm";
import moment from "moment";
import { getAllPoint } from "../../redux/actions/GlobalAction";
const { Search } = Input;

export default function VehicleManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { vehicleList } = useSelector((state) => state.VehicleReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (vehicle) => {
    dispatch(deleteVehicle(vehicle));
  };
  const handleAddVehicle = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{t("add", {title: t("bus")})}</span>,
        <AddVehicleForm />
      )
    );
  };

  const handleEditVehicle = (vehicle) => {
    dispatch(showDrawer());
    dispatch(findVehicleById(vehicle));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{t("update", {title: t("bus")})}</span>,
        <EditVehicleForm />
      )
    );
  };

  const columns = [
    {
      title: <span className="uppercase">{t("id")}</span>,
      dataIndex: "id",
      width: 30,
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
      title: <span className="capitalize">{t("name", {title: t("bus")})}</span>,
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
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Tag color="green">
                <span className="uppercase font-medium">{record.name}</span>
              </Tag>
            </div>
            <div className="text-center py-2">
              <span className="font-medium capitalize">{t("company")}: </span>
              <span className="font-medium text-red-600">
                {record.busCompanyObj.name}
              </span>
            </div>
          </>
        );
      },
    },
    {
      title: <span className="capitalize">{t("image")}</span>,
      dataIndex: "image",
      render: (text) => {
        return (
          <div className="text-center">
            <Image width={100} src={text} preview={false} />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("type", {title: t("bus")})}</span>,
      dataIndex: "busType",
      render: (text, {busTypeObj}) => {
        return <div className="text-center">
          <Tag color='green' className="uppercase">{busTypeObj?.name}</Tag>
        </div>;
      },
    },
    {
      title: <span className="capitalize">{t("row")}</span>,
      dataIndex: "numberSeat",
      render: (text) => {
        return (
          <div className="text-center">{text}</div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("floor")}</span>,
      dataIndex: "numberFloor",
      render: (text) => {
        return <div className="text-center">{text}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("info" , {title: t("trip")})}</span>,
      width:200,
      dataIndex: "name",
      sorter: {
        compare: (a, b) => {
          let stationA =
            `${a.tripObj.fromStationObj.name} - ${a.tripObj.toStationObj.name}`
              .toLowerCase()
              .trim();
          let stationB =
            `${b.tripObj.fromStationObj.name} - ${b.tripObj.toStationObj.name}`
              .toLowerCase()
              .trim();
          if (stationA > stationB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text, { tripObj }) => {
        if (tripObj && tripObj.id) {
          const { fromStationObj, toStationObj, startTime, price, tripAt } = tripObj;
          return (
            <div className="text-center">
              <div className="uppercase font-medium">{`${fromStationObj.name} - ${toStationObj.name}`}</div>
              <Tag color="green" className="m-1">
                <div>
                  <span className="font-medium text-black capitalize">{t("price")} (VND): </span>
                  {price.toLocaleString()}
                </div>
                <div>
                  <p className="font-medium text-black capitalize">
                    {t("time", {title: t("trip")})}
                  </p>
                  <span className="uppercase">{tripAt ? moment(tripAt).format('hh:mm a, DD/MM/YYYY') : ''}</span> ({t("minute", {time: startTime})})
                </div>
              </Tag>
            </div>
          );
        } else {
          return "";
        }
      },
    },
    {
      title: <span className="capitalize">{t("promo")}</span>,
      dataIndex: "promo",
      width: 100,
      render: (text) => {
        return <div className="text-center">{t("discount", {percent: text.percent, max: text.max})}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("point")}</span>,
      dataIndex: "point",
      render: (text) => {
        return <div>
          <div className="pt-2">
            <p>{t("pickup")} : <span className="font-medium text-alibus">{text.pickupObj?.length}</span></p>
            <p>{t("shuttle")} : <span className="font-medium text-alibus">{text.pickupObj?.filter(i => i.shuttle)?.length}</span></p>
          </div>
          <div className="pt-2">
            <p>{t("dropoff")} : <span className="font-medium text-green-600">{text.dropoffObj?.length}</span></p>
            <p>{t("shuttle")} : <span className="font-medium text-green-600">{text.dropoffObj?.filter(i => i.shuttle)?.length}</span></p>
          </div>
        </div>;
      },
    },
    {
      title: <span className="capitalize">{t("action")}</span>,
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Space>
              <button
                className="mx-2 text-blue-600 text-2xl focus-within:outline-none"
                onClick={() => handleEditVehicle(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", {title: t("bus")})}
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
      dispatch(findVehicleByKeyword(searchText));
    }, 300);
  };

  useEffect(() => {
    dispatch(getAllVehicle());
    dispatch(getAllPoint());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">{t("manage", {title: t("bus")})}</h3>
      <Button
        onClick={handleAddVehicle}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", {title: t("bus")})}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={vehicleList} rowKey="id" />
    </div>
  );
}
