"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { ProcessingState } from "../components/processing-state";
import { UpcomingState } from "../components/upcoming-state";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { CompletedState } from "../components/completed-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to delete this meeting? This action cannot be undone.",
    "Delete Meeting",
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions(),
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(`Failed to delete meeting: ${error.message}`);
      },
    }),
  );

  const handleRemoveMeeting = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) {
      return;
    }
    removeMeeting.mutate({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCanceled = data.status === "canceled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        isOpen={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data!}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data?.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCanceled && <CancelledState />}
        {isCompleted && <CompletedState data={data} />}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCanceling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="Please wait while we load the meeting."
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Meeting"
      description="An error occurred while loading the meeting. Please try again."
    />
  );
};
