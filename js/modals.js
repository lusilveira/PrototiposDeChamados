// SISTEMA DE MODAIS

// Modal de Usuário
function abrirModalUsuario(index = null) {
    editandoUsuario = index;
    const modal = document.getElementById('modal-usuario');
    const titulo = document.getElementById('modal-titulo');
    const modalOrgao = document.getElementById('modal-orgao');
    const modalPerfil = document.getElementById('modal-perfil');
    
    // Atualizar lista de órgãos
    atualizarSelectOrgaosModal();
    
    if (index !== null) {
        titulo.textContent = 'Editar Usuário';
        const user = usuarios[index];
        document.getElementById('modal-nome').value = user.nome;
        document.getElementById('modal-cpf').value = user.usuario;
        document.getElementById('modal-email').value = user.email;
        document.getElementById('modal-telefone').value = user.telefone || '';
        modalOrgao.value = user.orgao;
        modalPerfil.value = user.perfil;
        document.getElementById('modal-senha').value = user.senha;
        document.getElementById('modal-confirmar-senha').value = user.senha;
    } else {
        titulo.textContent = 'Cadastrar Novo Usuário';
        document.getElementById('form-usuario').reset();
        atualizarSelectOrgaosModal();
    }
    
    // Configurar campos conforme o perfil do usuário logado
    if (usuarioLogado.perfil === 'gestor') {
        // Gestor: órgão fixo e apenas perfil usuário
        modalOrgao.value = usuarioLogado.orgao;
        modalOrgao.disabled = true;
        modalOrgao.style.background = '#f3f4f6';
        
        modalPerfil.innerHTML = `
            <option value="">Selecione o perfil</option>
            <option value="usuario">Usuário</option>
        `;
    } else if (usuarioLogado.perfil === 'admin') {
        // Admin: todos os órgãos e perfis (exceto divisao_esocial)
        modalOrgao.disabled = false;
        modalOrgao.style.background = 'white';
        
        modalPerfil.innerHTML = `
            <option value="">Selecione o perfil</option>
            <option value="usuario">Usuário</option>
            <option value="gestor">Gestor</option>
            <option value="equipe_extracao">Equipe Extração</option>
            <option value="equipe_regularidade">Equipe Regularidade</option>
            <option value="equipe_rubricas">Equipe Rubricas</option>
        `;
    } else if (usuarioLogado.perfil === 'divisao_esocial') {
        // Divisão: todos os órgãos e todos os perfis
        modalOrgao.disabled = false;
        modalOrgao.style.background = 'white';
        
        modalPerfil.innerHTML = `
            <option value="">Selecione o perfil</option>
            <option value="usuario">Usuário</option>
            <option value="gestor">Gestor</option>
            <option value="admin">Admin</option>
            <option value="equipe_extracao">Equipe Extração</option>
            <option value="equipe_regularidade">Equipe Regularidade</option>
            <option value="equipe_rubricas">Equipe Rubricas</option>
        `;
    }
    
    modal.style.display = 'block';
}

function fecharModalUsuario() {
    document.getElementById('modal-usuario').style.display = 'none';
    editandoUsuario = null;
    document.getElementById('form-usuario').reset();
}

// Modal de Órgão
function abrirModalOrgao(index = null) {
    editandoOrgao = index;
    const modal = document.getElementById('modal-orgao');
    const titulo = document.getElementById('modal-orgao-titulo');
    
    if (index !== null) {
        titulo.textContent = 'Editar Órgão';
        const orgao = orgaos[index];
        document.getElementById('modal-orgao-nome').value = orgao.nome;
        document.getElementById('modal-orgao-codigo').value = orgao.codigo || '';
        document.getElementById('modal-orgao-sigla').value = orgao.sigla || '';
        document.getElementById('modal-orgao-descricao').value = orgao.descricao || '';
    } else {
        titulo.textContent = 'Cadastrar Novo Órgão';
        document.getElementById('form-orgao').reset();
    }
    
    modal.style.display = 'block';
}

function fecharModalOrgao() {
    document.getElementById('modal-orgao').style.display = 'none';
    editandoOrgao = null;
    document.getElementById('form-orgao').reset();
}

function editarOrgao(index) {
    abrirModalOrgao(index);
}

function excluirOrgao(index) {
    const orgao = orgaos[index];
    
    if (orgao.usuarios > 0) {
        alert('Não é possível excluir um órgão que possui usuários cadastrados!');
        return;
    }
    
    if (confirm(`Tem certeza que deseja excluir o órgão ${orgao.nome}?`)) {
        orgaos.splice(index, 1);
        carregarTabelaOrgaos();
        atualizarSelectOrgaos();
        atualizarContadores();
    }
}

