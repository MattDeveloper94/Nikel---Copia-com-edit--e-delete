const myModal = new bootstrap.Modal("#register-modal");

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// função
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data)); //passar 2 parametros [chave e conteúdo] → JSON.stringify, transforma o objeto em string
};

function saveSession(data, saveSession) { // parametros 1. key[email] || 2. checksession [permanecer ou não logado].  
    if (saveSession) { // se checksession é true
        localStorage.setItem("session", data); // escrevendo em localStorage a key[session] e o conteúdo[e-mail].
    }

    sessionStorage.setItem("logged", data); // se não, escreve em sessionStorage a key[session] e o conteúdo[e-mail] que será perdido ao deslogar ou fechar a página.
};

// primeira função a ser executada
function checkLogged() {
    if (session) { // se tem algo na variável session, então é true
        sessionStorage.setItem("logged", session); //escrevendo o conteúdo salvo em session, no sessionStorage || [setitem] → Usado para definir (escrever, modificar, atribuir) o valor de um item.
        logged = session;
    }

    if (logged) { // se tem algo na variável logged, então é true
        saveSession(logged, session); // passando 2 parametros,  1. key. || 2. não está passando nada, para não cair na condição da função savesession
        window.location.href = "home.html"; // enviando para pág. home.
    }
}

function getAccount(key) {
    const account = localStorage.getItem(key); // acessando e guardando em account o conteúdo da key || [getitem] → Usado para obter (ler, acessar) o valor de um item.

    if (account) {
        return JSON.parse(account); // JSON.parse, retorna o conteúdo que está em string como objeto (mudou o tipo)
    }

    return '';
};

checkLogged(); // checa se tem alguém logado

// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;
    const account = getAccount(email) // passando a key (chave)

    if (!account) {
        alert('Opps! Verifique o e-mail digitado ou a senha.');
        return;
        // checa se existe um e-mail conforme o fornecido na key
    }

    if (account) {
        if (account.password !== password) {
            alert('Opps! Verifique o e-mail digitado ou a senha.');
            return;
            // checa se a valor e o tipo são iguais
        }

        saveSession(email, checkSession); // passando o parametro [email, e se é pra permanecer logado].
        window.location.href = "home.html"; // enviando a pág. home.
    }

})

// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert('Preencha o campo com um e-mail válido.');
        return;
    }

    if (password.length < 4) {
        alert('Opps! Sua senha precisa ter no mínimo 4 digitos.');
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide(); // função do bootstrap para fechar a modal se der tudo certo
    alert('Conta criada com sucessso!');
});


