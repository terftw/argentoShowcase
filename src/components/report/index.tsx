import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { Button, Col, Row, Space, Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import BarChart from "@/components/report/Chart/BarChart";
import PieChart from "@/components/report/Chart/PieChart";
import Table from "@/components/report/Table";

import type { Props as BarChartProps } from "@/components/report/Chart/BarChart";
import type { Props as EditConfigurationProps } from "@/components/common/EditConfiguration";
import {
  InsuranceCoverageData,
  SalaryAllocationData,
  TableDataType,
} from "./constants";
import { ExportOutlined } from "@ant-design/icons";
import jspdf from "jspdf";

type Props = {
  title: string;
  titleTypographyLevel?: TitleProps["level"];
  monthlyExpenses: SalaryAllocationData[];
  insuranceCoverage: InsuranceCoverageData[];
  assets: TableDataType[];
  liabilities: TableDataType[];
  footerConfigs?: {
    expenses: EditConfigurationProps;
    insurance: EditConfigurationProps;
    assets: EditConfigurationProps;
    liabilities: EditConfigurationProps;
  };
  hideConfig?: {
    hideExpensesBreakdown: boolean;
    hideInsuranceCoverage: boolean;
    hideAssetsBreakdown: boolean;
    hideLiabilitiesBreakdown: boolean;
  };
  isEditMode?: boolean;
  setOptimalInsuranceCoverage?: BarChartProps["setOptimalInsuranceCoverage"];
  onSubmit?: (data: object) => void;
};

const { Title } = Typography;

const Report = ({
  title,
  titleTypographyLevel,
  monthlyExpenses,
  insuranceCoverage,
  assets,
  liabilities,
  footerConfigs,
  hideConfig,
  isEditMode,
  setOptimalInsuranceCoverage,
  onSubmit,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    const filter = (node: HTMLElement) => {
      const exclusionClasses = ["export-button"];
      return !exclusionClasses.some((classname) =>
        node.classList?.contains(classname)
      );
    };

    toPng(ref.current, { cacheBust: true, filter: filter })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        const pdf = new jspdf({
          compress: true,
          format: "A4",
        });
        const imgProps = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(img, "png", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${title}.pdf`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <Space
      direction="vertical"
      style={{ width: "100%", background: "white", padding: 16 }}
      size={24}
      ref={ref}
    >
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={titleTypographyLevel}>{title}</Title>
        {!isEditMode && (
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={onButtonClick}
            className="export-button"
          >
            Export to PDF
          </Button>
        )}
      </Space>
      <Row gutter={32}>
        {hideConfig?.hideExpensesBreakdown ? null : (
          <Col span={12}>
            <PieChart
              title="Monthly Expenses"
              titleTypographyLevel={4}
              data={monthlyExpenses}
              isEditMode={isEditMode}
              footerConfig={footerConfigs?.expenses}
            />
          </Col>
        )}
        {hideConfig?.hideInsuranceCoverage ? null : (
          <Col span={12}>
            <BarChart
              title="Insurance Coverage"
              titleTypographyLevel={4}
              data={insuranceCoverage}
              isEditMode={isEditMode}
              footerConfig={footerConfigs?.insurance}
              setOptimalInsuranceCoverage={setOptimalInsuranceCoverage}
            />
          </Col>
        )}
      </Row>
      {hideConfig?.hideAssetsBreakdown ? null : (
        <Row gutter={32}>
          <Col span={24}>
            <Table
              title="Total Assets"
              titleTypographyLevel={4}
              data={assets}
              columns={[
                {
                  title: "Type of Asset",
                  dataIndex: "name",
                  width: "50%",
                },
                {
                  title: "Value (in SGD)",
                  dataIndex: "value",
                  width: "50%",
                  defaultSortOrder: "descend",
                  sorter: (a, b) => a.value - b.value,
                },
              ]}
              isEditMode={isEditMode}
              footerConfig={footerConfigs?.assets}
            />
          </Col>
        </Row>
      )}
      {hideConfig?.hideLiabilitiesBreakdown ? null : (
        <Row gutter={32}>
          <Col span={24}>
            <Table
              title="Total Liabilities"
              titleTypographyLevel={4}
              data={liabilities}
              columns={[
                {
                  title: "Type of Liability",
                  dataIndex: "name",
                  width: "50%",
                },
                {
                  title: "Value (in SGD)",
                  dataIndex: "value",
                  width: "50%",
                  defaultSortOrder: "descend",
                  sorter: (a, b) => a.value - b.value,
                },
              ]}
              isEditMode={isEditMode}
              footerConfig={footerConfigs?.liabilities}
            />
          </Col>
        </Row>
      )}
      {isEditMode && (
        <Button type="primary" onClick={onSubmit}>
          Save changes
        </Button>
      )}
    </Space>
  );
};

export default Report;
