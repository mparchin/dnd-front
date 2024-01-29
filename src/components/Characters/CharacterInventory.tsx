import { Card } from "@mui/material";
import { useMemo } from "react";
import Circle from "../../assets/circle";

interface CharInventoryDetail {
  id: number;
  name: string;
  count: number;
  weight: number;
  cost: number;
  category: string;
  needsAttunment?: boolean;
  attuned?: boolean;
}

interface CharacterInventoryProps {
  items: CharInventoryDetail[];
}
export default function (props: CharacterInventoryProps) {
  const categories = useMemo(() => {
    var ret = [...new Set(props.items.map((item) => item.category))];
    ret.push("Attuned");
    return ret.sort((a, b) =>
      a.toLowerCase() == "currency"
        ? -1
        : b.toLowerCase() == "currency"
        ? 1
        : a > b
        ? 1
        : -1
    );
  }, [props.items]);

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
          .filter(
            (item) =>
              item.category == category ||
              (category == "Attuned" && item.attuned)
          )
          .map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-row ml-2 pb-2 pt-2 border-b-2 rounded-md"
            >
              {item.needsAttunment ? (
                <Circle
                  className="w-4 mr-0.5 shrink-0"
                  filled={item.attuned}
                  text="A"
                />
              ) : (
                <></>
              )}
              <div className="capitalize ml-2 mr-1 grow flex flex-col">
                <span className="grow"></span>
                <span className="capitalize">{item.name}</span>
                <span className="grow"></span>
              </div>
              {item.count > 1 ? (
                <div className="grow mr-2 flex flex-col">
                  <span className="grow"></span>
                  <div>
                    <span className="capitalize">{item.count}</span>
                    <span className="text-xxs"> qty</span>
                  </div>
                  <span className="grow"></span>
                </div>
              ) : (
                <></>
              )}

              <div className="mr-1 flex flex-col">
                <span className="grow"></span>
                <div>
                  <span className="capitalize">{item.weight}</span>
                  <span className="text-xxs"> lb.</span>
                </div>
                <span className="grow"></span>
              </div>
              <div className="flex flex-col w-12 text-center">
                <div className="grow"></div>
                <div>
                  <span className="capitalize">{item.cost}</span>
                  <span className="text-xxs"> G</span>
                </div>
                <div className="grow"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ));
}
