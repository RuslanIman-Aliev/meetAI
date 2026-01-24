import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface NewMeetingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  isOpen,
  onOpenChange,
  initialValues,
}: NewMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Fill in the details to update the meeting."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
