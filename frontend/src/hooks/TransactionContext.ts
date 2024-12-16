import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionProvider";

function useTransactionContext() {
    const context = useContext(TransactionContext);

    if (context === null) {
        throw new Error(
        "You can't consume this context if the component is outside TransactionProvider"
        );
    }
    return context;
}

export default useTransactionContext