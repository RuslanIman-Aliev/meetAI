import { useTRPC } from "@/trpc/client";
import { useMeetingsFilters } from "../../hook/use-meetings-filters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC();

  const [agentsSearch, setAgentsSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ search: agentsSearch, pageSize: 100 }),
  );
  return (
    <CommandSelect
      placeholder="Agent"
      options={(data?.items || []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      className="h-9"
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch={setAgentsSearch}
      value={filters.agentId ?? ""}
    />
  );
};