function atualizarSelectOrgaos() {
    // Atualizar select de órgãos no modal de usuário
    const modalOrgao = document.getElementById('modal-orgao');
    if (modalOrgao) {
        const selectOrgao = document.getElementById('modal-orgao');
        if (selectOrgao && selectOrgao.tagName === 'SELECT') {
            const valorAtual = selectOrgao.value;
            selectOrgao.innerHTML = '<option value="">Selecione o órgão</option>';
            orgaos.forEach(orgao => {
                selectOrgao.innerHTML += `<option value="${orgao.nome}">${orgao.nome}</option>`;
            });
            selectOrgao.value = valorAtual;
        }
    }
}

// Modal de Solicitação
function verDetalheSolicitacao(id) {
    const modal = document.getElementById('modal-solicitacao');
    const titulo = document.getElementById('modal-solicitacao-titulo');
    const body = document.getElementById('modal-solicitacao-body');
    
    const solicitacao = solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;

    titulo.textContent = `Solicitação ${id}`;
    
    // Buscar equipes especializadas disponíveis para atribuição
    const equipesEspecializadas = usuarios.filter(u => 
        ['equipe_extracao', 'equipe_regularidade', 'equipe_rubricas'].includes(u.perfil)
    );
    
    const opcoesResponsavel = equipesEspecializadas.map(membro => 
        `<option value="${membro.nome}" ${solicitacao.responsavel === membro.nome ? 'selected' : ''}>${membro.nome}</option>`
    ).join('');

    body.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">Informações Gerais</h4>
            <p><strong>Tipo:</strong> ${solicitacao.tipo}</p>
            <p><strong>Solicitante:</strong> ${solicitacao.solicitante}</p>
            <p><strong>E-mail:</strong> ${solicitacao.email}</p>
            <p><strong>Telefone:</strong> ${solicitacao.telefone || 'Não informado'}</p>
            <p><strong>Órgão:</strong> ${solicitacao.orgao}</p>
            <p><strong>Data:</strong> ${solicitacao.data}</p>
            <p><strong>Status:</strong> <span class="solicitacao-status status-${solicitacao.status}">${solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}</span></p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">Descrição</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px;">${solicitacao.descricao}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">Observações</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px;">${solicitacao.observacoes}</p>
        </div>

        ${usuarioLogado.perfil === 'divisao_esocial' ? `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">⚡ Atribuição para Equipes Especializadas</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 15px; align-items: end;">
                <div>
                    <label for="novo-responsavel" style="display: block; margin-bottom: 5px; font-weight: 600;">Equipe Responsável</label>
                    <select id="novo-responsavel" style="width: 100%; padding: 8px;">
                        <option value="">Não atribuído</option>
                        ${opcoesResponsavel}
                    </select>
                </div>
                <div>
                    <label for="novo-status" style="display: block; margin-bottom: 5px; font-weight: 600;">Status</label>
                    <select id="novo-status" style="width: 100%; padding: 8px;">
                        <option value="pendente" ${solicitacao.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="andamento" ${solicitacao.status === 'andamento' ? 'selected' : ''}>Em Andamento</option>
                        <option value="aguardando" ${solicitacao.status === 'aguardando' ? 'selected' : ''}>Aguardando</option>
                        <option value="concluida" ${solicitacao.status === 'concluida' ? 'selected' : ''}>Concluída</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="atualizarSolicitacao('${id}')" style="height: fit-content;">Atribuir/Atualizar</button>
            </div>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; text-align: center;">
            <button class="btn-primary" onclick="fecharModalSolicitacao()">Fechar</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function atualizarSolicitacao(id) {
    const novoResponsavel = document.getElementById('novo-responsavel').value;
    const novoStatus = document.getElementById('novo-status').value;
    
    const solicitacao = solicitacoes.find(s => s.id === id);
    if (solicitacao) {
        solicitacao.responsavel = novoResponsavel || null;
        solicitacao.status = novoStatus;
        
        // Atualizar observações baseado na mudança e tipo de equipe
        if (novoResponsavel && solicitacao.status === 'andamento') {
            if (novoResponsavel.includes('Extração')) {
                solicitacao.observacoes = `Atribuído para a Equipe de Extração. Analista: ${novoResponsavel}. Processamento de dados em andamento.`;
            } else if (novoResponsavel.includes('Regularidade')) {
                solicitacao.observacoes = `Atribuído para a Equipe de Regularidade. Analista: ${novoResponsavel}. Análise de conformidade em andamento.`;
            } else if (novoResponsavel.includes('Rubricas')) {
                solicitacao.observacoes = `Atribuído para a Equipe de Rubricas. Analista: ${novoResponsavel}. Criação/alteração de rubrica em andamento.`;
            } else {
                solicitacao.observacoes = `Em análise pela equipe especializada. Responsável: ${novoResponsavel}.`;
            }
        } else if (!novoResponsavel && solicitacao.status === 'pendente') {
            solicitacao.observacoes = 'Aguardando atribuição para equipe especializada da Divisão eSocial.';
        } else if (solicitacao.status === 'concluida') {
            solicitacao.observacoes = 'Solicitação processada e concluída com sucesso pela equipe responsável.';
        } else if (solicitacao.status === 'aguardando') {
            solicitacao.observacoes = 'Aguardando informações adicionais ou aprovações externas para prosseguimento.';
        }
        
        fecharModalSolicitacao();
        carregarSolicitacoes();
        atualizarContadores();
        
        alert('Solicitação atualizada com sucesso!');
    }
}

function verDetalheSolicitacaoEquipe(id) {
    const modal = document.getElementById('modal-solicitacao');
    const titulo = document.getElementById('modal-solicitacao-titulo');
    const body = document.getElementById('modal-solicitacao-body');
    
    const solicitacao = solicitacoes.find(s => s.id === id);
    if (!solicitacao) return;

    titulo.textContent = `Chamado ${id} - Sua Responsabilidade`;
    
    body.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">📋 Informações do Chamado</h4>
            <p><strong>Tipo:</strong> ${solicitacao.tipo}</p>
            <p><strong>Solicitante:</strong> ${solicitacao.solicitante}</p>
            <p><strong>E-mail:</strong> ${solicitacao.email}</p>
            <p><strong>Telefone:</strong> ${solicitacao.telefone || 'Não informado'}</p>
            <p><strong>Órgão:</strong> ${solicitacao.orgao}</p>
            <p><strong>Data:</strong> ${solicitacao.data}</p>
            <p><strong>Status:</strong> <span class="solicitacao-status status-${solicitacao.status}">${solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}</span></p>
            <p><strong>Responsável:</strong> ${solicitacao.responsavel}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">📝 Descrição Detalhada</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px;">${solicitacao.descricao}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">💬 Observações e Andamento</h4>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px;">${solicitacao.observacoes}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #dc2626; margin-bottom: 15px;">⚡ Atualizar Status</h4>
            <div style="display: grid; grid-template-columns: 1fr auto; gap: 15px; align-items: end;">
                <div>
                    <label for="status-equipe" style="display: block; margin-bottom: 5px; font-weight: 600;">Novo Status</label>
                    <select id="status-equipe" style="width: 100%; padding: 8px;">
                        <option value="andamento" ${solicitacao.status === 'andamento' ? 'selected' : ''}>Em Andamento</option>
                        <option value="aguardando" ${solicitacao.status === 'aguardando' ? 'selected' : ''}>Aguardando</option>
                        <option value="concluida" ${solicitacao.status === 'concluida' ? 'selected' : ''}>Concluída</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="atualizarStatusEquipe('${id}')" style="height: fit-content;">Atualizar</button>
            </div>
            <div style="margin-top: 10px;">
                <label for="observacao-equipe" style="display: block; margin-bottom: 5px; font-weight: 600;">Adicionar Observação</label>
                <textarea id="observacao-equipe" style="width: 100%; padding: 8px; min-height: 80px;" placeholder="Descreva o andamento, dificuldades ou conclusão do chamado..."></textarea>
            </div>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <button class="btn-primary" onclick="fecharModalSolicitacao()">Fechar</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function atualizarStatusEquipe(id) {
    const novoStatus = document.getElementById('status-equipe').value;
    const novaObservacao = document.getElementById('observacao-equipe').value;
    
    const solicitacao = solicitacoes.find(s => s.id === id);
    if (solicitacao) {
        solicitacao.status = novoStatus;
        
        // Atualizar observações com input da equipe
        if (novaObservacao.trim()) {
            const dataAtual = new Date().toLocaleDateString('pt-BR');
            const observacaoComData = `[${dataAtual} - ${usuarioLogado.nome}] ${novaObservacao.trim()}`;
            
            if (solicitacao.observacoes.includes('Atribuído para')) {
                solicitacao.observacoes += `\n\n${observacaoComData}`;
            } else {
                solicitacao.observacoes = observacaoComData;
            }
        }
        
        // Atualizar status específico
        if (novoStatus === 'concluida') {
            solicitacao.observacoes += `\n\n[${new Date().toLocaleDateString('pt-BR')} - ${usuarioLogado.nome}] ✅ Chamado concluído pela equipe responsável.`;
        }
        
        fecharModalSolicitacao();
        carregarSolicitacoesEquipeEspecializada();
        
        alert('Status do chamado atualizado com sucesso!');
    }
}

function fecharModalSolicitacao() {
    document.getElementById('modal-solicitacao').style.display = 'none';
}

// Fechar modais ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});