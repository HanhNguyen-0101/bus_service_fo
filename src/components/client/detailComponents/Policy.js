import React from "react";
import { useTranslation } from "react-i18next";

export default function Policy() {
  const { t } = useTranslation();
  return (
    <div className="hover:text-black text-black mx-3 sm:mx-10 text-sm">
      <h3 className="font-medium text-lg text-alibus">
        {t("cancellationPolicy")}
      </h3>
      <div className="py-2">
        <span className="font-medium">{t("note")}:</span> {t("cancellationPolicyTxt")}
      </div>
      <hr className="my-3" />
      <h3 className="font-medium text-lg text-alibus">{t("policies")}</h3>
      <div>
        <div className="border-b border-dashed py-3">
          <h6 className="font-medium text-base">{t("CA")}</h6>
          <ul className="pt-2 pl-4 list-disc">
            <li>{t("CATxt1")}</li>
          </ul>
        </div>
        <div className="border-b border-dashed py-3">
          <h6 className="font-medium text-base">{t("onboarding")}</h6>
          <ul className="pt-2 pl-4 list-disc">
            <li>{t("onboardingTxt1")}</li>
            <li>{t("onboardingTxt2")}</li>
            <li>{t("onboardingTxt3")}</li>
            <li>{t("onboardingTxt4")}</li>
            <li>{t("onboardingTxt5")}</li>
            <li>{t("onboardingTxt6")}</li>
            <li>{t("onboardingTxt7")}</li>
            <li>{t("onboardingTxt8")}</li>
          </ul>
        </div>
        <div className="border-b border-dashed py-3">
          <h6 className="font-medium text-base">{t("handBaggage")}</h6>
          <ul className="pt-2 pl-4 list-disc">
            <li>{t("handBaggageTxt1")}</li>
            <li>{t("handBaggageTxt2")}</li>
            <li>{t("handBaggageTxt3")}</li>
          </ul>
        </div>
        <div className="border-b border-dashed py-3">
          <h6 className="font-medium text-base">{t("CPP")}</h6>
          <ul className="pt-2 pl-4 list-disc">
            <li>{t("CPPTxt1")}</li>
            <li>{t("CPPTxt2")}</li>
            <li>{t("CPPTxt3")}</li>
            <li>{t("CPPTxt4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
