import { useState } from "react";

const useInput = initialState => {
  const [value, setValue] = useState(initialState);
};
