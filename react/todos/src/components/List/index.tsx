import React, { FC, useState } from "react";
import { List, Button, Checkbox, Space } from "antd";
import { Items, Item } from "../../interfaces";
import styled from "./list.module.css";

type ItemId = number | string;

interface IProps {
  list: Items;
  handleDelete(id: ItemId): void;
  handleCheckedChange(id: ItemId, done: boolean): void;
}

const ListFc: FC<IProps> = ({ list, handleDelete, handleCheckedChange }) => {
  const [id, setId] = useState<ItemId>("");

  const handleMouseEnter = (id: ItemId) => {
    setId(id);
  };

  const handleMouseLeave = (id: ItemId) => {
    setId("");
  };

  const deleteBtn = (id: ItemId) => {
    return (
      <Button type="primary" onClick={() => handleDelete(id)}>
        删除
      </Button>
    );
  };

  const renderItem = (item: Item) => {
    return (
      <List.Item
        onMouseEnter={() => handleMouseEnter(item.id)}
        onMouseLeave={() => handleMouseLeave(item.id)}
        actions={item.id === id ? [deleteBtn(item.id)] : []}
      >
        <Space>
          <Checkbox
            checked={item.done}
            onChange={(e) => handleCheckedChange(item.id, e.target.checked)}
          ></Checkbox>
          {item.title}
        </Space>
      </List.Item>
    );
  };

  return (
    <div className={styled["app-list"]}>
      <List dataSource={list} renderItem={renderItem}></List>
    </div>
  );
};

export default ListFc;
