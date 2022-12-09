/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getAllBusCompany,
  findBusCompanyById,
} from "../../redux/actions/BusCompanyAction";
import { CarOutlined } from "@ant-design/icons";
import _ from "lodash";
import { getFromToOfArray } from "../../models/GlobalModel";
import { useTranslation } from "react-i18next";

function CompanyList({ company, companyList }) {
  const { t } = useTranslation();
  return (
    <div>
      <section className="my-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <CarOutlined className="text-6xl" />
          <p className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl max-w-5xl md:text-4xl dark:text-gray-300">
            AliBus - {t("busCompanyTxt")}
          </p>
        </div>
      </section>
      <div>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <NavLink
              to={encodeURI(`/company/${company.id}/${company.name}`)}
              className="block max-w-sm gap-3 mx-auto sm:max-w-full hover:text-black group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900"
            >
              <img
                src={company.image}
                alt={company.image}
                className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
              />
              <div className="p-6 space-y-2 lg:col-span-5">
                <h3 className="text-2xl font-semibold sm:text-4xl">
                  {company.name}
                </h3>
                <span className="text-xs text-gray-400">{company.address}</span>
                <p className="my-4">{company.description}</p>
              </div>
            </NavLink>
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companyList?.map((com, idx) => {
                return (
                  <NavLink
                    key={idx}
                    to={encodeURI(`/company/${com.id}/${com.name}`)}
                    className="mb-10 rounded-md shadow-md hover:shadow-lg max-w-sm mx-auto group hover:no-underline hover:text-black focus:no-underline dark:bg-gray-900"
                  >
                    <img
                      role="presentation"
                      className="object-cover w-full rounded h-44 bg-gray-500"
                      src={com.image}
                      alt={com.image}
                    />
                    <div className="p-6 space-y-2">
                      {com.name && (
                        <h3 className="text-2xl font-semibold">{com.name}</h3>
                      )}
                      {com.description && (
                        <p className="h-24 overflow-hidden">
                          {com.description}
                        </p>
                      )}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
function CompanySingle({ company, companyList }) {
  const { t } = useTranslation();
  if (company && company.length) {
    const { address, content, description, name, image } = company[0];
    return (
      <div>
        <section className="my-8 dark:bg-gray-800 dark:text-gray-100">
          <div className="container flex flex-col items-center p-4 mx-auto space-y-4 md:p-8">
            <CarOutlined className="text-6xl" />
            <p className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl dark:text-gray-300">
              {name}
            </p>
            <p className="px-6 text-base text-gray-400 text-center lg:max-w-2xl xl:max-w-4xl ">
              {address}
            </p>
          </div>
        </section>
        <div>
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-6xl p-6 pt-0 mx-auto space-y-6 sm:space-y-12">
              {description && (
                <h3 className="text-lg font-semibold italic my-4">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </h3>
              )}
              <img
                src={image}
                alt={image}
                className="object-cover m-auto rounded lg:col-span-7 bg-gray-500"
              />
              {content && (
                <div className="grid justify-center gap-6">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              )}
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">{t("relatedPost")}</h4>
                {companyList && companyList.length && (
                  <ul className="ml-4 space-y-1 list-disc">
                    {getFromToOfArray(companyList, 0, 5)?.map((a, idx) => {
                      return (
                        <li key={idx}>
                          <NavLink
                            className="hover:underline hover:text-alibus"
                            to={encodeURI(`/company/${a.id}/${a.name}`)}
                          >
                            {a.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <section className="my-8 dark:bg-gray-800 dark:text-gray-100">
          <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
            <CarOutlined className="text-6xl" />
            <p className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl md:text-4xl dark:text-gray-300">
              {t("noBusCompany")}
            </p>
          </div>
        </section>
        <div>
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
              <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {companyList?.map((com, idx) => {
                  return (
                    <NavLink
                      key={idx}
                      to={encodeURI(`/company/${com.id}/${com.name}`)}
                      className="mb-10 rounded-md shadow-md hover:shadow-lg max-w-sm mx-auto group hover:no-underline hover:text-black focus:no-underline dark:bg-gray-900"
                    >
                      <img
                        role="presentation"
                        className="object-cover w-full rounded h-44 bg-gray-500"
                        src={com.image}
                        alt={com.image}
                      />
                      <div className="p-6 space-y-2">
                        {com.name && (
                          <h3 className="text-2xl font-semibold">{com.name}</h3>
                        )}
                        {com.description && (
                          <p className="h-24 overflow-hidden">
                            {com.description}
                          </p>
                        )}
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default function CompanyPage() {
  const dispatch = useDispatch();
  const { busCompanies, busCompanySelected } = useSelector(
    (state) => state.BusCompanyReducer
  );
  const busCompaniesData = _.orderBy(busCompanies, ["id"], ["desc"]);
  const companyLast =
    busCompaniesData && busCompaniesData.length ? busCompaniesData[0] : {};

  const { companyId } = useParams();
  useEffect(() => {
    dispatch(getAllBusCompany());
    if (companyId) {
      dispatch(findBusCompanyById({ id: companyId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  if (companyId) {
    return (
      <CompanySingle
        company={busCompanySelected}
        companyList={getFromToOfArray(
          busCompaniesData,
          0,
          busCompaniesData.length - 1
        )}
      />
    );
  } else {
    return (
      <CompanyList
        company={companyLast}
        companyList={getFromToOfArray(
          busCompaniesData,
          0,
          busCompaniesData.length - 1
        )}
      />
    );
  }
}
