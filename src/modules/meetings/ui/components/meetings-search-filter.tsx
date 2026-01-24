import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "../../hook/use-meetings-filters";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="h-9 bg-white w-50 pl-7"
      />
      <SearchIcon className="size-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
    </div>
  );
};
