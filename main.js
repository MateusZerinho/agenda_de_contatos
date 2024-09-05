// Seleciona o formulário e a tabela
const form = document.getElementById('contact-form');
const contactsTableBody = document.querySelector('#contacts-table tbody');

// Função para adicionar um contato à tabela
function addContactToTable(name, phone) {
    // Cria uma nova linha
    const newRow = document.createElement('tr');

    // Cria as células de nome e telefone
    const nameCell = document.createElement('td');
    const phoneCell = document.createElement('td');

    // Adiciona o valor às células
    nameCell.textContent = name;
    phoneCell.textContent = phone;

    // Adiciona as células à nova linha
    newRow.appendChild(nameCell);
    newRow.appendChild(phoneCell);

    // Adiciona a nova linha ao corpo da tabela
    contactsTableBody.appendChild(newRow);
}

// Função para verificar duplicatas
function checkDuplicate(name, phone) {
    let nameExists = false;
    let phoneExists = false;

    // Percorre todas as linhas da tabela e verifica duplicatas
    const rows = contactsTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const existingName = row.cells[0].textContent.trim().toLowerCase();
        const existingPhone = row.cells[1].textContent.trim();

        if (existingName === name.toLowerCase()) {
            nameExists = true;
        }
        if (existingPhone === phone) {
            phoneExists = true;
        }
    });

    return { nameExists, phoneExists };
}

// Evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Obtém os valores do formulário
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Verifica duplicatas
    const { nameExists, phoneExists } = checkDuplicate(name, phone);

    if (nameExists) {
        alert('O nome já foi cadastrado.');
        return;
    }

    if (phoneExists) {
        alert('O telefone já foi cadastrado.');
        return;
    }

    // Adiciona o contato à tabela se não houver duplicatas
    addContactToTable(name, phone);

    // Limpa os campos do formulário
    form.reset();
});

// Seleciona o campo de telefone
const phoneInput = document.getElementById('phone');

// Função para permitir apenas números durante a digitação
phoneInput.addEventListener('input', function (event) {
    // Substitui qualquer caractere que não seja número por uma string vazia
    this.value = this.value.replace(/\D/g, '');
});