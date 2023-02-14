"use client";

import Image from "next/image";
import { useState } from "react";
import data from "../../../runes.json";
type DataType = typeof data;

const Page = () => {
  const [currItem, setCurrItem] = useState<{ name: string; img: string }>({
    name: "",
    img: "",
  });

  return (
    <main className="h-screen mx-1 flex">
      <ul className="w-2/3 flex flex-wrap justify-center items-center gap-x-20">
        {Object.keys(data).map((grp, index) => (
          <li key={index}>
            <h1 className="font-goth tracking-tight text-5xl text-center mb-4">
              {grp.toLocaleUpperCase()}
            </h1>
            <ul className="flex flex-col flex-wrap items-center gap-3">
              {Object.values(data[grp as keyof DataType]).map((row, index) => (
                <ul className="flex gap-2" key={index}>
                  {row.map((item) => (
                    <li
                      className={`aspect-square cursor-pointer hover:scale-125 ${
                        index === 0 ? "h-24" : "h-16"
                      }`}
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
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <section className="w-1/3 flex flex-col pt-20 items-center select-none">
        <h1 className="font-ibm-semi text-5xl tracking-wide text-center">
          {currItem ? currItem.name : "Item name"}
        </h1>
        <div className={`my-8 h-20 aspect-square`}>
          {currItem.name ? (
            <Image
              className="h-full w-full object-contain rounded-tl-lg rounded-br-lg"
              height={128}
              width={128}
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
