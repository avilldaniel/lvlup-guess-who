"use client";

import Image from "next/image";
import { useState } from "react";
import data from "../../../itemsV3.json";
export type DataType = typeof data;

const Page = () => {
  const [currItem, setCurrItem] = useState<{ name: string; img: string }>({
    name: "",
    img: "",
  });

  return (
    <main className="h-screen mx-1 flex">
      <ul className="w-2/3 flex flex-wrap gap-x-20">
        {Object.keys(data.itemType).map((item, index) => (
          <li key={index}>
            <h1 className="font-goth tracking-wider text-4xl">
              {item.slice(0, 1).toLocaleUpperCase() + item.slice(1)}
            </h1>
            <ul className="flex flex-wrap gap-1">
              {data.itemType[item as keyof DataType["itemType"]].map((item) => (
                <li
                  className="h-12 aspect-square cursor-pointer border-2 hover:border-brick hover:scale-150 hover:rounded-sm"
                  key={item.name}
                  onClick={() =>
                    setCurrItem({ name: item.name, img: item.img })
                  }
                >
                  <Image
                    className="h-full w-full object-contain"
                    width={128}
                    height={128}
                    src={item.img}
                    alt={item.name}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <section className="w-1/3 flex flex-col pt-20 items-center">
        <h1 className="font-goth text-5xl tracking-wider">
          {currItem ? currItem.name : "Item name"}
        </h1>
        <div
          className={`my-8 h-40 aspect-square ${!currItem.name && "border-2"}`}
        >
          {currItem.name ? (
            <Image
              className="h-full w-full object-contain rounded-md rounded-tl-3xl rounded-br-3xl"
              height={100}
              width={100}
              src={currItem.img}
              alt={currItem.name}
            />
          ) : (
            <h1 className="text-center font-ibm-light text-4xl mt-10">
              Select an item!
            </h1>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
