import React from "react";

import { Space, Typography, Divider } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
  titleTypographyLevel?: TitleProps["level"];
  isEditMode?: boolean;
  handleOnTitleChange?: (title: string) => void;
};

const { Title } = Typography;

const Section = ({
  title,
  titleTypographyLevel,
  isEditMode,
  handleOnTitleChange,
  children,
}: PropsWithChildren<Props>): React.ReactElement => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title
        level={titleTypographyLevel}
        editable={isEditMode && { onChange: handleOnTitleChange }}
      >
        {title}
      </Title>
      {children}
    </Space>
  );
};

export type { Props };
export default Section;
