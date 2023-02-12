"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import Select, {
//   DropdownIndicatorProps,
//   components,
//   SingleValue,
//   GroupBase,
// } from "react-select";
// import data from "../champs.json";
import data from "../champsV2.json";
export type DataType = typeof data;
import { TiArrowLeft } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { motion } from "framer-motion";

type OptionType = {
  value: string;
  label: string;
};

const OPTIONS: OptionType[] = [
  { value: "assassins", label: "ASSASSINS" },
  { value: "fighters", label: "FIGHTERS" },
  { value: "mages", label: "MAGES" },
  { value: "marksmen", label: "MARKSMEN" },
  { value: "supports", label: "SUPPORTS" },
  { value: "tanks", label: "TANKS" },
];

type GrpSectionProps = {
  cat: string;
  champs: { name: string; img: string }[];
  setSelected: Dispatch<
    SetStateAction<{
      category: string;
      champ: string;
    }>
  >;
  className?: string;
};

const GrpSection = ({
  cat,
  champs,
  setSelected,
  className,
}: GrpSectionProps) => (
  <div className={`${className}`}>
    <h1 className="font-ibm-semi text-4xl">{cat}</h1>
    <ul className="h-[95%] inline-flex flex-col flex-wrap gap-x-2 ml-1">
      {champs.map((champ, index) => (
        <li key={index} className="font-sans text-[1.3rem] min-w-full">
          <button
            onClick={() =>
              setSelected({
                category: cat.toLocaleLowerCase(),
                champ: champ.name,
              })
            }
            className="hover:underline"
          >
            {champ.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  // const [group, setGroup] = useState<
  //   SingleValue<{ value: string; label: string }>
  // >(OPTIONS[0]);

  // const [selected, setSelected] = useState({ category: "", champ: "" });
  const [selected, setSelected] = useState({
    category: "supports",
    champ: "THRESH",
  });
  const [champs, setChamps] = useState<
    {
      selected: boolean;
      name: string;
      img: string;
    }[]
  >([]);

  // useEffect(() => {
  //   switch (group?.value) {
  //     case "assassins":
  //       setChamps(() => {
  //         return assassins.champs.map((champ) => ({
  //           ...champ,
  //           selected: false,
  //           // selected: true,
  //         }));
  //       });
  //       break;
  //     case "fighters":
  //       setChamps(() => {
  //         return fighters.champs.map((champ) => ({
  //           ...champ,
  //           selected: false,
  //         }));
  //       });
  //       break;
  //     case "mages":
  //       setChamps(() => {
  //         return mages.champs.map((champ) => ({
  //           ...champ,
  //           selected: false,
  //         }));
  //       });
  //       break;
  //     case "marksmen":
  //       setChamps(() => {
  //         return marksmen.champs.map((champ) => ({
  //           ...champ,
  //           selected: false,
  //         }));
  //       });
  //       break;
  //     case "supports":
  //       setChamps(() => {
  //         return supports.champs.map((champ) => ({
  //           ...champ,
  //           selected: false,
  //         }));
  //       });
  //       break;
  //     case "tanks":
  //       setChamps(() => {
  //         return tanks.champs.map((champ) => ({
  //           ...champ,
  //           selected: false,
  //         }));
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }, [group]);

  const setChampFn = (selected: { category: string; champ: string }) => {
    setChamps(() => {
      const champJson = data[selected.category as keyof DataType].champs.find(
        (champ) => champ.name === selected.champ
      );

      const arr = data[selected.category as keyof DataType].champs
        .map((champ) => ({
          ...champ,
          selected: false,
        }))
        .slice(0, 30);

      const found = arr.find((champ) => champ.name === selected.champ);
      if (!found && champJson) {
        arr[0] = { ...champJson, selected: false };
      }

      var j, x, index;
      for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
      }

      return arr;
    });
  };

  useEffect(() => {
    if (selected.champ) setChampFn(selected);
  }, [selected]);

  // const DropdownIndicator = (
  //   props: DropdownIndicatorProps<
  //     { value: string; label: string },
  //     boolean,
  //     GroupBase<{ value: string; label: string }>
  //   >
  // ) => {
  //   return (
  //     <components.DropdownIndicator {...props} className="zeroPad">
  //       <TiArrowSortedDown className="text-gray-500" size={32} />
  //     </components.DropdownIndicator>
  //   );
  // };

  if (!selected.champ) {
    return (
      <div className="max-h-screen flex divide-x-4 w-full">
        <GrpSection
          cat="ASSASSINS"
          champs={data.assassins.champs}
          setSelected={setSelected}
          // className="w-1/6"
          className="w-[15%]"
        />
        <GrpSection
          cat="FIGHTERS"
          champs={data.fighters.champs}
          setSelected={setSelected}
          className="w-[20%]"
        />
        <GrpSection
          cat="MAGES"
          champs={data.mages.champs}
          setSelected={setSelected}
          className="w-[18%]"
        />
        <GrpSection
          cat="MARKSMEN"
          champs={data.marksmen.champs}
          setSelected={setSelected}
          // className="w-1/6"
          className="w-[13%]"
        />
        <GrpSection
          cat="SUPPORTS"
          champs={data.supports.champs}
          setSelected={setSelected}
          // className="w-1/6"
          className="w-[15%]"
        />
        <GrpSection
          cat="TANKS"
          champs={data.tanks.champs}
          setSelected={setSelected}
          // className="w-[10%] border-2 border-yellow"
          className="w-[10%]"
        />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col justify-evenly items-center relative">
      {/* Select Dropdown */}
      {/* <div className="w-72 self-start -mt-10 ml-28">
        <Select
          isMulti={false}
          options={OPTIONS}
          onChange={(newValue) => setGroup(newValue)}
          defaultValue={OPTIONS[0]}
          closeMenuOnSelect
          className="text-xl font-ibm-light h-10"
          components={{ DropdownIndicator }}
          isClearable={false}
          isSearchable={false}
          styles={{
            control: (base, state) => ({
              ...base,
              border: 0,
              display: "flex",
              width: "90%",
              paddingBottom: "5px",
              borderRadius: 0,
              borderBottom: state.menuIsOpen ? "" : "5px solid black",
              margin: "0 auto",
              boxShadow: "0 !important",
              "&:hover": {
                borderColor: "black",
              },
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }),
            option: (base, state) => ({
              ...base,
              width: "90%",
              margin: "0 auto",
              borderBottom: "2px solid black",
              ":last-child": {
                border: "0",
              },
              backgroundColor: state.isFocused ? "white" : "",
              color: state.isFocused ? "black" : "",
              fontFamily: state.isSelected ? "IBM Plex Sans Semi" : "",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              fontFamily: "IBM Plex Sans Semi",
              fontSize: "2rem",
            }),
            menu: (base) => ({
              ...base,
              background: "white",
              borderLeft: "5px solid black",
              borderRight: "5px solid black",
              borderBottom: "5px solid black",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: 0,
              boxShadow: "0",
            }),
            indicatorSeparator: () => ({ display: "none" }),
          }}
        />
      </div> */}

      <button
        className="absolute top-2 left-2 font-ibm-semi text-3xl flex items-center gap-x-2"
        onClick={() => setSelected({ category: "", champ: "" })}
      >
        <TiArrowLeft size={40} /> Go Back
      </button>

      {/* Champ Grid */}
      <ul className="grid grid-cols-10 h-[84%] w-full rounded-lg select-none">
        {champs.map((champ, index) => (
          <li
            className="relative flex justify-center items-center"
            key={champ.name}
            onClick={() =>
              setChamps((prev) => {
                if (!champ.selected) {
                  // const sound = new Audio("/sounds/champ-ban.mp3");
                  // const sound = new Audio("/sounds/low-thump.mp3");
                  // const sound = new Audio("/sounds/timer.mp3");
                  const sound = new Audio("/sounds/timer2.mp3");
                  sound.load();
                  sound.play();
                }
                return prev.map((prevChamp) => {
                  if (prevChamp.name === champ.name) {
                    return {
                      name: champ.name,
                      img: champ.img,
                      selected: !champ.selected,
                    };
                  }
                  return prevChamp;
                });
              })
            }
          >
            <Image
              src={champ.img}
              className={`absolute h-full w-full object-cover -z-20 bg-gradient-to-t from-white to-gray-800 ${
                index === 0
                  ? "rounded-tl-xl"
                  : index === 9
                  ? "rounded-tr-xl"
                  : index === 20
                  ? "rounded-bl-xl"
                  : index === 29
                  ? "rounded-br-xl"
                  : ""
              }`}
              alt={champ.name}
              width={200}
              height={200}
            />
            {champ.selected ? (
              <div
                className={`absolute inset-0 bg-black/80 ${
                  index === 0
                    ? "rounded-tl-xl"
                    : index === 9
                    ? "rounded-tr-xl"
                    : index === 20
                    ? "rounded-bl-xl"
                    : index === 29
                    ? "rounded-br-xl"
                    : ""
                }`}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-gray-800/0" />
            )}

            {champ.selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "tween",
                  ease: "easeIn",
                  duration: 0.3,
                }}
                className="z-0 absolute -top-2"
              >
                <MdClose className="text-brick" size={230} />
              </motion.div>
            )}

            <h3
              className={`absolute bottom-2 right-3 font-goth text-[2.5rem] text-right leading-[3rem] ${
                champ.selected ? "text-brick" : "text-yellow"
              }`}
              style={{
                WebkitTextStroke: "9px black",
                paintOrder: "stroke",
              }}
            >
              {champ.name}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
