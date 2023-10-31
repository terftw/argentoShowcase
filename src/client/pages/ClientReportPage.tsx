"use client";

import React, { useContext } from "react";
import _get from "lodash/get";
import _compact from "lodash/compact";

import { ClientContext } from "../ClientRoot";
import {
  getAssets,
  getInsuranceCoverage,
  getLiabilities,
  getMonthlyExpenses,
  usePageData,
} from "./page.utils";
import { assertArrayItems } from "@/common/assert.utils";
import { KNOWN_FIELD } from "@/data/clientAttributes.spec.default";
import Report from "@/components/report";
import { parse as parseClientReportConfig } from "@/data/clientReportConfig.spec";

export default function ClientReportPage({ id }: { id: string }) {
  const { app } = useContext(ClientContext);

  const { loader, data } = usePageData(async () => {
    const [clients, user] = await Promise.all([
      app.getClients({ ids: [id] }),
      app.getUser(),
    ]);
    const [client] = assertArrayItems(clients, 1);
    return { client, user };
  }, [id]);

  const attrs = data?.client?.attributes;
  const reportConfigData = parseClientReportConfig(
    data?.user?.clientReportConfigData
  );

  const name = _get(attrs, KNOWN_FIELD.NAME);

  return (
    <div style={{ margin: 16, background: "white" }}>
      {attrs ? (
        <Report
          title={`Report for ${name}`}
          monthlyExpenses={getMonthlyExpenses(attrs)}
          insuranceCoverage={getInsuranceCoverage(attrs, reportConfigData)}
          assets={getAssets(attrs)}
          liabilities={getLiabilities(attrs)}
          hideConfig={{
            hideExpensesBreakdown:
              reportConfigData.hideExpensesBreakdown ?? false,
            hideInsuranceCoverage:
              reportConfigData.hideInsuranceCoverage ?? false,
            hideAssetsBreakdown: reportConfigData.hideAssetsBreakdown ?? false,
            hideLiabilitiesBreakdown:
              reportConfigData.hideLiabilitiesBreakdown ?? false,
          }}
        />
      ) : (
        loader
      )}
    </div>
  );
}
