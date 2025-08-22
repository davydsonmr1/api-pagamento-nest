// URL base da API
const API_URL = 'http://localhost:3000';

// Função para mostrar notificação
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    
    if (isError) {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Função para fazer requisições HTTP
async function makeRequest(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        showNotification('Erro ao comunicar com o servidor. Verifique o console.', true);
        return null;
    }
}

// GESTÃO DE CONTAS
// ----------------

// Criar conta
async function criarConta() {
    const nome = document.getElementById('nomeConta').value;
    
    if (!nome) {
        showNotification('Por favor, informe o nome do titular da conta.', true);
        return;
    }
    
    const resultado = await makeRequest('/conta', 'POST', { nome });
    
    if (resultado) {
        showNotification('Conta criada com sucesso!');
        document.getElementById('nomeConta').value = '';
        listarContas();
    }
}

// Listar contas
async function listarContas() {
    const contas = await makeRequest('/conta');
    const listaContas = document.getElementById('listaContas');
    
    if (contas && contas.length > 0) {
        let html = '';
        contas.forEach(conta => {
            html += `
            <div class="conta-item">
                <p><strong>ID:</strong> ${conta._id}</p>
                <p><strong>Nome:</strong> ${conta.nome}</p>
                <p><strong>Saldo:</strong> R$ ${conta.saldo.toFixed(2)}</p>
            </div>`;
        });
        listaContas.innerHTML = html;
    } else {
        listaContas.innerHTML = '<p>Nenhuma conta encontrada.</p>';
    }
}

// OPERAÇÕES FINANCEIRAS
// --------------------

// Depositar em conta
async function depositar() {
    const id = document.getElementById('contaDeposito').value;
    const valor = parseFloat(document.getElementById('valorDeposito').value);
    
    if (!id || !valor || valor <= 0) {
        showNotification('Por favor, informe um ID de conta válido e um valor positivo.', true);
        return;
    }
    
    const resultado = await makeRequest('/conta/depositar', 'POST', { id, valor });
    
    if (resultado && resultado.mensagem) {
        showNotification(resultado.mensagem);
        document.getElementById('contaDeposito').value = '';
        document.getElementById('valorDeposito').value = '';
        listarContas();
    } else {
        showNotification('Erro ao realizar depósito. Verifique se a conta existe.', true);
    }
}

// Transferir entre contas
async function transferir() {
    const idOrigem = document.getElementById('contaOrigem').value;
    const idDestino = document.getElementById('contaDestino').value;
    const valor = parseFloat(document.getElementById('valorTransferencia').value);
    
    if (!idOrigem || !idDestino || !valor || valor <= 0) {
        showNotification('Por favor, preencha todos os campos com valores válidos.', true);
        return;
    }
    
    const resultado = await makeRequest('/pagamento/transferir', 'POST', { 
        idOrigem, 
        idDestino, 
        valor 
    });
    
    if (resultado && resultado.mensagem) {
        showNotification(resultado.mensagem);
        document.getElementById('contaOrigem').value = '';
        document.getElementById('contaDestino').value = '';
        document.getElementById('valorTransferencia').value = '';
        listarContas();
    } else {
        showNotification('Erro ao realizar transferência. Verifique os dados informados.', true);
    }
}

// Pagar para conta
async function pagar() {
    const idConta = document.getElementById('contaPagamento').value;
    const valor = parseFloat(document.getElementById('valorPagamento').value);
    
    if (!idConta || !valor || valor <= 0) {
        showNotification('Por favor, informe um ID de conta válido e um valor positivo.', true);
        return;
    }
    
    const resultado = await makeRequest('/pagamento/pagar', 'POST', { 
        idConta, 
        valor 
    });
    
    if (resultado && resultado.mensagem) {
        showNotification(resultado.mensagem);
        document.getElementById('contaPagamento').value = '';
        document.getElementById('valorPagamento').value = '';
        listarContas();
    } else {
        showNotification('Erro ao realizar pagamento. Verifique se a conta existe.', true);
    }
}

// SALDO GERAL
// -----------

// Obter saldo geral
async function obterSaldo() {
    const resultado = await makeRequest('/saldo/saldo');
    const saldoAtual = document.getElementById('saldoAtual');
    
    if (resultado && resultado.saldo !== undefined) {
        saldoAtual.innerHTML = `<p><strong>Saldo Atual:</strong> R$ ${resultado.saldo.toFixed(2)}</p>`;
    } else {
        saldoAtual.innerHTML = '<p>Erro ao obter saldo.</p>';
    }
}

// Adicionar ao saldo geral
async function adicionarSaldo() {
    const valor = parseFloat(document.getElementById('valorAdicionar').value);
    
    if (!valor || valor <= 0) {
        showNotification('Por favor, informe um valor positivo.', true);
        return;
    }
    
    const resultado = await makeRequest('/saldo/adicionar', 'POST', { valor });
    
    if (resultado && resultado.saldo !== undefined) {
        showNotification(`Saldo adicionado com sucesso! Novo saldo: R$ ${resultado.saldo.toFixed(2)}`);
        document.getElementById('valorAdicionar').value = '';
        obterSaldo();
    } else {
        showNotification('Erro ao adicionar saldo.', true);
    }
}

// Carregar dados iniciais quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    listarContas();
    obterSaldo();
});
