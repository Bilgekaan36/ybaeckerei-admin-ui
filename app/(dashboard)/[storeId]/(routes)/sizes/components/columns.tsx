"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SizeColumn = {
  sizeId?: string;
  sizeValue: number;
  sizeType: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'sizeValue',
    header: 'Value',
  },
  {
    accessorKey: 'sizeType',
    header: 'Type',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
