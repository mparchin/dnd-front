import { Card } from "@mui/material";
import { useMemo } from "react";

interface CharAttackDetail {
  id: number;
  name: string;
  toHitModifire?: number;
  proficiencyBonous?: number;
  damageModifire: number;
  save?: string;
  category: string;
  damageDices: string;
  type: string;
}

interface CharacterAttackProps {
  items: CharAttackDetail[];
}
export default function (props: CharacterAttackProps) {
  const categories = useMemo(
    () => [...new Set(props.items.map((item) => item.category))].sort(),
    [props.items]
  );

  return categories.map((category) => (
    <div
      key={category}
      className="md:w-96 w-full flex flex-row mb-10 mr-4 ml-4 last:mb-2 md:last:mb-10"
    >
      <Card
        className="uppercase text-sm text-center p-2 pt-4 pb-4"
        elevation={3}
        style={{
          writingMode: "vertical-lr",
        }}
      >
        {category}
      </Card>
      <div className="grow flex flex-col w-full pr-4">
        {props.items
          .filter((item) => item.category == category)
          .map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-row ml-2 pb-2 pt-2 border-b-2 rounded-md"
            >
              <div className="capitalize ml-2 mr-1 grow flex flex-col">
                <span className="grow"></span>
                <span className="capitalize">{item.name}</span>
                <span className="grow"></span>
              </div>

              <div className="mr-1 flex flex-col">
                <span className="grow"></span>
                <div className="flex flex-col">
                  <span className="capitalize text-center">
                    {item.save ??
                      `${
                        item.proficiencyBonous
                          ? "D" + item.proficiencyBonous * 2
                          : ""
                      }${
                        item.toHitModifire && item.toHitModifire > 0 ? "+" : ""
                      }${
                        item.toHitModifire && item.toHitModifire > 0
                          ? item.toHitModifire
                          : ""
                      }`}
                  </span>
                  <span className="text-xxs text-center">{` ${
                    item.save ? "save" : "hit"
                  }`}</span>
                </div>
                <span className="grow"></span>
              </div>
              <div className="flex flex-col w-14 text-center">
                <div className="grow"></div>
                <div className="flex flex-col">
                  <span className="capitalize">{`${item.damageDices}${
                    item.damageModifire > 0 ? "+" : ""
                  }${item.damageModifire ? item.damageModifire : ""}`}</span>
                  <span className="text-xxs">{` ${item.type}`}</span>
                </div>
                <div className="grow"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ));
}
