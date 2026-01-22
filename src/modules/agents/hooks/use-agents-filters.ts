import { DEFAULT_PAGE } from "@/constans";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useAgentsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
