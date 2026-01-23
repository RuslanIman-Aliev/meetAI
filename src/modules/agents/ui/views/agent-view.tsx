"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters();
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters }));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} onRowClick={(row)=> router.push(`/agents/${row.id}`)}/>
      <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page: number) => setFilters({ page })} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Get started by creating a new agent. Each agent can help you manage your meetings effectively.
        Each agent will follow your instructions and assist you during meetings.
        "
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Agents"
      description="An error occurred while loading the agents. Please try again."
    />
  );
};
