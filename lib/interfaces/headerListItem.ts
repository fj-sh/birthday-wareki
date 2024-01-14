interface HeaderListItem {
  id: string;
  header: string;
}

// Simple utility function to check if an item is a header or not.
export const isHeader = (item: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Boolean(item?.header);

export type { HeaderListItem };
