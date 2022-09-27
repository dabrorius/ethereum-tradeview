type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="text-white px-2 text-sm bg-gray-800 border-solid border-t-2 border-b-2 border-gray-700">
      {title}
    </div>
  );
}
