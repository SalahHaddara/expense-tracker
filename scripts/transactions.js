class TransactionManager {
    constructor() {
        this.transactions = utils.getFromLocalStorage("transactions");
    }
}