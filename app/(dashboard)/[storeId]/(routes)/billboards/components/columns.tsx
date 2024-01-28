"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BillboardColumn = {
  billboardId?: string;
  billboardTitle: string;
  imageUrl: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'billboardTitle',
    header: 'Billboard Title',
  },
  {
    id: 'actions',
    cell: ({ row }: any) => <CellAction data={row.original} />,
  },
];
