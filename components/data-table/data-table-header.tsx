interface HeaderTableProps {
  Component?: React.ReactNode;
  Filters?: React.ReactNode;
}

export function HeaderTable({ Component, Filters }: HeaderTableProps) {
  return (
    <div className="flex items-center justify-between py-4">
      {Filters}
      {Component}
    </div>
  );
}
