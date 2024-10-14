export type ConfirmActionType = {
  actionExcecuteData?: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionToExcecuteFunction?: () => void;
};
