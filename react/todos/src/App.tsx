import React, { FC, useState } from "react";
import HeaderFc from "./components/Header";
import ListFc from "./components/List";
import styled from "./App.module.css";
import { Items, Item } from "./interfaces";

const App: FC = () => {
  const [list, setList] = useState<Items>([
    {
      id: 1,
      title: "写 React",
      done: false,
    },
    {
      id: 2,
      title: "写 Vue",
      done: false,
    },
  ]);

  const add = (value: string) => {
    if (!value) {
      return;
    }

    const newItem = {
      id: list.length + 1,
      title: value,
      done: false,
    };

    setList([newItem, ...list]);
  };

  const handleDelete = (id: Item["id"]) => {
    const deletedList = list.filter((item) => item.id !== id);

    setList(deletedList);
  };

  const handleCheckedChange = (id: Item["id"], done: boolean) => {
    const result = list.map((item) => {
      return item.id === id ? { ...item, done } : item;
    });

    setList(result);
  };

  return (
    <>
      <div className={styled["app-container"]}>
        <div className={styled.wrapper}>
          <HeaderFc add={add}></HeaderFc>
          <ListFc
            list={list}
            handleDelete={handleDelete}
            handleCheckedChange={handleCheckedChange}
          ></ListFc>
        </div>
      </div>
      ;
    </>
  );
};

export default App;
