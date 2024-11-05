export type ConfirmActionType = {
  actionExecuteData?: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionToExecuteFunction?: () => void;
};
