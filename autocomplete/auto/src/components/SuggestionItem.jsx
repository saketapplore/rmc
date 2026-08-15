import { memo } from "react";

const SuggestionItem = ({ product, onSelect , isHighlighted}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${isHighlighted ? "bg-blue-500 text-white" : ""}`}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-10 h-10 rounded-full"
      />

      <div className="flex-1">
        <p className="text-sm font-medium">
          {product.title}
        </p>

        <p className="text-xs text-gray-500">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default memo(SuggestionItem);