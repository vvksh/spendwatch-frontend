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
        throw new Error(error.message);
    }
}

// API endpoints
var monthlyExpensesEndpoint = 'https://spendwatch-api.viveks.xyz/expenses?groupBy=month';
var categoryExpensesEndpoint = 'https://spendwatch-api.viveks.xyz/expenses?groupBy=category';
var creditCardExpensesEndpoint = 'https://spendwatch-api.viveks.xyz/expenses?groupBy=credit_card';

const monthOrder = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

function submitPassword() {
    // Get the entered password
    var password = document.getElementById("password").value;
    monthlyExpensesEndpoint = monthlyExpensesEndpoint + "&pwd=" + password
    categoryExpensesEndpoint = categoryExpensesEndpoint + "&pwd=" + password
    creditCardExpensesEndpoint = creditCardExpensesEndpoint + "&pwd=" + password

    // Fetch data from the backend API
    Promise.all([
        fetchData(monthlyExpensesEndpoint),
        fetchData(categoryExpensesEndpoint),
        fetchData(creditCardExpensesEndpoint)
    ]).then(([monthlyExpenses, categoryExpenses, creditCardExpenses]) => {
        // Bar Chart
        document.getElementById("passwordPrompt").style.display = "none";
        document.getElementById("mainContainer").style.display = "block";

        const barCtx = document.getElementById('barChart').getContext('2d');
        // monthlyExpenses.sort()
        const monthLabels = monthlyExpenses ? Object.keys(monthlyExpenses) : []
        monthLabels.sort((a, b) => {
            return monthOrder[a] - monthOrder[b];
        })
        console.log(monthlyExpenses)

        var expenses = []
        for (let i = 0; i < monthLabels.length; i++) {
            console.log(expenses)

            expenses.push(monthlyExpenses[monthLabels[i]])
        }
        console.log(monthLabels)
        console.log(expenses)
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: 'Monthly Expenses',
                    data: expenses,
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
    }).catch(function(err) {
        alert(err.message); // some coding error in handling happened
    });
}
