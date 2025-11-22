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

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
    return;
}

function seeAll() {
    window.location.href = "transactions.html";
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

function getCashIn() {
    const transaction = data.transactions;
    let limit = 5;
    const cashIn = transaction.filter((item) => item.type === "1"); // cria uma nova lista[array] contendo apenas os elementos da lista original [transaction] onde a propriedade type é igual a "1". 

    if (cashIn.length) { // se o tamanho for maior que 0, retorna true || ENTRADA
        let cashInHtml = ``;

        if (cashIn.length > 5) {
            limit;
        } else limit = cashIn.length;

        for (let i = 0; i < limit; i++) {
            cashInHtml += `
                <div class="row mb-4 list-transactions">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[i].value.toFixed(2)} </h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[i].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[i].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById("cash-in-list").innerHTML = cashInHtml; // adiciona dentro da tag "cash-in-list" na pág. home o Html que está em [cashInHtml].
        selectItemListTransactions();
    }
}

function getCashOut() {
    const transaction = data.transactions;
    let limit = 5;
    const cashOut = transaction.filter((item) => item.type === "2"); // cria uma nova lista[array] contendo apenas os elementos da lista original [transaction] onde a propriedade type é igual a "2". 

    if (cashOut.length) {
        let cashOutHtml = ``;

        if (cashOut.length > 5) { // SAÍDA
            limit;
        } else limit = cashOut.length;

        for (let i = 0; i < limit; i++) {
            cashOutHtml += `
                <div class="row mb-4 list-transactions">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashOut[i].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                            <div class="col-12 col-md-8">
                                    <p>${cashOut[i].description}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashOut[i].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        document.getElementById("cash-out-list").innerHTML = cashOutHtml; // adiciona dentro da tag "cash-out-list" na pág. home o Html que está em [cashOutHtml].
        selectItemListTransactions();
    }
}

function selectItemListTransactions() {
    const listTransaction = document.querySelectorAll(".list-transactions"); // 1. Seleciona todos os itens com a classe 'list-transactions'

    listTransaction.forEach((items, index) => {
        items.addEventListener("click", () => {
            selectIndex = index;
        });
    });
}

function editingForm(object) {
    myModal.show();
    document.getElementById("value-input").value = object.value;
    document.getElementById("description-input").value = object.description;
    document.getElementById("date-input").value = object.date;
    document.querySelector(`input[name="type-input"][value="${object.type}"]`).checked = true;
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
    let inputTransaction = data.transactions.filter((item) => item.type === "1");
    let outTransaction = data.transactions.filter((item) => item.type === "2");

    if (selectIndex < 5) {
        editing = 1;
        if (inputTransaction.length > 0) {
            if (inputTransaction.length >= (selectIndex + 1)) {
                editingForm(inputTransaction[selectIndex]);
                objectOld(inputTransaction[selectIndex]);
            } else {
                editingForm(outTransaction[selectIndex - 1]); // -1 porque o index sempre está 1 valor acima da lista de saida, porque a lista de saída inicia em [0]. e não da erro quando só tem valor na lista de saída, porque não cai na condição da IF anterios, que checa a lista de entrada.
                objectOld(outTransaction[selectIndex - 1]);
            }
            return;
        } else {
            editingForm(outTransaction[selectIndex]);
            objectOld(outTransaction[selectIndex]);
            return;
        }
    } else {
        editing = 1;
        editingForm(outTransaction[selectIndex]);
        objectOld(outTransaction[selectIndex]);
        return;
    }
}

function deleteTransactions() {
    let inputTransaction = data.transactions.filter((item) => item.type === "1");
    let outTransaction = data.transactions.filter((item) => item.type === "2");

    if (selectIndex < 5) {
        editing = 1;
        if (inputTransaction.length > 0) {
            if (inputTransaction.length >= (selectIndex + 1)) {
                objectOld(inputTransaction[selectIndex]);
                itemDelete.splice([updateTransactions()], 1);
            } else {
                objectOld(outTransaction[selectIndex]);
                itemDelete.splice([updateTransactions() - 1], 1);// -1 porque o index sempre está 1 valor acima da lista de saida, porque a lista de saída inicia em [0]. e não da erro quando só tem valor na lista de saída, porque não cai na condição da IF anterios, que checa a lista de entrada.
            }
            return;
        } else {
            objectOld(outTransaction[selectIndex]);
            itemDelete.splice([updateTransactions()], 1);
            return;
        }
    } else {
        editing = 1;
        objectOld(outTransaction[selectIndex]);
        itemDelete.splice([updateTransactions()], 1);
        return;
    }
}

function getTotal() {
    const transaction = data.transactions;
    let total = 0;

    transaction.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else total -= item.value;
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
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
document.getElementById("see-all").addEventListener("click", seeAll);
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
    e.target.reset(); //limpando form [transaction-form]
    getCashIn();
    getCashOut();
    getTotal();
    selectItemListTransactions();
    location.reload();

    alert('Lançamento realizado com sucesso!')
});