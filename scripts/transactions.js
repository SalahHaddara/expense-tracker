class TransactionManager {
    constructor() {
        this.transactions = utils.getFromLocalStorage("transactions");
    }

    save() {
        utils.saveToLocalStorage("transactions", this.transactions);
    }

    addTransaction(transaction) {
        this.transactions.push({...transaction, id: Date.now()});
        this.save();
    }
}