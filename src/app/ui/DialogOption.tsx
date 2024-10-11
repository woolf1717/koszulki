export const DialogOption = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => {
  return (
    <div
      className={`text-white bg-black rounded-lg p-4 m-4  ${
        active
          ? "opacity-100 hover:cursor-pointer"
          : "opacity-50  hover:cursor-not-allowed"
      }`}
    >
      {children}
    </div>
  );
};
