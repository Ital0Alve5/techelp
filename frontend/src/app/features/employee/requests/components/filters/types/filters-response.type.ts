import { FilterTypes } from "./filter-types.type";

export type FiltersResponse = {
  type: FilterTypes;
  data: null | { startDate: string; endDate: string };
};
