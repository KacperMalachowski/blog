import { useState } from "react"

export const useNavBar = (defaultIsOpen: boolean = false) => {
  const [value, setValue] = useState(defaultIsOpen);

  return {
    isOpen: value,
    handleClick: () => setValue(!value)
  }
};
