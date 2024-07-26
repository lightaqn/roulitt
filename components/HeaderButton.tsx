import { FC } from "react";
type Props = { caption: "string"; isEnabled?: boolean; onClick?: () => void };
const HeaderButton: FC<Props> = ({ caption, isEnabled, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`{isEnabled && "bg-" } rounded-2xl py-2.5 px-4 hover:bg- whitespace-nowrap text-center text-xl text-white shadow-lg hover:ease-out active:ease-in hover:transition hover:duration-300 hover:transform hover:scale-105 `}
    >
      {caption}{" "}
    </button>
  );
};
export default HeaderButton;
