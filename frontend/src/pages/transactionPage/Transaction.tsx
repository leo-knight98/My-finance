import styles from './Transaction.module.css'
function AddExpense() {
    return(
        <>
            <div className={styles.formCard}>
                <h1>Add transaction</h1>
                <form>
                    <div className={styles.inputGroup}>
                        <label>Type</label>
                        <input type="text" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Category</label>
                        <select>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                        </select>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddExpense