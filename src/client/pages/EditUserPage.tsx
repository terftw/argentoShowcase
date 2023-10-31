"use client";

import React, { useContext, useEffect, useReducer, useState } from "react";
import { Space, Typography } from "antd";
import { PageContainer } from "@ant-design/pro-components";

import { FormSpec } from "@/common/formSpec";
import { ClientContext } from "../ClientRoot";
import { usePageData } from "./page.utils";
import DynamicForm from "../dynamic/DynamicForm";
import clientReportFormSpec, { parse } from "@/data/clientReportConfig.spec";
import Report from "@/components/report";
import {
  CoverageTypes,
  InsuranceCoverageNames,
  sampleAssetList,
  sampleLiabilityList,
  sampleSalaryAllocationDataList,
} from "@/components/report/constants";
import {
  initialClientReportConfiguration,
  clientReportConfigurationReducer,
  ClientReportConfiguration,
} from "@/client/pages/reducer";

type EditMode = "FormEdit" | "ReportEdit";

const { Title } = Typography;

export default function EditUserPage() {
  const {
    app,
    page: { trackLoading, showMessage },
  } = useContext(ClientContext);

  const { loader, data: user } = usePageData(async () => {
    return app.getUser();
  });

  const [editMode, setEditMode] = useState<EditMode>("FormEdit");
  const [clientReportConfiguration, dispatch] = useReducer(
    clientReportConfigurationReducer,
    user?.clientReportConfigData
  );

  useEffect(
    function initializeClientReportConfiguration() {
      if (user?.clientReportConfigData)
        dispatch({
          type: "UPDATE_CLIENT_REPORT_CONFIGURATION",
          payload: user.clientReportConfigData as ClientReportConfiguration,
        });
    },
    [user?.clientReportConfigData]
  );

  const onClientFormSpecChange = trackLoading(async (formSpec: FormSpec) => {
    await app.editUser({ clientAttributesSpec: formSpec });
    showMessage("Successfully saved client form configuration", "success");
  });

  const onClientReportConfigSubmit = trackLoading(async () => {
    await app.editUser({ clientReportConfigData: clientReportConfiguration });
    showMessage("Successfully saved financial report configuration", "success");
  });

  const {
    hideExpensesBreakdown,
    hideInsuranceCoverage,
    optimalDtpdCoverage,
    optimalCiCoverage,
    hideAssetsBreakdown,
    hideLiabilitiesBreakdown,
  } = parse(clientReportConfiguration);

  return (
    <PageContainer
      content={<Title level={2}>Edit Forms and Reports</Title>}
      tabActiveKey={editMode}
      onTabChange={(key: string) => setEditMode(key as EditMode)}
      tabList={[
        {
          tab: "Edit Client Form",
          key: "FormEdit",
        },
        {
          tab: "Edit Financial Report",
          key: "ReportEdit",
        },
      ]}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {user ? (
          <Space
            direction="vertical"
            style={{
              backgroundColor: "white",
              padding: "24px",
              width: "80vw",
            }}
          >
            {editMode == "FormEdit" ? (
              <DynamicForm
                isEditMode
                formSpec={user.clientAttributesSpec}
                onFormSpecChange={onClientFormSpecChange}
              />
            ) : null}
            {editMode == "ReportEdit" ? (
              <Report
                title={"Edit Report Settings"}
                monthlyExpenses={sampleSalaryAllocationDataList}
                insuranceCoverage={[
                  {
                    name: InsuranceCoverageNames.dtpd,
                    [CoverageTypes.Current]: 2400,
                    [CoverageTypes.Optimal]: optimalDtpdCoverage ?? 1800,
                  },
                  {
                    name: InsuranceCoverageNames.ci,
                    [CoverageTypes.Current]: 2400,
                    [CoverageTypes.Optimal]: optimalCiCoverage ?? 2800,
                  },
                ]}
                assets={sampleAssetList}
                liabilities={sampleLiabilityList}
                isEditMode
                footerConfigs={{
                  expenses: {
                    showField: !hideExpensesBreakdown,
                    fieldEditPermissions: {
                      canEditShowField: true,
                    },
                    onShowFieldChange: (showField) =>
                      dispatch({
                        type: "UPDATE_CLIENT_REPORT_CONFIGURATION",
                        payload: {
                          expenses: { hide_expenses_breakdown: !showField },
                        },
                      }),
                  },
                  insurance: {
                    showField: !hideInsuranceCoverage,
                    fieldEditPermissions: {
                      canEditShowField: true,
                    },
                    onShowFieldChange: (showField) =>
                      dispatch({
                        type: "UPDATE_CLIENT_REPORT_INSURANCE",
                        payload: {
                          hide_insurance_coverage: !showField,
                        },
                      }),
                  },
                  assets: {
                    showField: !hideAssetsBreakdown,
                    fieldEditPermissions: {
                      canEditShowField: true,
                    },
                    onShowFieldChange: (showField) =>
                      dispatch({
                        type: "UPDATE_CLIENT_REPORT_CONFIGURATION",
                        payload: {
                          assets: { hide_assets_breakdown: !showField },
                        },
                      }),
                  },
                  liabilities: {
                    showField: !hideLiabilitiesBreakdown,
                    fieldEditPermissions: {
                      canEditShowField: true,
                    },
                    onShowFieldChange: (showField) =>
                      dispatch({
                        type: "UPDATE_CLIENT_REPORT_CONFIGURATION",
                        payload: {
                          liabilities: {
                            hide_liabilities_breakdown: !showField,
                          },
                        },
                      }),
                  },
                }}
                setOptimalInsuranceCoverage={{
                  setDTPDCoverageAmount: (amt) =>
                    dispatch({
                      type: "UPDATE_CLIENT_REPORT_INSURANCE",
                      payload: {
                        optimal_dtpd_coverage: amt ?? optimalDtpdCoverage,
                      },
                    }),
                  setCICoverageAmount: (amt) =>
                    dispatch({
                      type: "UPDATE_CLIENT_REPORT_INSURANCE",
                      payload: {
                        optimal_ci_coverage: amt ?? optimalCiCoverage,
                      },
                    }),
                }}
                onSubmit={onClientReportConfigSubmit}
              />
            ) : null}
          </Space>
        ) : (
          loader
        )}
      </div>
    </PageContainer>
  );
}
