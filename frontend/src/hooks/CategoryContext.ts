import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryProvider";

function useCategoryContext() {
  const context = useContext(CategoryContext);

  if (context === null) {
    throw new Error(
      "You can't consume this context if the component is outside CategoryProvider"
    );
  }

  return context;
}
export default useCategoryContext