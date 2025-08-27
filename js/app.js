// APLICAÇÃO PRINCIPAL - INICIALIZAÇÃO E EVENT LISTENERS

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacao();
    configurarEventListeners();
});

function inicializarAplicacao() {
    // Verificar se já existe sessão
    const sessao = JSON.parse(sessionStorage.getItem('usuarioLogado') || 'null');
    if (sessao) {
        usuarioLogado = sessao;
        mostrarInterface();
    }
    
    // Atualizar contadores iniciais
    atualizarContadorUsuariosPorOrgao();
}

function configurarEventListeners() {
    // Event Listeners para formulário de solicitação
    configurarFormularioSolicitacao();
    
    // Event Listeners para formulário de usuário
    configurarFormularioUsuario();
    
    // Event Listeners para formulário de órgão
    configurarFormularioOrgao();
    
    // Event Listeners para máscaras de input
    configurarMascaras();
}

function configurarFormularioSolicitacao() {
    const formSolicitacao = document.getElementById('solicitacao-form');
    const descricaoField = document.getElementById('descricao');
    const anexosField = document.getElementById('anexos');
    
    if (!formSolicitacao) return;
    
    // Contador de caracteres
    if (descricaoField) {
        descricaoField.addEventListener('input', updateCharCounter);
    }
    
    // Validação em tempo real
    const campos = ['orgao-form', 'nome-form', 'email-form', 'telefone', 'descricao'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('input', updateSubmitButton);
            campo.addEventListener('change', updateSubmitButton);
        }
    });
    
    // Submissão do formulário
    formSolicitacao.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validarFormularioSolicitacao()) {
            return;
        }
        
        const dadosFormulario = coletarDadosFormulario();
        criarNovaSolicitacao(dadosFormulario);
    });
    
    // Exibir arquivos selecionados
    if (anexosField) {
        anexosField.addEventListener('change', exibirArquivosSelecionados);
    }
    
    // Máscara para telefone
    const telefoneField = document.getElementById('telefone');
    if (telefoneField) {
        aplicarMascaraTelefone(telefoneField);
    }
}

function configurarFormularioUsuario() {
    const formUsuario = document.getElementById('form-usuario');
    if (!formUsuario) return;
    
    formUsuario.addEventListener('submit', function(e) {
        e.preventDefault();
        salvarUsuario();
    });
}

function configurarFormularioOrgao() {
    const formOrgao = document.getElementById('form-orgao');
    if (!formOrgao) return;
    
    formOrgao.addEventListener('submit', function(e) {
        e.preventDefault();
        salvarOrgao();
    });
}

function configurarMascaras() {
    // Máscara para CPF
    const cpfField = document.getElementById('modal-cpf');
    if (cpfField) {
        aplicarMascaraCPF(cpfField);
    }
    
    // Máscara para telefone no modal
    const telefoneModal = document.getElementById('modal-telefone');
    if (telefoneModal) {
        aplicarMascaraTelefone(telefoneModal);
    }
}

// FUNÇÕES DE VALIDAÇÃO E COLETA DE DADOS

function validarFormularioSolicitacao() {
    const orgao = document.getElementById('orgao-form').value;
    const nome = document.getElementById('nome-form').value;
    const email = document.getElementById('email-form').value;
    const telefone = document.getElementById('telefone').value;
    const descricao = document.getElementById('descricao').value;
    
    if (!orgao || !nome || !email || !telefone || !descricao) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'error');
        return false;
    }
    
    if (descricao.length < 120) {
        mostrarNotificacao('A descrição deve ter pelo menos 120 caracteres.', 'error');
        return false;
    }
    
    if (!validarEmail(email)) {
        mostrarNotificacao('Por favor, insira um e-mail válido.', 'error');
        return false;
    }
    
    return true;
}

function coletarDadosFormulario() {
    return {
        orgao: document.getElementById('orgao-form').value,
        nome: document.getElementById('nome-form').value,
        email: document.getElementById('email-form').value,
        telefone: document.getElementById('telefone').value,
        descricao: document.getElementById('descricao').value,
        tipo: document.getElementById('service-type-title').textContent
    };
}

