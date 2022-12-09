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
import AddBusCompanyForm from "../../components/admin/forms/AddBusCompanyForm";
import EditBusCompanyForm from "../../components/admin/forms/EditBusCompanyForm";
import {
  deleteBusCompany,
  findBusCompanyById,
  findBusCompanyByKeyword,
  getAllBusCompany,
} from "../../redux/actions/BusCompanyAction";
import _ from "lodash";
const { Search } = Input;

export default function BusCompanyManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const { busCompanies } = useSelector((state) => state.BusCompanyReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDelete = (company) => {
    dispatch(deleteBusCompany(company));
  };
  const handleAddBusCompany = () => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("add", { title: t("company") })}
        </span>,
        <AddBusCompanyForm />
      )
    );
  };

  const handleEditBusCompany = (company) => {
    dispatch(showDrawer());
    dispatch(findBusCompanyById(company));
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("update", { title: t("company") })}
        </span>,
        <EditBusCompanyForm />
      )
    );
  };

  const columns = [
    {
      title: <span className="uppercase">{t("id")}</span>,
      dataIndex: "id",
      width: 50,
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
      title: (
        <span className="capitalize">{t("name", { title: t("place") })}</span>
      ),
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
      title: <span className="capitalize">{t("address")}</span>,
      dataIndex: "address",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      title: <span className="capitalize">{t("image")}</span>,
      dataIndex: "image",
      render: (text) => {
        return (
          <div className="text-center">
            <Image width={75} src={_.last(text)} preview={false} />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("desc")}</span>,
      dataIndex: "description",
      width: 250,
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      title: <span className="capitalize">{t("content")}</span>,
      dataIndex: "content",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      title: <span className="capitalize">{t("review")}</span>,
      dataIndex: "review",
      render: (text, { comments, review }) => {
        return (
          <div className="text-center">
            <Tag className="text-center font-medium" color="green">
              {comments} comments
            </Tag>
            <div>
              {_.map(review, function (value, key) {
                return (
                  <div className="text-center" key={key}>
                    <span className="capitalize">{key}</span>: <span className="text-alibus font-medium">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
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
                onClick={() => handleEditBusCompany(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", { title: t("company") })}
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
      dispatch(findBusCompanyByKeyword(searchText));
    }, 300);
  };

  useEffect(() => {
    dispatch(getAllBusCompany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold uppercase">
        {t("manage", { title: t("company") })}
      </h3>
      <Button
        onClick={handleAddBusCompany}
        type="danger"
        className="flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
      >
        <AppstoreAddOutlined /> {t("add", { title: t("company") })}
      </Button>
      <Search
        placeholder={t("search")}
        onChange={onSearch}
        enterButton
        className="mb-6 search-btn"
      />
      <Table columns={columns} dataSource={busCompanies} rowKey="id" />
    </div>
  );
}
