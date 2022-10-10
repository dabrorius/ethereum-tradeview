import { ReactElement } from "react";

type TradeviewHeaderItemProps = {
  title: string;
  children: string | ReactElement;
};

export function TradeviewHeaderItem({
  title,
  children,
}: TradeviewHeaderItemProps) {
  return (
    <div className="mx-3">
      <div className="text-xs text-slate-400">{title}</div>
      <div className="text-s">{children}</div>
    </div>
  );
}
