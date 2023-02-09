import { Item } from "../interface/item";

export interface SortConfig {
  column: string | undefined;
  direction: "ascending" | "descending" | undefined;
}

export interface SearchConfig {
  value: string;
  setting: string;
  placeholder: string;
}

// sort items
export const sortItems = (
  items: Item[],
  column: keyof Item | "whenFound",
  direction: string
): Item[] => {
  let sorted;
  if (column === "whenFound") {
    sorted = items.sort((item1, item2) => {
      const time1 = new Date(item1["dateFound"]).getTime();
      const time2 = new Date(item2["dateFound"]).getTime();
      return time1 === time2
        ? item1["timeFound"].localeCompare(item2["timeFound"])
        : time1 - time2;
    });
  } else {
    sorted = items.sort((item1, item2) => {
      const str1 = String(item1[column]).replace(/\s+/g, "").toLowerCase();
      const str2 = String(item2[column]).replace(/\s+/g, "").toLowerCase();
      return str1.localeCompare(str2);
    });
  }
  if (direction == "descending") sorted.reverse();
  return sorted;
};

export const filterItems = (items: Item[], search: SearchConfig): Item[] => {
  let filtered;

  const isWithinRange = (date1: Date, date2: Date, date: Date) => {
    return date >= date1 && date <= date2;
  };

  const subtractDays = (date: Date, days: number) => {
    return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  };

  if (search.value !== "" && search.setting === "Older than") {
    const days = parseInt(search.value);
    filtered = items.filter((item: Item) => {
      const minDate = -8640000000000000;
      return isWithinRange(
        new Date(minDate),
        subtractDays(new Date(), days),
        new Date(item.dateFound)
      );
    });
  } else if (search.value != "" && search.setting == "Recency") {
    const days = parseInt(search.value);
    filtered = items.filter((item: Item) => {
      return isWithinRange(
        subtractDays(new Date(), days + 1),
        new Date(),
        new Date(item.dateFound)
      );
    });
  } else {
    const inputName = search.value.toLowerCase();
    filtered = items.filter((item: Item) => {
      return (
        item.name.toLowerCase().includes(inputName) ||
        item.description.toLowerCase().includes(inputName) ||
        item.whereFound.toLowerCase().includes(inputName) ||
        item.identification.toLowerCase().includes(inputName) ||
        item.notes.toLowerCase().includes(inputName)
      );
    });
  }
  return filtered;
};
