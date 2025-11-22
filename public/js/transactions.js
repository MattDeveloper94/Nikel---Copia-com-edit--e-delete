const myModal = new bootstrap.Modal("#transaction-modal");

// var global
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

//função
function checkLogged() {
    if (session) { // se tem algo na variável session, então é true
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) { // negação [se ninguém está logged então cai na condicional]
        window.location.href = "index.html"; // enviando para pág. index.
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
    return;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data)); // key/lista[conteúdo]
}

function saveDataDelete(data, updateData) {
    let transactionUpdate = data;
    transactionUpdate.transactions = updateData;
    localStorage.setItem(data.login, JSON.stringify(transactionUpdate)); // key/lista[conteúdo]
}

function getTransactions() {
    const transaction = data.transactions;
    let limit = transaction.length;
    let transactionsHtml = ``;

    if (transaction.length) {
        for (let i = 0; i < limit; i++) {
            transactionsHtml += `
                <tr class="list-transactions"> 
                    <th scope="row">${transaction[i].date}</th>
                    <td>${transaction[i].value.toFixed(2)}</td>
                    <td>${transaction[i].type === "2" ? "Saída" : "Entrada"}</td>
                    <td>${transaction[i].description}</td>
                </tr>
            `
        }
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml;
    selectItemListTransactions();
}

function selectItemListTransactions() {
    const listTransaction = document.querySelectorAll(".list-transactions"); // 1. Seleciona todos os itens com a classe 'list-transactions'

    listTransaction.forEach((items, index) => {
        items.addEventListener("click", () => {
            return selectIndex = index;
        });
    });
}

function editingForm(object) {
    document.getElementById("value-input").value = object.value;
    document.getElementById("description-input").value = object.description;
    document.getElementById("date-input").value = object.date;
    document.querySelector(`input[name="type-input"][value="${object.type}"]`).checked = true;
    myModal.show();
}

function objectOld(objectOld) {
    return obj = objectOld;
}

function updateTransactions() {
    const indice = data.transactions.findIndex(item => item === obj);
    if (indice !== -1) {
        return indice;
    }
}

function editTransactions() {
    const listTransactions = data.transactions;

    editing = 1;
    objectOld(listTransactions[selectIndex]);
    editingForm(listTransactions[selectIndex]);
}

function deleteTransactions() {
    const listTransactions = data.transactions;

    editing = 1;
    objectOld(listTransactions[selectIndex]);
    itemDelete.splice([updateTransactions()], 1);
}

//código
let editing = 0;
checkLogged();
let itemDelete = data.transactions;

document.getElementById("form").addEventListener("click", function (e) {
    document.getElementById("value-input").value = '';
    document.getElementById("description-input").value = '';
    document.getElementById("date-input").value = '';
    document.querySelector(`input[name="type-input"][value="1"]`).checked = true;
});

document.getElementById("edit-modal").addEventListener("click", () => {
    editTransactions();
});
document.getElementById("delete-modal").addEventListener("click", () => {
    deleteTransactions();
    saveDataDelete(data, itemDelete);
    location.reload();
});
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    if (editing === 1) {
        const dataUser = localStorage.getItem(logged);
        if (dataUser) {
            let newObject = JSON.parse(dataUser);
            newObject.transactions[updateTransactions()].value = value;
            newObject.transactions[updateTransactions()].description = description;
            newObject.transactions[updateTransactions()].date = date;
            newObject.transactions[updateTransactions()].type = type;

            saveData(newObject);
        }
    } else {
        data.transactions.unshift({
            value: value, description: description, date: date, type: type
            // acessando o objeto[transactions] e guardando nele um objeto com info. da transação // unshift → insere o dado e coloca na 1ª possição da pilha].
        });
        saveData(data);
    }

    myModal.hide();
    getTransactions();
    selectItemListTransactions();
    location.reload();

    alert('Lançamento realizado com sucesso!')
});