import SuggestionItem from "./SuggestionItem";

const SuggestionList = ({ products, onSelect, highlightedIndex }) => {
  if (!products.length) {
    return null;
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden mt-2">
      {products.map((product, index) => (
        <SuggestionItem
          key={product.id}
          isHighlighted={index === highlightedIndex}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default SuggestionList;