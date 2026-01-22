"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data} = useSuspenseQuery(
    trpc.agents.getMany.queryOptions(),
  );
  
  return <div>
   
  </div>;
};

export const AgentsViewLoading = ()=>{
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  )
}

export const AgentsViewError = ()=>{
  return (
    <ErrorState 
      title="Failed to Load Agents"
      description="An error occurred while loading the agents. Please try again."
    />
  )
}
