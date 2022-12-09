import { Button, Input, Popconfirm, Space, Table, Tag } from "antd";
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
  deleteSeat,
  findSeatById,
  findSeatByKeyword,
  getAllSeat,
} from "../../redux/actions/SeatAction";
import AddSeatForm from "../../components/admin/forms/AddSeatForm";
import EditSeatForm from "../../components/admin/forms/EditSeatForm";
import { SEAT_STATUS } from "../../utils/constant";
const { Search } = Input;

export default function SeatManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { seatList } = useSelector((state) => state.SeatReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (seat) => {
    dispatch(deleteSeat(seat));
  };
  const handleAddSeat = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("add", { title: t("seat") })}
        </span>,
        <AddSeatForm />
      )
    );
  };

  const handleEditSeat = (seat) => {
    dispatch(showDrawer());
    dispatch(findSeatById(seat));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("update", { title: t("seat") })}
        </span>,
        <EditSeatForm />
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
      title: <span className="capitalize">{t("name", { title: t("seat") })}</span>,
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
      render: (text) => {
        return (
          <div className="text-center">
            <Tag color="green">
              <span className="uppercase font-medium">{text}</span>
            </Tag>
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("name", { title: t("bus") })}</span>,
      dataIndex: "vehicledObj",
      sorter: {
        compare: (a, b) => {
          let vehicleA = a.vehicledObj.name.toLowerCase().trim();
          let vehicleB = b.vehicledObj.name.toLowerCase().trim();
          if (vehicleA > vehicleB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text, record) => {
        return (
          <div className="text-center">
            <span className="font-medium text-red-600">
              {record.vehicledObj.name}
            </span>
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("status")}</span>,
      dataIndex: "seatStatusObj",
      width: 170,
      render: (text) => {
        let color = text.name === SEAT_STATUS.AVAILABLE ? "green" : "red";
        return (
          <div className="text-center">
            <Tag color={color}>
              <span className="uppercase">{text.name}</span>
            </Tag>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => {
          let statusA = a.seatStatusObj?.name.toLowerCase().trim();
          let statusB = b.seatStatusObj?.name.toLowerCase().trim();
          if (statusA > statusB) {
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
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Space>
              <button
                className="mx-2 text-blue-600 text-2xl focus-within:outline-none"
                onClick={() => handleEditSeat(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", { title: t("seat") })}
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
      dispatch(findSeatByKeyword(searchText));
    }, 300);
  };

  useEffect(() => {
    dispatch(getAllSeat());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">{t("manage", {title: t("seat")})}</h3>
      <Button
        onClick={handleAddSeat}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", { title: t("seat") })}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={seatList} rowKey="id" />
    </div>
  );
}
