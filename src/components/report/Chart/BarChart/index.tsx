import React from "react";
import {
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import theme from "@/theme";
import type { InsuranceCoverageData } from "@/components/report/constants";
import { CoverageTypes } from "@/components/report/constants";
import { TitleProps } from "antd/es/typography/Title";
import { Col, Divider, InputNumber, Row, Space, Typography } from "antd";
import EditConfiguration from "@/components/common/EditConfiguration";
import type { Props as EditConfigurationProps } from "@/components/common/EditConfiguration";

type Props = {
  title: string;
  titleTypographyLevel?: TitleProps["level"];
  data: InsuranceCoverageData[];
  footerConfig?: EditConfigurationProps;
  isEditMode?: boolean;

  setOptimalInsuranceCoverage?: {
    setDTPDCoverageAmount?: (value: number | null) => void;
    setCICoverageAmount?: (value: number | null) => void;
  };
};

const { Text, Title } = Typography;

const BarChart = ({
  title,
  titleTypographyLevel,
  data,
  footerConfig = { fieldEditPermissions: {} },
  isEditMode,
  setOptimalInsuranceCoverage,
}: Props): React.ReactElement => {
  const { colorPrimary, colorWarning } = theme.token;
  const { setDTPDCoverageAmount, setCICoverageAmount } =
    setOptimalInsuranceCoverage ?? {};

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={titleTypographyLevel}>{title}</Title>
      <RechartBarChart
        // a workaround so that the bars overlap
        barGap={-30}
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" xAxisId={0} />
        <XAxis dataKey="name" xAxisId={1} hide />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Bar
          dataKey={CoverageTypes.Optimal}
          barSize={30}
          xAxisId={0}
          fill={colorPrimary}
          isAnimationActive={false}
        />
        <Bar
          dataKey={CoverageTypes.Current}
          barSize={20}
          xAxisId={1}
          fill={colorWarning}
          fillOpacity={0.8}
          isAnimationActive={false}
        />
      </RechartBarChart>
      {isEditMode && (
        <Space direction="vertical" size={16} style={{ marginTop: 8 }}>
          <Row>
            <Col flex="1">
              <Text style={{ whiteSpace: "nowrap", marginRight: 16 }} strong>
                Set Optimal Death / TPD Coverage Amount:
              </Text>
            </Col>
            <Col flex="auto">
              <InputNumber
                defaultValue={data[0][CoverageTypes.Optimal]}
                onChange={setDTPDCoverageAmount}
                width="100%"
              />
            </Col>
          </Row>
          <Row>
            <Col flex="1">
              <Text style={{ whiteSpace: "nowrap", marginRight: 16 }} strong>
                Set Optimal Critical Illness Coverage Amount:
              </Text>
            </Col>
            <Col flex="auto">
              <InputNumber
                defaultValue={data[1][CoverageTypes.Optimal]}
                onChange={setCICoverageAmount}
                width="100%"
              />
            </Col>
          </Row>
        </Space>
      )}
      {isEditMode && <EditConfiguration {...footerConfig} />}
    </Space>
  );
};

export type { Props };
export default BarChart;
