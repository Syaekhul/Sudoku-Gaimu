import { memo } from "react";
import clsx from "clsx";

const Cell = memo(
  ({
    value,
    row,
    col,
    isSelected,
    isInitial,
    isError,
    isSameNumber,
    isSameRowColBox,
    onClick,
    onInput
  }) => {
    const handleClick = () => {
      onClick(row, col);
    };

    const handleKeyDown = (e) => {
      // Jangan izinkan input jika initial cell
      if (isInitial) return;

      if (e.key >= "1" && e.key <= "9") {
        onInput(row, col, parseInt(e.key));
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        onInput(row, col, 0);
      }
    };

    return (
      <button
        className={clsx(
          "aspect-square w-full flex items-center justify-center",
          "text-lg md:text-xl font-semibold transition-all",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10",
          "border border-gray-300",
          {
            "border-r-2 border-r-gray-800": col === 2 || col === 5,
            "border-b-2 border-b-gray-800": row === 2 || row === 5
          },
          // Background Colors
          {
            "bg-indigo-100": isSelected,
            "bg-blue-50": isSameRowColBox && !isSelected,
            "bg-indigo-50": isSameNumber && !isSelected,
            "bg-white": !isSelected && !isSameRowColBox && !isSameNumber,
            "bg-red-200": isError
          },
          // Text Colors
          {
            "text-gray-900 font-bold": isInitial,
            "text-indigo-600": !isInitial && value !== 0,
            "text-red-600": isError
          },
          // Hover Effects
          "hover:bg-gray-100",
          "cursor-pointer"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={isInitial ? -1 : 0}
      >
        {value !== 0 ? value : ""}
      </button>
    );
  }
);

Cell.displayName = "Cell";

export default Cell;
