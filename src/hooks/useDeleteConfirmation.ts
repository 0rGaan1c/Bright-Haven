import { useContext } from "react";
import { DeleteConfirmationContext } from "../contexts/DeleteConfirmationContext";

export function useDeleteConfirmation() {
  const context = useContext(DeleteConfirmationContext);

  if (context === undefined) {
    throw new Error(
      "useDeleteConfirmation must be used within a DeleteConfirmationProvider"
    );
  }

  return context;
}
