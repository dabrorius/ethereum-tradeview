import { ReactElement } from "react";
import { SectionHeader } from "./SectionHeader";

type SectionProps = {
  title: string;
  children: string | ReactElement | ReactElement[];
  gridArea: string;
};

export function Section(props: SectionProps) {
  const { title, children, gridArea } = props;

  return (
    <div className="flex flex-col bg-slate-800" style={{ gridArea }}>
      <SectionHeader title={title} />
      <div className="overflow-scroll flex grow">{children}</div>
    </div>
  );
}
