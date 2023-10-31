import React from "react";
import { PieChart as RechartPieChart, Pie, Cell, Legend } from "recharts";
import theme from "@/theme";
import { SalaryAllocationData } from "../../constants";
import { Divider, Space, Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import EditConfiguration from "@/components/common/EditConfiguration";
import type { Props as EditConfigurationProps } from "@/components/common/EditConfiguration";

type Props = {
  title: string;
  titleTypographyLevel?: TitleProps["level"];
  data: SalaryAllocationData[];
  footerConfig?: EditConfigurationProps;
  isEditMode?: boolean;
};

type RenderCustomizedLabelParams = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  value?: number | string;
};

const COLORS = ["#6200EE", "#26A69A", "#EE6002", "#FFC107"];
const RADIAN = Math.PI / 180;
const { colorTextBase } = theme.token;

const { Title } = Typography;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: RenderCustomizedLabelParams): React.ReactElement => {
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={colorTextBase}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`} (${value})
    </text>
  );
};

const PieChart = ({
  title,
  titleTypographyLevel,
  data,
  footerConfig = { fieldEditPermissions: {} },
  isEditMode,
}: Props) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={titleTypographyLevel}>{title}</Title>
      <RechartPieChart width={600} height={400}>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RechartPieChart>
      {isEditMode && <EditConfiguration {...footerConfig} />}
    </Space>
  );
};

export type { Props };
export default PieChart;
