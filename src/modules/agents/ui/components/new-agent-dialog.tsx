import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({
  isOpen,
  onOpenChange,
}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Create New Agent"
      description="Fill in the details to create a new agent."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
    </ResponsiveDialog>
  );
};
