class ExpenseTracker {
    constructor() {
        this.transactionManager = new TransactionManager();
        this.initializeElements();
        this.initializeEventListeners();
        this.updateUI();
    }

    initializeElements() {
        this.form = document.getElementById('transactionForm');
        this.transactionList = document.getElementById('transactionList');
        this.filterElements = {
            type: document.getElementById('filterType'),
            minAmount: document.getElementById('minAmount'),
            maxAmount: document.getElementById('maxAmount'),
            date: document.getElementById('filterDate'),
            searchNotes: document.getElementById('searchNotes')
        };
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTransaction();
        });

        Object.values(this.filterElements).forEach(element => {
            element.addEventListener('input', () => this.handleFilter());
        });
    }

    handleAddTransaction() {
        const transaction = {
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
            date: document.getElementById('date').value,
            notes: document.getElementById('notes').value
        };

        this.transactionManager.add(transaction);
        this.form.reset();
        this.updateUI();
    }

    handleFilter() {
        const filterCriteria = {
            type: this.filterElements.type.value,
            minAmount: parseFloat(this.filterElements.minAmount.value),
            maxAmount: parseFloat(this.filterElements.maxAmount.value),
            date: this.filterElements.date.value,
            searchText: this.filterElements.searchNotes.value
        };

        const filteredTransactions = this.transactionManager.getFiltered(filterCriteria);
        this.renderTransactions(filteredTransactions);
    }

    renderTransactions(transactions) {
        this.transactionList.innerHTML = transactions.map(t => `
            <div class="transaction-item">
                <div >
                    <h4>${t.notes || 'Untitled'}</h4>
                    <div>${utils.formatCurrency(t.amount)} - ${t.type}</div>
                    <div>${t.date}</div>
                </div>
                <div>
                    <button class="button button-edit" onclick="expenseTracker.handleEdit(${t.id})">Edit</button>
                    <button class="button button-delete" onclick="expenseTracker.handleDelete(${t.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    handleEdit(id) {
        const transaction = this.transactionManager.transactions.find(t => t.id === id);
        if (transaction) {
            document.getElementById('amount').value = transaction.amount;
            document.getElementById('type').value = transaction.type;
            document.getElementById('date').value = transaction.date;
            document.getElementById('notes').value = transaction.notes;

            this.transactionManager.delete(id);
            this.updateUI();
        }
    }

    handleDelete(id) {
        this.transactionManager.delete(id);
        this.updateUI();
    }

    updateUI() {
        const totals = this.transactionManager.calculateTotals();

        document.getElementById('totalBalance').textContent = utils.formatCurrency(totals.balance);
        document.getElementById('totalIncome').textContent = utils.formatCurrency(totals.income);
        document.getElementById('totalExpense').textContent = utils.formatCurrency(totals.expense);

        this.handleFilter();
    }
}

const expenseTracker = new ExpenseTracker();