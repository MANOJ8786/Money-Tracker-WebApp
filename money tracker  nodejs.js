const form = document.getElementById('transaction-form');
const transactionsContainer = document.getElementById('transactions');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = document.getElementById('text').value;
  const amount = parseFloat(document.getElementById('amount').value);

  try {
    const response = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to add transaction');
    }

    const transaction = await response.json();
    displayTransaction(transaction);
    form.reset();
  } catch (err) {
    console.error(err);
  }
});

async function getTransactions() {
  try {
    const response = await fetch('http://localhost:5000/api/transactions');
    const transactions = await response.json();
    transactions.forEach(displayTransaction);
  } catch (err) {
    console.error(err);
  }
}

function displayTransaction(transaction) {
  const div = document.createElement('div');
  div.textContent = `${transaction.text}: $${transaction.amount}`;
  transactionsContainer.appendChild(div);
}

getTransactions();