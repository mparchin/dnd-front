import { memo } from "react";

interface ISpellArgs {
  name: string;
  value: string | undefined;
}

export const SpellArgs = memo(({ name, value }: ISpellArgs) => {
  if (value != undefined && value)
    return (
      <div className="flex">
        <div className="basis-auto">
          <strong>{name}:</strong>
        </div>
        <div className="flex-grow pl-1">{value}</div>
      </div>
    );
  return <></>;
});
