"use client";

import { useEffect, useState } from "react";
import Select, {
  DropdownIndicatorProps,
  components,
  SingleValue,
  GroupBase,
} from "react-select";
import data from "../champs.json";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import Image from "next/image";

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

function App() {
  const [group, setGroup] = useState<
    SingleValue<{ value: string; label: string }>
  >(OPTIONS[0]);

  const { assassins, fighters, mages, marksmen, supports, tanks } = data;
  const [champs, setChamps] = useState(() => {
    return assassins.champs.map((champ) => ({
      ...champ,
      selected: false,
    }));
  });

  useEffect(() => {
    switch (group?.value) {
      case "assassins":
        setChamps(() => {
          return assassins.champs.map((champ) => ({
            ...champ,
            selected: false,
            // selected: true,
          }));
        });
        break;
      case "fighters":
        setChamps(() => {
          return fighters.champs.map((champ) => ({
            ...champ,
            selected: false,
          }));
        });
        break;
      case "mages":
        setChamps(() => {
          return mages.champs.map((champ) => ({
            ...champ,
            selected: false,
          }));
        });
        break;
      case "marksmen":
        setChamps(() => {
          return marksmen.champs.map((champ) => ({
            ...champ,
            selected: false,
          }));
        });
        break;
      case "supports":
        setChamps(() => {
          return supports.champs.map((champ) => ({
            ...champ,
            selected: false,
          }));
        });
        break;
      case "tanks":
        setChamps(() => {
          return tanks.champs.map((champ) => ({
            ...champ,
            selected: false,
          }));
        });
        break;
      default:
        break;
    }
  }, [group]);

  const DropdownIndicator = (
    props: DropdownIndicatorProps<
      { value: string; label: string },
      boolean,
      GroupBase<{ value: string; label: string }>
    >
  ) => {
    return (
      <components.DropdownIndicator {...props} className="zeroPad">
        <TiArrowSortedDown className="text-gray-500" size={32} />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col justify-evenly items-center">
      {/* Select Dropdown */}
      <div className="w-72 self-start -mt-10 ml-28">
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
      </div>

      {/* Champ Grid */}
      <ul className="grid grid-cols-10 -mt-10 h-[65%] w-11/12 rounded-lg select-none">
        {champs.map((champ, index) => (
          <li
            className="relative flex justify-center items-center"
            key={champ.name}
            onClick={() =>
              setChamps((prev) => {
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
              <MdClose className="text-brick z-0 absolute -top-2" size={160} />
            )}

            <h3
              className={`absolute bottom-2 right-3 font-goth text-[1.8rem] text-right ${
                champ.selected ? "text-brick" : "text-yellow"
              }`}
              style={{
                WebkitTextStroke: "6px black",
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