function criarNovaSolicitacao(dados) {
    const novaId = gerarIdSolicitacao();
    const dataAtual = formatarData(new Date());
    
    const novaSolicitacao = {
        id: novaId,
        tipo: dados.tipo,
        solicitante: dados.nome,
        orgao: dados.orgao,
        email: dados.email,
        telefone: dados.telefone,
        data: dataAtual,
        status: 'pendente',
        descricao: dados.descricao,
        observacoes: 'Aguardando atribuição para equipe especializada.',
        responsavel: null
    };
    
    solicitacoes.unshift(novaSolicitacao);
    
    // Mostrar mensagem de sucesso
    const successMessage = document.getElementById('success-message-form');
    successMessage.style.display = 'block';
    scrollSuave(successMessage);
    
    // Limpar formulário
    limparFormularioSolicitacao();
    
    // Voltar para home após 5 segundos
    setTimeout(() => {
        voltarHome();
        successMessage.style.display = 'none';
        mostrarNotificacao('Solicitação enviada com sucesso!', 'success');
    }, 5000);
}

function limparFormularioSolicitacao() {
    document.getElementById('descricao').value = '';
    document.getElementById('anexos').value = '';
    document.getElementById('file-list').innerHTML = '';
    updateCharCounter();
}

function exibirArquivosSelecionados(e) {
    const files = Array.from(e.target.files);
    const fileList = document.getElementById('file-list');
    
    fileList.innerHTML = '';
    
    if (files.length > 0) {
        const ul = document.createElement('ul');
        ul.style.marginTop = '15px';
        ul.style.paddingLeft = '20px';
        
        files.forEach(file => {
            const li = document.createElement('li');
            li.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            li.style.margin = '8px 0';
            li.style.color = '#6b7280';
            ul.appendChild(li);
        });
        
        fileList.appendChild(ul);
    }
}

// FUNÇÕES DE SALVAMENTO

function salvarUsuario() {
    const nome = document.getElementById('modal-nome').value;
    const cpf = document.getElementById('modal-cpf').value.replace(/\D/g, '');
    const email = document.getElementById('modal-email').value;
    const telefone = document.getElementById('modal-telefone').value;
    const orgao = document.getElementById('modal-orgao').value;
    const perfil = document.getElementById('modal-perfil').value;
    const senha = document.getElementById('modal-senha').value;
    const confirmarSenha = document.getElementById('modal-confirmar-senha').value;
    
    // Validações
    if (!validarCamposUsuario(nome, cpf, email, telefone, orgao, perfil, senha, confirmarSenha)) {
        return;
    }
    
    if (!validarPermissoesUsuario(orgao, perfil)) {
        return;
    }
    
    if (!validarCPFUnico(cpf)) {
        return;
    }
    
    // Encontrar código do órgão
    const orgaoSelecionado = orgaos.find(o => o.nome === orgao);
    
    const novoUsuario = {
        usuario: cpf,
        senha: senha,
        nome: nome,
        email: email,
        telefone: telefone,
        orgao: orgao,
        codigoOrgao: orgaoSelecionado ? orgaoSelecionado.codigo : null,
        perfil: perfil
    };
    
    if (editandoUsuario !== null) {
        usuarios[editandoUsuario] = novoUsuario;
        mostrarNotificacao('Usuário atualizado com sucesso!', 'success');
    } else {
        usuarios.push(novoUsuario);
        mostrarNotificacao('Usuário cadastrado com sucesso!', 'success');
    }
    
    carregarTabelaUsuarios();
    atualizarContadores();
    fecharModalUsuario();
}

function salvarOrgao() {
    const nome = document.getElementById('modal-orgao-nome').value;
    const codigo = document.getElementById('modal-orgao-codigo').value;
    const sigla = document.getElementById('modal-orgao-sigla').value;
    const descricao = document.getElementById('modal-orgao-descricao').value;
    
    if (!validarCamposOrgao(nome, codigo)) {
        return;
    }
    
    const novoOrgao = {
        nome: nome,
        codigo: codigo ? parseInt(codigo) : null,
        sigla: sigla || '',
        descricao: descricao || '',
        usuarios: editandoOrgao !== null ? orgaos[editandoOrgao].usuarios : 0
    };
    
    if (editandoOrgao !== null) {
        // Atualizar nome do órgão em todos os usuários se necessário
        const nomeAntigo = orgaos[editandoOrgao].nome;
        if (nomeAntigo !== nome) {
            usuarios.forEach(usuario => {
                if (usuario.orgao === nomeAntigo) {
                    usuario.orgao = nome;
                }
            });
        }
        orgaos[editandoOrgao] = novoOrgao;
        mostrarNotificacao('Órgão atualizado com sucesso!', 'success');
    } else {
        orgaos.push(novoOrgao);
        mostrarNotificacao('Órgão cadastrado com sucesso!', 'success');
    }
    
    carregarTabelaOrgaos();
    atualizarSelectOrgaos();
    atualizarContadores();
    fecharModalOrgao();
}

