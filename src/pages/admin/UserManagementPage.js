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
import { deleteUser, getAllUser, getUserById, getUserByKeyword } from "../../redux/actions/UserAction";
import EditUserForm from "../../components/admin/forms/EditUserForm";
import AddUserForm from "../../components/admin/forms/AddUserForm";
import { USER_TYPE } from "../../utils/constant";
const { Search } = Input;

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { userList } = useSelector((state) => state.UserReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (user) => {
    dispatch(deleteUser(user));
  };
  const handleAddUser = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{t("add", {title: t("member")})}</span>,
        <AddUserForm />
      )
    );
  };

  const handleEditUser = (user) => {
    dispatch(showDrawer());
    dispatch(getUserById(user));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{"Cập nhật thông tin thành viên"}</span>,
        <EditUserForm />
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
          if (a.id > b.id) {
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
      title: <span className="uppercase">{t("image")}</span>,
      dataIndex: "avatar",
      render: (text) => {
        return (
          <div className="text-center">
            <Image width={75} src={text} preview={false} />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("account")}</span>,
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
      title: <span className="capitalize">{t("type", {title: t("member")})}</span>,
      dataIndex: "typeObj",
      width: 170,
      render: (text) => {
        let color = text?.name === USER_TYPE.USER ?  "#389e0d" : "#f47920";
        return (
          <div className="text-center">
            <Tag color={color}>
              <span className="uppercase">{text?.name}</span>
            </Tag>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => {
          let typeA = a.typeObj.name.toLowerCase().trim();
          let typeB = b.typeObj.name.toLowerCase().trim();
          if (typeA > typeB) {
            return 1;
          }
          return -1;
        },
        multiple: 3,
      },
    },
    {
      title: <span className="capitalize">{t("phone")}</span>,
      dataIndex: "numberPhone",
    },
    {
      title: <span className="capitalize">{t("email")}</span>,
      dataIndex: "email",
      sorter: {
        compare: (a, b) => {
          let emailA = a.email.toLowerCase().trim();
          let emailB = b.email.toLowerCase().trim();
          if (emailA > emailB) {
            return 1;
          }
          return -1;
        },
        multiple: 4,
      },
    },
    {
      title: <span className="capitalize">{t("action")}</span>,
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <div className="text-center">
            <Space>
              <button className="mx-2 text-blue-600 text-2xl focus-within:outline-none" onClick={() => handleEditUser(record)}>
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", {title: t("member")})}
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
      dispatch(getUserByKeyword(searchText));
    }, 300);
  }

  useEffect(() => {
    dispatch(getAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">
        {t("manage", {title: t("user")})}
      </h3>
      <Button
        onClick={handleAddUser}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", {title: t("member")})}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={userList} rowKey="id" />
    </div>
  );
}