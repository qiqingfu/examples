import React, { FC, useState } from "react";
import { Input } from "antd";
import styled from "./header.module.css";

interface IProps {
  add(value: string): void;
}

const HeaderFc: FC<IProps> = ({ add }) => {
  const [value, setValue] = useState("");

  const onPressEnter = () => {
    add(value);
    setValue("");
  };

  return (
    <div className={styled["app-header"]}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="请输入任务"
        onPressEnter={onPressEnter}
        className={styled["header-input"]}
      />
    </div>
  );
};

export default HeaderFc;
