interface ISpellArgs {
  name: string;
  value: string | undefined;
}

export default function SpellArgs({ name, value }: ISpellArgs) {
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
}
