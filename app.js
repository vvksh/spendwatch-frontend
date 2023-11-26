// Function to fetch data from the backend API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null in case of an error
    }
}

// API endpoints
const monthlyExpensesEndpoint = 'https://example.com/api/monthly-expenses';
const categoryExpensesEndpoint = 'https://example.com/api/category-expenses';
const creditCardExpensesEndpoint = 'https://example.com/api/credit-card-expenses';

// Fetch data from the backend API
Promise.all([
    fetchData(monthlyExpensesEndpoint),
    fetchData(categoryExpensesEndpoint),
    fetchData(creditCardExpensesEndpoint)
]).then(([monthlyExpenses, categoryExpenses, creditCardExpenses]) => {
    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: monthlyExpenses ? Object.keys(monthlyExpenses) : [],
            datasets: [{
                label: 'Monthly Expenses',
                data: monthlyExpenses ? Object.values(monthlyExpenses) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Pie Chart for Category Expenses
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: categoryExpenses ? Object.keys(categoryExpenses) : [],
            datasets: [{
                data: categoryExpenses ? Object.values(categoryExpenses) : [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    // Pie Chart for Credit Card Expenses
    const creditCardCtx = document.getElementById('creditCardChart').getContext('2d');
    const creditCardChart = new Chart(creditCardCtx, {
        type: 'pie',
        data: {
            labels: creditCardExpenses ? Object.keys(creditCardExpenses) : [],
            datasets: [{
                data: creditCardExpenses ? Object.values(creditCardExpenses) : [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        }
    });
});
