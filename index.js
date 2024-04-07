// Função para calcular e exibir os resultados
function calculate() {
    var initialInvestment = parseFloat(document.getElementById("initialInvestment").value);
    var monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    var annualInterestRate = parseFloat(document.getElementById("annualInterestRate").value) / 100;
    var months = parseInt(document.getElementById("months").value);

    var table = document.getElementById("resultTable");
    table.innerHTML = ""; // Limpar resultados anteriores

    var totalInvestment = initialInvestment;
    var totalInterest = 0;
    var prevInvestment = initialInvestment;
    var lastMonthlyInterest = 0;
    for (var i = 1; i <= months; i++) {
        var monthlyInterest = (prevInvestment + monthlyInvestment) * (annualInterestRate / 12);
        var currentInvestment = prevInvestment + monthlyInvestment + monthlyInterest;

        totalInterest += monthlyInterest;
        lastMonthlyInterest = monthlyInterest;
        

        var row = table.insertRow(-1);
        var monthCell = row.insertCell(0);
        var quantityCell = row.insertCell(1);
        var investedValueCell = row.insertCell(2);
        var interestCell = row.insertCell(3);

        monthCell.innerHTML = getMonthName(i);
        quantityCell.innerHTML = i;
        investedValueCell.innerHTML = "R$ " + currentInvestment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        interestCell.innerHTML = "R$ " + monthlyInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        prevInvestment = currentInvestment;
    }
    

    var totalInvestmentWithoutInterest = initialInvestment + (monthlyInvestment * months);
    var total = totalInvestmentWithoutInterest + totalInterest
    var totacorrigido =lastMonthlyInterest*1.8
    var summaryCard = document.getElementById("summaryCard");
    summaryCard.style.display = "block";
    document.getElementById("totalInvestment").innerHTML = "R$ " + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    document.getElementById("totalInvestmentWithoutInterest").innerHTML = "R$ " + totalInvestmentWithoutInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    document.getElementById("totalInterest").innerHTML = "R$ " + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    document.getElementById("lastMonthlyInterest").innerHTML = "R$ " + lastMonthlyInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    document.getElementById("totacorrigido").innerHTML = "R$ " + totacorrigido.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    

    // Salvar os valores no armazenamento local
    saveValuesToLocalStorage();
}

// Função para salvar os valores no armazenamento local
function saveValuesToLocalStorage() {
    var initialInvestment = document.getElementById("initialInvestment").value;
    var monthlyInvestment = document.getElementById("monthlyInvestment").value;
    var annualInterestRate = document.getElementById("annualInterestRate").value;
    var months = document.getElementById("months").value;

    localStorage.setItem("initialInvestment", initialInvestment);
    localStorage.setItem("monthlyInvestment", monthlyInvestment);
    localStorage.setItem("annualInterestRate", annualInterestRate);
    localStorage.setItem("months", months);
}

// Função para recuperar os valores do armazenamento local
function loadValuesFromLocalStorage() {
    document.getElementById("initialInvestment").value = localStorage.getItem("initialInvestment") || "";
    document.getElementById("monthlyInvestment").value = localStorage.getItem("monthlyInvestment") || "";
    document.getElementById("annualInterestRate").value = localStorage.getItem("annualInterestRate") || "";
    document.getElementById("months").value = localStorage.getItem("months") || "";
}

// Carregar os valores salvos ao iniciar a página
loadValuesFromLocalStorage();

// Função para obter o nome do mês
function getMonthName(monthIndex) {
    var months = [
        "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
        "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
    ];
    return months[(monthIndex - 1) % 12];
}
