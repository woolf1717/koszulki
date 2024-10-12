import { DialogOption } from "./dialogOption";
import { InputHandler } from "./inputHandler";

export const ModalDialog = ({
  isOpen,
  setIsModalOpen,
  setSnap,
}: {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setSnap: (snap: any) => void;
}) => {
  return isOpen ? (
    <div className="z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="absolute bg-grey-400 opacity-50 w-4/6 h-4/6 rounded-lg"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div
        className="absolute z-20 text-red-600 top-20 right-20 cursor-pointer text-5xl"
        onClick={() => setIsModalOpen(false)}
      >
        X
      </div>
      <div className="flex flex-row gap-4 absolute">
        <DialogOption active>
          <InputHandler setSnap={setSnap} />
        </DialogOption>
        <DialogOption>CUSTOM EDIT </DialogOption>
        <DialogOption>WORK WITH AI</DialogOption>
        <DialogOption>BROWSE FOR PRE-MADE DESIGNS</DialogOption>
        <DialogOption>ASK FOR PROFESIONAL HELP</DialogOption>
      </div>
    </div>
  ) : null;
};
