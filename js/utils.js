// FUNÇÕES UTILITÁRIAS

// Máscaras e validações
function aplicarMascaraCPF(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
}

function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            if (value.length < 14) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            }
        }
        e.target.value = value;
    });
}

// Validação de e-mail
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
        return false;
    
    let add = 0;
    for (let i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    
    add = 0;
    for (let i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

// Formatação de data
function formatarData(data) {
    const d = new Date(data);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

// Gerar ID único para solicitações
function gerarIdSolicitacao() {
    const proximoNumero = solicitacoes.length + 1;
    return `SOL-2025-${String(proximoNumero).padStart(3, '0')}`;
}

// Função para capitalizar primeira letra
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função para remover acentos
function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para validar senha
function validarSenha(senha) {
    return senha.length >= 6;
}

// Função para verificar se dois objetos são iguais
function objetosIguais(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Função para copiar objeto
function copiarObjeto(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Função para ordenar array por propriedade
function ordenarPor(array, propriedade, crescente = true) {
    return array.sort((a, b) => {
        const valorA = a[propriedade];
        const valorB = b[propriedade];
        
        if (crescente) {
            return valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
        } else {
            return valorA < valorB ? 1 : valorA > valorB ? -1 : 0;
        }
    });
}

// Função para debounce (evitar muitas execuções)
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Função para mostrar loading
function mostrarLoading(elemento) {
    const loading = document.createElement('div');
    loading.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="width: 20px; height: 20px; border: 2px solid #dc2626; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span style="margin-left: 10px;">Carregando...</span>
        </div>
    `;
    loading.className = 'loading-indicator';
    elemento.appendChild(loading);
    
    // Adicionar CSS da animação se não existir
    if (!document.getElementById('loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function esconderLoading(elemento) {
    const loading = elemento.querySelector('.loading-indicator');
    if (loading) {
        loading.remove();
    }
}

// Função para mostrar toast/notificação
function mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;
    
    const cores = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${cores[tipo]};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover após duração
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duracao);
}

// Função para scroll suave
function scrollSuave(elemento) {
    elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}