import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

function useUserContext() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error(
      "You can't consume this context if the component is outside UserProvider"
    );
  }

  return context;
}

export default useUserContext;