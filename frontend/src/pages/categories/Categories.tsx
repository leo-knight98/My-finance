import styles from "./Categories.module.css";

function Categories() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1>Categories</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.addCategory + ' ' + styles.card}>
                    <h2>Add category</h2>
                </div>
            </div>
        </>
    )
}

export default Categories