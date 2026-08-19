import { useState } from "react";

const useLocalStorage = (key, initialValue) => {

  const [value, setValue] = useState(() => {

    const storedValue = localStorage.getItem(key);

    if (!storedValue || storedValue === "undefined") {
      return initialValue;
    }

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error("Invalid localStorage data:", error);

      return initialValue;
    }
  });

  const updateValue = (newValue) => {

    setValue((prevValue) => {

      const valueToStore =
        typeof newValue === "function"
          ? newValue(prevValue)
          : newValue;

      localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );

      return valueToStore;
    });
  };

  return [value, updateValue];
};

export default useLocalStorage;