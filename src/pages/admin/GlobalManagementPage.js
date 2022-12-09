import { Button, Image, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { setContentDrawer, showDrawer } from "../../redux/actions/DrawerAction";
import {
  deleteArticle,
  deleteBanner,
  deleteBusType,
  deleteHashtag,
  deleteOrderStatus,
  deletePaymentMethod,
  deletePaymentStatus,
  deletePoint,
  deleteProvince,
  deleteStatus,
  deleteUserType,
  findArticleById,
  findBannerById,
  findBusTypeById,
  findHashtagById,
  findOrderStatusById,
  findPaymentMethodById,
  findPaymentStatusById,
  findPointById,
  findProvinceById,
  findStatusById,
  findUserTypeById,
  getAllArticle,
  getAllBanner,
  getAllBusType,
  getAllHashtag,
  getAllOrderStatus,
  getAllPaymentMethod,
  getAllPaymentStatus,
  getAllPoint,
  getAllProvince,
  getAllStatus,
  getAllUserType,
} from "../../redux/actions/GlobalAction";
import EditArticleForm from "../../components/admin/forms/EditArticleForm";
import AddArticleForm from "../../components/admin/forms/AddArticleForm";
import AddBannerForm from "../../components/admin/forms/AddBannerForm";
import EditBannerForm from "../../components/admin/forms/EditBannerForm";
import AddUserTypeForm from "../../components/admin/forms/AddUserTypeForm";
import EditUserTypeForm from "../../components/admin/forms/EditUserTypeForm";
import AddStatusForm from "../../components/admin/forms/AddStatusForm";
import EditStatusForm from "../../components/admin/forms/EditStatusForm";
import AddProvinceForm from "../../components/admin/forms/AddProvinceForm";
import EditProvinceForm from "../../components/admin/forms/EditProvinceForm";
import AddHashTagForm from "../../components/admin/forms/AddHashTagForm";
import EditHashTagForm from "../../components/admin/forms/EditHashTagForm";
import AddBusTypeForm from "../../components/admin/forms/AddBusTypeForm";
import EditBusTypeForm from "../../components/admin/forms/EditBusTypeForm";
import AddPaymentMethodForm from "../../components/admin/forms/AddPaymentMethodForm";
import EditPaymentMethodForm from "../../components/admin/forms/EditPaymentMethodForm";
import moment from "moment";
import AddPointForm from "../../components/admin/forms/AddPointForm";
import EditPointForm from "../../components/admin/forms/EditPointForm";
import AddOrderStatusForm from "../../components/admin/forms/AddOrderStatusForm";
import EditOrderStatusForm from "../../components/admin/forms/EditOrderStatusForm";
import AddPaymentStatusForm from "../../components/admin/forms/AddPaymentStatusForm";
import EditPaymentStatusForm from "../../components/admin/forms/EditPaymentStatusForm";

export default function GlobalManagementPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    provinceList,
    pointList,
    orderStatusList,
    paymentStatusList,
    statusList,
    userTypeList,
    hashtagList,
    bannerList,
    articles,
    busTypeList,
    paymentMethodList,
  } = useSelector((state) => state.GlobalReducer);
  const { resetAction } = useSelector((state) => state.DrawerReducer);
  const confirmDeleteArticle = (item) => {
    dispatch(deleteArticle(item));
  };
  const confirmDeleteBanner = (item) => {
    dispatch(deleteBanner(item));
  };
  const confirmDeleteStatus = (item) => {
    dispatch(deleteStatus(item));
  };
  const confirmDeleteHashtag = (item) => {
    dispatch(deleteHashtag(item));
  };
  const confirmDeleteProvince = (item) => {
    dispatch(deleteProvince(item));
  };
  const confirmDeleteUserType = (item) => {
    dispatch(deleteUserType(item));
  };
  const confirmDeleteBusType = (item) => {
    dispatch(deleteBusType(item));
  };
  const confirmDeletePaymentMethod = (item) => {
    dispatch(deletePaymentMethod(item));
  };
  const confirmDeletePoint = (item) => {
    dispatch(deletePoint(item));
  };
  const confirmDeleteOrderStatus = (item) => {
    dispatch(deleteOrderStatus(item));
  };
  const confirmDeletePaymentStatus = (item) => {
    dispatch(deletePaymentStatus(item));
  };

  const handleAdd = (name, AddForm) => {
    resetAction();
    dispatch(showDrawer());
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">{`${t("add", {
          title: name,
        })}`}</span>,
        <AddForm />
      )
    );
  };
  const handleEdit = (name, findIdCallback, EditForm) => {
    dispatch(showDrawer());
    dispatch(findIdCallback);
    dispatch(
      setContentDrawer(
        <span className="uppercase text-xl text-alibus">
          {t("update", { title: name })}
        </span>,
        <EditForm />
      )
    );
  };
  const handleAddArticle = () => {
    handleAdd(t("news"), AddArticleForm);
  };
  const handleEditArticle = (item) => {
    handleEdit(t("news"), findArticleById(item), EditArticleForm);
  };
  const handleAddBanner = () => {
    handleAdd("banner", AddBannerForm);
  };
  const handleEditBanner = (item) => {
    handleEdit("banner", findBannerById(item), EditBannerForm);
  };
  const handleAddUserType = () => {
    handleAdd(t("type", { title: t("user") }), AddUserTypeForm);
  };
  const handleEditUserType = (item) => {
    handleEdit(
      t("type", { title: t("user") }),
      findUserTypeById(item),
      EditUserTypeForm
    );
  };
  const handleAddStatus = () => {
    handleAdd(`${t("status")} ${t("seat")}`, AddStatusForm);
  };
  const handleEditStatus = (item) => {
    handleEdit(
      `${t("status")} ${t("seat")}`,
      findStatusById(item),
      EditStatusForm
    );
  };
  const handleAddProvince = () => {
    handleAdd(t("city"), AddProvinceForm);
  };
  const handleEditProvince = (item) => {
    handleEdit(t("city"), findProvinceById(item), EditProvinceForm);
  };
  const handleAddHashtag = () => {
    handleAdd(t("type", { title: t("card") }), AddHashTagForm);
  };
  const handleEditHashtag = (item) => {
    handleEdit(
      t("type", { title: t("card") }),
      findHashtagById(item),
      EditHashTagForm
    );
  };
  const handleAddBusType = () => {
    handleAdd(t("type", { title: t("bus") }), AddBusTypeForm);
  };
  const handleEditBusType = (item) => {
    handleEdit(
      t("type", { title: t("bus") }),
      findBusTypeById(item),
      EditBusTypeForm
    );
  };
  const handleAddPaymentMethod = () => {
    handleAdd(t("paymentmethod"), AddPaymentMethodForm);
  };
  const handleEditPaymentMethod = (item) => {
    handleEdit(
      t("paymentmethod"),
      findPaymentMethodById(item),
      EditPaymentMethodForm
    );
  };
  const handleAddPoint = () => {
    handleAdd(t("pickUpDropOff"), AddPointForm);
  };
  const handleEditPoint = (item) => {
    handleEdit(t("pickUpDropOff"), findPointById(item), EditPointForm);
  };
  const handleAddOrderStatus = () => {
    handleAdd(t("orderStatus"), AddOrderStatusForm);
  };
  const handleEditOrderStatus = (item) => {
    handleEdit(
      t("orderStatus"),
      findOrderStatusById(item),
      EditOrderStatusForm
    );
  };
  const handleAddPaymentStatus = () => {
    handleAdd(t("paymentStatus"), AddPaymentStatusForm);
  };
  const handleEditPaymentStatus = (item) => {
    handleEdit(
      t("paymentStatus"),
      findPaymentStatusById(item),
      EditPaymentStatusForm
    );
  };
  const articleColumns = [
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
      title: <span className="capitalize">{t("tag")}</span>,
      dataIndex: "hashtag",
      render: (text, record) => {
        return (
          <div>
            {record.hashtagObj?.map((i, idx) => {
              return (
                <Tag key={idx} className="m-1" color="green">
                  {i.name}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("title")}</span>,
      dataIndex: "title",
      sorter: {
        compare: (a, b) => {
          let titleA = a.title.toLowerCase().trim();
          let titleB = b.title.toLowerCase().trim();
          if (titleA > titleB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text) => {
        return <div className="text-center">{text}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("subTitle")}</span>,
      dataIndex: "subTitle",
      sorter: {
        compare: (a, b) => {
          let subTitleA = a.subTitle?.toLowerCase().trim();
          let subTitleB = b.subTitle?.toLowerCase().trim();
          if (subTitleA > subTitleB) {
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
            {text ? <Image width={150} src={text} preview={false} /> : ""}
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("desc")}</span>,
      dataIndex: "description",
      sorter: {
        compare: (a, b) => {
          let descriptionA = a.description?.toLowerCase().trim();
          let descriptionB = b.description?.toLowerCase().trim();
          if (descriptionA > descriptionB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
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
      title: <span className="capitalize">{t("updateAt")}</span>,
      dataIndex: "updatedAt",
      sorter: {
        compare: (a, b) => {
          let updatedAtA = a.updatedAt;
          let updatedAtB = b.updatedAt;
          if (updatedAtA > updatedAtB) {
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
          <div className="text-center">
            {text ? moment(text).format("DD/MM/YYYY hh:mm") : ""}
          </div>
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
                onClick={() => handleEditArticle(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", { title: t("news") })}
                onConfirm={() => confirmDeleteArticle(record)}
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
  const bannerColumns = [
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
      title: <span className="capitalize">{t("title")}</span>,
      dataIndex: "title",
      width: 250,
      sorter: {
        compare: (a, b) => {
          let titleA = a.title.toLowerCase().trim();
          let titleB = b.title.toLowerCase().trim();
          if (titleA > titleB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text) => {
        return <div className="text-center">{text}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("image")}</span>,
      dataIndex: "banner",
      render: (text) => {
        return (
          <div className="text-center">
            <Image width={150} src={text} preview={false} />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("desc")}</span>,
      dataIndex: "description",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      title: <span className="capitalize">{t("show")}</span>,
      dataIndex: "enable",
      sorter: {
        compare: (a, b) => {
          if (a.enable > b.enable) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text, record) => {
        const color = text ? "green" : "red";
        const content = text ? "YES" : "NO";
        return (
          <div className="text-center">
            <Tag color={color}>{content}</Tag>
          </div>
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
                onClick={() => handleEditBanner(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", { title: t("banner") })}
                onConfirm={() => confirmDeleteBanner(record)}
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
  const pointColumns = [
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
      title: <span className="capitalize">{t("place")}</span>,
      dataIndex: "station",
      sorter: {
        compare: (a, b) => {
          let stationA = a.station.toLowerCase().trim();
          let stationB = b.station.toLowerCase().trim();
          if (stationA > stationB) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text) => {
        return <div className="text-center">{text}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("address")}</span>,
      dataIndex: "address",
      render: (text) => {
        return (
          <div className="text-center">
            {text}
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("position")}</span>,
      dataIndex: "position",
      render: (text) => {
        return (
          <div className="text-center">
            {text}
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("time", {title: ''})}</span>,
      dataIndex: "time",
      render: (text) => {
        return moment(text).format("hh:mm");
      },
    },
    {
      title: <span className="capitalize">{t("shuttle")}</span>,
      dataIndex: "shuttle",
      sorter: {
        compare: (a, b) => {
          if (a.shuttle > b.shuttle) {
            return 1;
          }
          return -1;
        },
        multiple: 2,
      },
      render: (text, record) => {
        const color = text ? "green" : "red";
        const content = text ? "YES" : "NO";
        return (
          <div className="text-center">
            <Tag color={color}>{content}</Tag>
          </div>
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
                onClick={() => handleEditPoint(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", { title: t("place") })}
                onConfirm={() => confirmDeletePoint(record)}
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
  const paymentMethodColumns = [
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
      title: <span className="capitalize">{t("logo")}</span>,
      dataIndex: "logo",
      render: (text) => {
        return (
          <div className="text-center">
            <Image width={60} src={text} preview={false} />
          </div>
        );
      },
    },
    {
      title: <span className="capitalize">{t("paymentmethod")}</span>,
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
        return <div className="text-center">{text}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("desc")}</span>,
      dataIndex: "subTitle",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      title: <span className="capitalize">{t("promo")}</span>,
      dataIndex: "promo",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      title: <span className="capitalize">{t("introUseURL")}</span>,
      dataIndex: "conditionLink",
      render: (text) => {
        return <div className="text-center">{text}</div>;
      },
    },
    {
      title: <span className="capitalize">{t("intropayment")}</span>,
      dataIndex: "paymentIntro",
      render: (text) => {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
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
                onClick={() => handleEditPaymentMethod(record)}
              >
                <EditOutlined />
              </button>
              <Popconfirm
                title={t("delete", { title: t("paymentmethod") })}
                onConfirm={() => confirmDeletePaymentMethod(record)}
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
  const columns = (name, deleteCallback, editCallback) => {
    return [
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
        title: <span className="capitalize">{name}</span>,
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
        title: <span className="capitalize">{t("action")}</span>,
        dataIndex: "",
        render: (text, record, index) => {
          return (
            <div className="text-center">
              <Space>
                <button
                  className="mx-2 text-blue-600 text-2xl focus-within:outline-none"
                  onClick={() => editCallback(record)}
                >
                  <EditOutlined />
                </button>
                <Popconfirm
                  title={t("delete", { title: name })}
                  onConfirm={() => deleteCallback(record)}
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
  };
  const renderTable = (
    title,
    data,
    columnsData,
    addCallback,
    deleteCallback,
    editCallback
  ) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl py-3 font-bold uppercase">{title}</h3>
        <Button
          onClick={addCallback}
          type="danger"
          className="float-right flex items-center mb-6 focus-within:outline-none bg-alibus text-white hover:bg-alibus"
        >
          <AppstoreAddOutlined /> {`${t("add", { title })}`}
        </Button>
        <Table
          columns={
            columnsData
              ? columnsData
              : columns(title, deleteCallback, editCallback)
          }
          dataSource={data}
          rowKey="id"
        />
      </div>
    );
  };
  useEffect(() => {
    dispatch(getAllPaymentMethod());
    dispatch(getAllBusType());
    dispatch(getAllArticle());
    dispatch(getAllBanner());
    dispatch(getAllHashtag());
    dispatch(getAllUserType());
    dispatch(getAllStatus());
    dispatch(getAllProvince());
    dispatch(getAllPoint());
    dispatch(getAllOrderStatus());
    dispatch(getAllPaymentStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:gap-x-10 lg:grid-cols-3">
        <div className="col-span-1">
          {renderTable(
            t("type", { title: t("user") }),
            userTypeList,
            false,
            handleAddUserType,
            confirmDeleteUserType,
            handleEditUserType
          )}
        </div>
        <div className="col-span-1">
          {renderTable(
            t("type", { title: `${t("status")} ${t("seat")}` }),
            statusList,
            false,
            handleAddStatus,
            confirmDeleteStatus,
            handleEditStatus
          )}
        </div>
        <div className="col-span-1">
          {renderTable(
            t("type", { title: t("bus") }),
            busTypeList,
            false,
            handleAddBusType,
            confirmDeleteBusType,
            handleEditBusType
          )}
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-1 lg:gap-x-10 lg:grid-cols-3">
        <div className="col-span-1">
          {renderTable(
            t("type", { title: `${t("tag")} ${t("news")}` }),
            hashtagList,
            false,
            handleAddHashtag,
            confirmDeleteHashtag,
            handleEditHashtag
          )}
        </div>
        <div className="col-span-1">
          {renderTable(
            t("orderStatus"),
            orderStatusList,
            false,
            handleAddOrderStatus,
            confirmDeleteOrderStatus,
            handleEditOrderStatus
          )}
        </div>
        <div className="col-span-1">
          {renderTable(
            t("paymentStatus"),
            paymentStatusList,
            false,
            handleAddPaymentStatus,
            confirmDeletePaymentStatus,
            handleEditPaymentStatus
          )}
        </div>
      </div>
      <hr />
      {renderTable(
        t("paymentmethod"),
        paymentMethodList,
        paymentMethodColumns,
        handleAddPaymentMethod
      )}
      <hr />
      {renderTable("banner", bannerList, bannerColumns, handleAddBanner)}
      <hr />
      <div className="grid grid-cols-1 lg:gap-x-10 lg:grid-cols-3">
        <div className="col-span-2">
          {renderTable(t("pickUpDropOff"), pointList, pointColumns, handleAddPoint)}
        </div>
        <div className="col-span-1">
          {renderTable(
            t("city"),
            provinceList,
            false,
            handleAddProvince,
            confirmDeleteProvince,
            handleEditProvince
          )}
        </div>
      </div>
      <hr />
      {articles.length &&
        hashtagList.length &&
        renderTable(t("news"), articles, articleColumns, handleAddArticle)}
    </>
  );
}
