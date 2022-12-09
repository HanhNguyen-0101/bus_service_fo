import { Button, Input, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { setContentDrawer, showDrawer } from "../../redux/actions/DrawerAction";
import {
  deleteTicket,
  findTicketById,
  findTicketByKeyword,
  getAllTicket,
} from "../../redux/actions/TicketAction";
import AddTicketForm from "../../components/admin/forms/AddTicketForm";
import EditTicketForm from "../../components/admin/forms/EditTicketForm";
import { ORDER_STATUS, PAYMENT_STATUS } from "../../utils/constant";
import _ from "lodash";
const { Search } = Input;

export default function TicketManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { ticketList } = useSelector((state) => state.TicketReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (item) => {
    dispatch(deleteTicket(item));
  };
  const handleAddVehicle = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("add", { title: t("ticket") })}
        </span>,
        <AddTicketForm />
      )
    );
  };

  const handleEditVehicle = (item) => {
    dispatch(showDrawer());
    dispatch(findTicketById(item));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("update", { title: t("ticket") })}
        </span>,
        <EditTicketForm />
      )
    );
  };

  const columns = [
    {
      title: <span className="uppercase">{t("id")}</span>,
      dataIndex: "id",
      sorter: {
        compare: (a, b) => {
          let idA = a.id;
          let idB = b.id;
          if (idA > idB) {
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
      title: <span className="capitalize">{"Date"}</span>,
      dataIndex: "createdAt",
      sorter: {
        compare: (a, b) => {
          let createdAtA = a.createdAt;
          let createdAtB = b.createdAt;
          if (createdAtA > createdAtB) {
            return 1;
          }
          return -1;
        },
        multiple: 1,
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      render: (text, { updatedAt, createdAt }) => {
        return (
          <div className="text-center">
            <div>
              <span className="capitalize font-medium">{t("bookingAt")}</span>{" "}
              {createdAt ? moment(createdAt).format("DD/MM/YYYY hh:mm") : ""}
            </div>
            <div>
              <span className="capitalize font-medium">{t("updatedAt")}</span>{" "}
              {updatedAt ? moment(updatedAt).format("DD/MM/YYYY hh:mm") : ""}
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <span className="capitalize">
          {t("orderStatus", { title: t("ticket") })}
        </span>
      ),
      dataIndex: "orderStatusObj",
      sorter: {
        compare: (a, b) => {
          let orderStatusA = a.orderStatusObj.name;
          let orderStatusB = b.orderStatusObj.name;
          if (orderStatusA > orderStatusB) {
            return 1;
          }
          return -1;
        },
        multiple: 1,
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        let color = "cyan";
        if (text.name === ORDER_STATUS.IGNORE) {
          color = "red";
        }
        if (text.name === ORDER_STATUS.SUCCESS) {
          color = "green";
        }
        return (
          <Tag color={color} className="uppercase">
            {text.name}
          </Tag>
        );
      },
    },
    {
      title: <span className="capitalize">{t("fullname")}</span>,
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
      render: (text, { name, numberPhone, email, identify }) => {
        return (
          <div className="text-center">
            <div className="uppercase font-medium">{name}</div>
            <Tag color="red" className="m-1">
              <div>
                <span className="font-medium text-black capitalize">
                  {t("phone")}:{" "}
                </span>
                {numberPhone}
              </div>
              <div>
                <span className="font-medium text-black capitalize">
                  {t("email")}:{" "}
                </span>
                {email}
              </div>
              <div>
                <span className="font-medium text-black capitalize">
                  {t("identifyId")}:{" "}
                </span>
                {identify}
              </div>
            </Tag>
          </div>
        );
      },
    },
    {
      title: (
        <span className="capitalize">{t("info", { title: t("trip") })}</span>
      ),
      dataIndex: "vehicledObj",
      sorter: {
        compare: (a, b) => {
          let stationA =
            `${a.vehicledObj.tripObj.fromStationObj.name} - ${a.vehicledObj.tripObj.toStationObj.name}`
              .toLowerCase()
              .trim();
          let stationB =
            `${b.vehicledObj.tripObj.fromStationObj.name} - ${b.vehicledObj.tripObj.toStationObj.name}`
              .toLowerCase()
              .trim();
          if (stationA > stationB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text, { vehicledObj, pointObj }) => {
        const { fromStationObj, toStationObj, startTime, price, tripAt } =
          vehicledObj?.tripObj;
        return (
          <div className="text-center">
            <div className="uppercase font-medium">{`${fromStationObj.name} - ${toStationObj.name}`}</div>
            <Tag color="green" className="m-1">
              <div>
                <span className="font-medium text-black capitalize">
                  {t("price")} (VND):{" "}
                </span>
                {price.toLocaleString()}
              </div>
              <div>
                <p className="font-medium text-black capitalize">
                  {t("time", { title: t("trip") })}
                </p>
                <span className="uppercase">
                  {tripAt ? moment(tripAt).format("hh:mm a, DD/MM/YYYY") : ""}
                </span>{" "}
                ({t("minute", { time: startTime })})
              </div>
            </Tag>
            {pointObj &&
              _.map(pointObj, function (value, key) {
                return (
                  <div key={key} className="text-left">
                    {t(key)}:{" "}
                    <span className="font-medium">{value.station}</span>
                  </div>
                );
              })}
          </div>
        );
      },
    },
    {
      title: (
        <span className="capitalize">{t("info", { title: t("seat") })}</span>
      ),
      dataIndex: "name",
      render: (text, { seatSelectedObj, vehicledObj }) => {
        if (seatSelectedObj && seatSelectedObj.length > 0) {
          return (
            <div className="text-center">
              <div className="font-medium capitalize">{t("busList")}</div>
              {seatSelectedObj?.map((i, idx) => {
                return (
                  <Tag color="#f47920" key={idx} className="m-1">
                    <span className="font-medium text-white">{i.name}</span>
                  </Tag>
                );
              })}
              <div className="text-center py-2">
                <Tag color="green" className="m-1">
                  <span className="uppercase font-medium">
                    {vehicledObj.name} (
                    <span>{vehicledObj.busTypeObj.name}</span>)
                  </span>
                </Tag>
                <Tag color="red" className="m-1">
                  <span className="font-medium">
                    {vehicledObj.busCompanyObj.name}
                  </span>
                </Tag>
              </div>
            </div>
          );
        } else {
          return "";
        }
      },
    },
    {
      title: (
        <span className="capitalize">{t("info", { title: t("pay") })}</span>
      ),
      dataIndex: "name",
      render: (text, { paymentMethodObj, note, vehicledObj, seatSelected }) => {
        return (
          <div className="text-center">
            <div className="capitalize">
              {t("total")} (VND):{" "}
              <span className="text-red-500 font-medium">
                {(
                  vehicledObj?.tripObj.price * seatSelected?.length
                ).toLocaleString()}
              </span>
            </div>
            <div className="text-green-600 font-medium">
              {paymentMethodObj.name}
            </div>
            <div dangerouslySetInnerHTML={{ __html: note }} />
          </div>
        );
      },
    },
    {
      title: (
        <span className="capitalize">
          {t("paymentStatus", { title: t("pay") })}
        </span>
      ),
      dataIndex: "paymentStatusObj",
      sorter: {
        compare: (a, b) => {
          let paymentStatusA = a.paymentStatusObj;
          let paymentStatusB = b.paymentStatusObj;
          if (paymentStatusA > paymentStatusB) {
            return 1;
          }
          return -1;
        },
        multiple: 1,
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        return (
          <Tag
            color={text.name === PAYMENT_STATUS.DONE ? "green" : "orange"}
            className="uppercase"
          >
            {text.name}
          </Tag>
        );
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
                title={t("delete", { title: t("ticket") })}
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
      dispatch(findTicketByKeyword(searchText));
    }, 300);
  };

  useEffect(() => {
    dispatch(getAllTicket());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">
        {t("manage", { title: t("ticket") })}
      </h3>
      <Button
        onClick={handleAddVehicle}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", { title: t("ticket") })}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={ticketList} rowKey="id" />
    </div>
  );
}
