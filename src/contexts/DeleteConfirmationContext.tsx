import { createContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface DeleteConfirmationContextType {
  doNotShowAgain: boolean;
  toggleDoNotShowAgain: () => void;
  resetDoNotShowAgain: () => void;
}

export const DeleteConfirmationContext = createContext<
  DeleteConfirmationContextType | undefined
>(undefined);

export function DeleteConfirmationProvider({
  children
}: {
  children: ReactNode;
}) {
  const [doNotShowAgain, setDoNotShowAgain] = useLocalStorage(
    "delete-confirmation-do-not-show",
    false
  );

  const toggleDoNotShowAgain = () => {
    setDoNotShowAgain((prev) => !prev);
  };

  const resetDoNotShowAgain = () => {
    setDoNotShowAgain(false);
  };

  const contextValue = {
    doNotShowAgain,
    toggleDoNotShowAgain,
    resetDoNotShowAgain
  };

  return (
    <DeleteConfirmationContext.Provider value={contextValue}>
      {children}
    </DeleteConfirmationContext.Provider>
  );
}