// VALIDAÇÕES ESPECÍFICAS

function validarCamposUsuario(nome, cpf, email, telefone, orgao, perfil, senha, confirmarSenha) {
    if (!nome || !cpf || !email || !orgao || !perfil || !senha) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'error');
        return false;
    }
    
    if (!validarCPF(cpf)) {
        mostrarNotificacao('CPF inválido!', 'error');
        return false;
    }
    
    if (!validarEmail(email)) {
        mostrarNotificacao('E-mail inválido!', 'error');
        return false;
    }
    
    if (senha !== confirmarSenha) {
        mostrarNotificacao('As senhas não coincidem!', 'error');
        return false;
    }
    
    if (!validarSenha(senha)) {
        mostrarNotificacao('A senha deve ter pelo menos 6 caracteres!', 'error');
        return false;
    }
    
    return true;
}

function validarPermissoesUsuario(orgao, perfil) {
    if (usuarioLogado.perfil === 'gestor') {
        if (orgao !== usuarioLogado.orgao) {
            mostrarNotificacao('Você só pode cadastrar usuários para o seu órgão!', 'error');
            return false;
        }
        
        if (perfil !== 'usuario') {
            mostrarNotificacao('Você só pode cadastrar usuários com perfil "Usuário"!', 'error');
            return false;
        }
    } else if (usuarioLogado.perfil === 'admin') {
        if (perfil === 'divisao_esocial') {
            mostrarNotificacao('Você não tem permissão para criar usuários da Divisão eSocial!', 'error');
            return false;
        }
    }
    
    return true;
}

function validarCPFUnico(cpf) {
    const cpfExiste = usuarios.some((user, index) => 
        user.usuario === cpf && index !== editandoUsuario
    );
    
    if (cpfExiste) {
        mostrarNotificacao('Este CPF já está cadastrado!', 'error');
        return false;
    }
    
    return true;
}

function validarCamposOrgao(nome, codigo) {
    if (!nome) {
        mostrarNotificacao('Nome do órgão é obrigatório!', 'error');
        return false;
    }
    
    // Verificar se o nome já existe
    const nomeExiste = orgaos.some((org, index) => 
        org.nome.toLowerCase() === nome.toLowerCase() && index !== editandoOrgao
    );
    
    if (nomeExiste) {
        mostrarNotificacao('Já existe um órgão com este nome!', 'error');
        return false;
    }
    
    // Verificar se o código já existe (se preenchido)
    if (codigo) {
        const codigoExiste = orgaos.some((org, index) => 
            org.codigo === parseInt(codigo) && index !== editandoOrgao
        );
        
        if (codigoExiste) {
            mostrarNotificacao('Já existe um órgão com este código!', 'error');
            return false;
        }
    }
    
    return true;
}

// INICIALIZAÇÃO DAS MÁSCARAS E VALIDAÇÕES POR INPUT
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar contadores e validações
    const descricaoField = document.getElementById('descricao');
    if (descricaoField) {
        updateCharCounter();
    }
    
    // Aplicar máscaras iniciais se elementos existirem
    const cpfInput = document.getElementById('modal-cpf');
    if (cpfInput) {
        aplicarMascaraCPF(cpfInput);
    }
    
    const telefoneInput = document.getElementById('modal-telefone');
    if (telefoneInput) {
        aplicarMascaraTelefone(telefoneInput);
    }
    
    const telefoneForm = document.getElementById('telefone');
    if (telefoneForm) {
        aplicarMascaraTelefone(telefoneForm);
    }
});

// FUNÇÕES GLOBAIS PARA COMPATIBILIDADE
window.mostrarAbaAdmin = mostrarAbaAdmin;
window.aplicarFiltros = aplicarFiltros;
window.abrirModalUsuario = abrirModalUsuario;
window.fecharModalUsuario = fecharModalUsuario;
window.editarUsuario = editarUsuario;
window.excluirUsuario = excluirUsuario;
window.abrirModalOrgao = abrirModalOrgao;
window.fecharModalOrgao = fecharModalOrgao;
window.editarOrgao = editarOrgao;
window.excluirOrgao = excluirOrgao;
window.verDetalheSolicitacao = verDetalheSolicitacao;
window.verDetalheSolicitacaoEquipe = verDetalheSolicitacaoEquipe;
window.atualizarSolicitacao = atualizarSolicitacao;
window.atualizarStatusEquipe = atualizarStatusEquipe;
window.fecharModalSolicitacao = fecharModalSolicitacao;
window.criarSolicitacao = criarSolicitacao;
window.voltarHome = voltarHome;
window.logout = logout;