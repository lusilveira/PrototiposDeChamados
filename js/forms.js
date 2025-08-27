// GESTÃO DE FORMULÁRIOS

// Funções para criação de solicitações
function criarSolicitacao(tipo) {
    abrirFormulario(tipo);
}

function abrirFormulario(tipo) {
    tipoSelecionado = tipo;
    document.getElementById('services-grid').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
    
    const titles = {
        'extracao': 'Extração',
        'reenvio': 'Reenvio de Arquivos', 
        'criar-rubrica': 'Solicitação de Rubrica',
        'transmissao': 'Transmissão'
    };
    
    document.getElementById('service-type-title').textContent = titles[tipo];
    
    // Preencher dados do usuário logado
    preencherDadosUsuario();
    
    window.scrollTo(0, 0);
}

function preencherDadosUsuario() {
    // Preencher dropdown de órgãos
    const orgaoSelect = document.getElementById('orgao-form');
    orgaoSelect.innerHTML = '<option value="">Selecione o órgão</option>';
    orgaos.forEach(orgao => {
        orgaoSelect.innerHTML += `<option value="${orgao.nome}">${orgao.nome}</option>`;
    });
    
    // Selecionar o órgão do usuário logado
    orgaoSelect.value = usuarioLogado.orgao;
    
    // Preencher outros campos com dados do usuário logado
    document.getElementById('nome-form').value = usuarioLogado.nome;
    document.getElementById('email-form').value = usuarioLogado.email;
    document.getElementById('telefone').value = usuarioLogado.telefone || '';
    
    // Limpar descrição e atualizar contador
    document.getElementById('descricao').value = '';
    updateCharCounter();
    
    // Atualizar estado do botão de envio
    updateSubmitButton();
}

function voltarHome() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('services-grid').style.display = 'grid';
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('success-message-form').style.display = 'none';
    
    // Limpar formulário
    document.getElementById('solicitacao-form').reset();
    document.getElementById('file-list').innerHTML = '';
    tipoSelecionado = null;
    updateCharCounter();
}

// Contador de caracteres e validação
function updateCharCounter() {
    const descricaoField = document.getElementById('descricao');
    const charCounter = document.getElementById('char-counter');
    
    if (descricaoField && charCounter) {
        const length = descricaoField.value.length;
        charCounter.textContent = `${length} / 10000 caracteres (mínimo: 120)`;
        
        if (length < 120) {
            charCounter.classList.add('error');
        } else {
            charCounter.classList.remove('error');
        }
        
        updateSubmitButton();
    }
}

function updateSubmitButton() {
    const form = document.getElementById('solicitacao-form');
    const btnEnviar = document.getElementById('btn-enviar');
    const orgaoField = document.getElementById('orgao-form');
    const nomeField = document.getElementById('nome-form');
    const emailField = document.getElementById('email-form');
    const telefoneField = document.getElementById('telefone');
    const descricaoField = document.getElementById('descricao');
    
    if (form && btnEnviar && orgaoField && nomeField && emailField && telefoneField && descricaoField) {
        let allValid = true;
        
        // Verificar campos obrigatórios
        if (!orgaoField.value.trim()) allValid = false;
        if (!nomeField.value.trim()) allValid = false;
        if (!emailField.value.trim()) allValid = false;
        if (!telefoneField.value.trim()) allValid = false;
        if (!descricaoField.value.trim()) allValid = false;
        
        // Verificar comprimento mínimo da descrição
        if (descricaoField.value.length < 120) {
            allValid = false;
        }
        
        btnEnviar.disabled = !allValid;
    }
}

// GESTÃO DE USUÁRIOS
function carregarTabelaUsuarios() {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    // Filtrar usuários conforme o perfil
    let usuariosFiltrados = usuarios;
    if (usuarioLogado.perfil === 'gestor') {
        // Gestor vê apenas usuários comuns do próprio órgão
        usuariosFiltrados = usuarios.filter(user => 
            user.orgao === usuarioLogado.orgao && 
            user.perfil === 'usuario'
        );
    } else if (usuarioLogado.perfil === 'admin') {
        // Admin vê todos os usuários
        usuariosFiltrados = usuarios;
    } else if (usuarioLogado.perfil === 'divisao_esocial') {
        // Divisão vê todos os usuários
        usuariosFiltrados = usuarios;
    }
    
    // Atualizar select de órgãos no modal
    atualizarSelectOrgaosModal();
    
    usuariosFiltrados.forEach((user, originalIndex) => {
        // Encontrar o índice original no array principal
        const realIndex = usuarios.findIndex(u => u.usuario === user.usuario);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.orgao}</td>
            <td><span class="perfil-badge">${user.perfil.replace('_', ' ').toUpperCase()}</span></td>
            <td>
                ${(usuarioLogado.perfil === 'divisao_esocial' || usuarioLogado.perfil === 'admin') ? 
                    `<button class="btn-action btn-edit" onclick="editarUsuario(${realIndex})">✏️ Editar</button>` : 
                    ''}
                ${(usuarioLogado.perfil === 'divisao_esocial' || usuarioLogado.perfil === 'admin') && 
                  !['divisao_esocial', 'admin'].includes(user.perfil) ? 
                    `<button class="btn-action btn-delete" onclick="excluirUsuario(${realIndex})">🗑️ Excluir</button>` : 
                    ''}
                ${usuarioLogado.perfil === 'gestor' && user.perfil === 'usuario' ? 
                    `<button class="btn-action btn-edit" onclick="editarUsuario(${realIndex})">✏️ Editar</button>
                    <button class="btn-action btn-delete" onclick="excluirUsuario(${realIndex})">🗑️ Excluir</button>` : 
                    ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarUsuario(index) {
    abrirModalUsuario(index);
}

function excluirUsuario(index) {
    const usuario = usuarios[index];
    
    // Validações por perfil
    if (usuarioLogado.perfil === 'gestor') {
        if (usuario.orgao !== usuarioLogado.orgao) {
            alert('Você só pode excluir usuários do seu órgão!');
            return;
        }
        
        if (usuario.perfil !== 'usuario') {
            alert('Você só pode excluir usuários com perfil "Usuário"!');
            return;
        }
    } else if (usuarioLogado.perfil === 'admin') {
        if (['divisao_esocial'].includes(usuario.perfil)) {
            alert('Você não tem permissão para excluir usuários da Divisão eSocial!');
            return;
        }
    } else if (usuarioLogado.perfil === 'divisao_esocial') {
        // Divisão pode excluir qualquer usuário exceto outros da divisão
        if (usuario.perfil === 'divisao_esocial' && usuario.usuario !== usuarioLogado.usuario) {
            alert('Você não pode excluir outros membros da Divisão eSocial!');
            return;
        }
    }
    
    if (confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`)) {
        usuarios.splice(index, 1);
        carregarTabelaUsuarios();
        atualizarContadores();
    }
}

function atualizarSelectOrgaosModal() {
    const modalOrgaoSelect = document.getElementById('modal-orgao');
    if (modalOrgaoSelect) {
        const valorAtual = modalOrgaoSelect.value;
        modalOrgaoSelect.innerHTML = '<option value="">Selecione o órgão</option>';
        orgaos.forEach(orgao => {
            modalOrgaoSelect.innerHTML += `<option value="${orgao.nome}">${orgao.nome}</option>`;
        });
        modalOrgaoSelect.value = valorAtual;
    }
}