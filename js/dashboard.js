// FUNÇÕES DO DASHBOARD ADMINISTRATIVO

// Configurações de painel por perfil
function configurarPainelDivisao() {
    // Divisão vê todas as abas exceto gestão de órgãos
    document.querySelectorAll('.admin-tab').forEach(tab => {
        if (tab.textContent.includes('Órgãos')) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'block';
        }
    });
    
    // Configurar títulos
    document.getElementById('admin-title').textContent = '🏛️ Painel Divisão eSocial';
    document.getElementById('admin-subtitle').textContent = 'Gestão completa de chamados e atribuição para equipes especializadas';
    
    // Carregar dados
    carregarTabelaUsuarios();
    carregarSolicitacoes();
    preencherFiltros();
    mostrarAbaAdmin('dashboard');
}

function configurarPainelAdmin() {
    // Admin vê dashboard, usuários e órgãos (mas não solicitações)
    document.querySelectorAll('.admin-tab').forEach(tab => {
        if (tab.textContent.includes('Chamados')) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'block';
        }
    });
    
    // Configurar títulos
    document.getElementById('admin-title').textContent = '🏛️ Administração Geral';
    document.getElementById('admin-subtitle').textContent = 'Gestão de usuários e órgãos do sistema';
    
    // Carregar dados
    carregarTabelaUsuarios();
    carregarTabelaOrgaos();
    mostrarAbaAdmin('dashboard');
}

function configurarPainelGestor() {
    // Gestor vê apenas aba de usuários
    document.querySelectorAll('.admin-tab').forEach(tab => {
        if (tab.textContent.includes('Gestão de Usuários')) {
            tab.style.display = 'block';
            tab.classList.add('active');
        } else {
            tab.style.display = 'none';
            tab.classList.remove('active');
        }
    });
    
    // Configurar títulos
    document.getElementById('admin-title').textContent = '👥 Gestão de Usuários';
    document.getElementById('admin-subtitle').textContent = 'Cadastre usuários para ' + usuarioLogado.orgao;
    
    // Mostrar apenas gestão de usuários
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-solicitacoes').style.display = 'none';
    document.getElementById('admin-usuarios').style.display = 'block';
    document.getElementById('admin-orgaos').style.display = 'none';
    
    carregarTabelaUsuarios();
}

function configurarPainelEquipeEspecializada() {
    // Equipes especializadas veem apenas aba de chamados atribuídos
    document.querySelectorAll('.admin-tab').forEach(tab => {
        if (tab.textContent.includes('Chamados')) {
            tab.style.display = 'block';
            tab.classList.add('active');
            // Alterar texto da aba para ser mais específico
            tab.innerHTML = '📋 Minha Fila de Chamados';
        } else {
            tab.style.display = 'none';
            tab.classList.remove('active');
        }
    });
    
    // Configurar títulos baseado no tipo de equipe
    const tiposEquipe = {
        'equipe_extracao': {
            emoji: '📤',
            nome: 'Equipe de Extração',
            descricao: 'Chamados de extração de dados e relatórios atribuídos para sua equipe'
        },
        'equipe_regularidade': {
            emoji: '📊', 
            nome: 'Equipe de Regularidade',
            descricao: 'Chamados de regularidade e conformidade atribuídos para sua equipe'
        },
        'equipe_rubricas': {
            emoji: '📝',
            nome: 'Equipe de Rubricas', 
            descricao: 'Chamados de criação e gestão de rubricas atribuídos para sua equipe'
        }
    };
    
    const tipoEquipe = tiposEquipe[usuarioLogado.perfil];
    document.getElementById('admin-title').textContent = `${tipoEquipe.emoji} ${tipoEquipe.nome}`;
    document.getElementById('admin-subtitle').textContent = tipoEquipe.descricao;
    
    // Mostrar apenas solicitações atribuídas
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-solicitacoes').style.display = 'block';
    document.getElementById('admin-usuarios').style.display = 'none';
    document.getElementById('admin-orgaos').style.display = 'none';
    
    // Configurar filtros específicos para a equipe
    preencherFiltrosEquipeEspecializada();
    carregarSolicitacoesEquipeEspecializada();
}

function mostrarAbaAdmin(aba) {
    // Remover classe active de todas as abas
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    
    // Adicionar classe active na aba clicada (se existir event.target)
    if (typeof event !== 'undefined' && event.target) {
        event.target.classList.add('active');
    } else {
        // Caso seja chamado programaticamente
        document.querySelectorAll('.admin-tab').forEach(tab => {
            if ((aba === 'dashboard' && tab.textContent.includes('Dashboard')) ||
                (aba === 'solicitacoes' && (tab.textContent.includes('Chamados') || tab.textContent.includes('Fila'))) ||
                (aba === 'usuarios' && tab.textContent.includes('Usuários')) ||
                (aba === 'orgaos' && tab.textContent.includes('Órgãos'))) {
                tab.classList.add('active');
            }
        });
    }
    
    // Esconder todas as seções
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-solicitacoes').style.display = 'none';
    document.getElementById('admin-usuarios').style.display = 'none';
    document.getElementById('admin-orgaos').style.display = 'none';
    
    // Mostrar seção correspondente
    if (aba === 'dashboard') {
        document.getElementById('admin-dashboard').style.display = 'block';
    } else if (aba === 'solicitacoes') {
        document.getElementById('admin-solicitacoes').style.display = 'block';
        // Se for equipe especializada, carregar suas solicitações específicas
        if (['equipe_extracao', 'equipe_regularidade', 'equipe_rubricas'].includes(usuarioLogado.perfil)) {
            carregarSolicitacoesEquipeEspecializada();
        } else {
            carregarSolicitacoes();
        }
    } else if (aba === 'usuarios') {
        document.getElementById('admin-usuarios').style.display = 'block';
        carregarTabelaUsuarios();
    } else if (aba === 'orgaos') {
        document.getElementById('admin-orgaos').style.display = 'block';
        carregarTabelaOrgaos();
    }
}

function atualizarContadores() {
    // Atualizar contador de usuários por órgão
    atualizarContadorUsuariosPorOrgao();
    
    if (usuarioLogado.perfil === 'divisao_esocial') {
        // Divisão vê todos os dados
        document.getElementById('total-solicitacoes').textContent = solicitacoes.filter(s => s.status !== 'concluida').length;
        document.getElementById('total-usuarios').textContent = usuarios.length;
        document.getElementById('total-orgaos').textContent = orgaos.length;
    } else if (usuarioLogado.perfil === 'admin') {
        // Admin vê todos os dados também
        document.getElementById('total-usuarios').textContent = usuarios.length;
        document.getElementById('total-orgaos').textContent = orgaos.length;
    } else if (usuarioLogado.perfil === 'gestor') {
        // Gestor vê apenas usuários do próprio órgão
        const usuariosOrgao = usuarios.filter(user => user.orgao === usuarioLogado.orgao);
        document.getElementById('total-usuarios').textContent = usuariosOrgao.length;
    }
}

// GESTÃO DE ÓRGÃOS
function carregarTabelaOrgaos() {
    const tbody = document.getElementById('orgaos-table-body');
    tbody.innerHTML = '';
    
    orgaos.forEach((orgao, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${orgao.nome}</td>
            <td>${orgao.codigo || 'N/A'}</td>
            <td>${orgao.usuarios} usuários</td>
            <td>
                <button class="btn-action btn-edit" onclick="editarOrgao(${index})">✏️ Editar</button>
                ${orgao.usuarios === 0 ? 
                    `<button class="btn-action btn-delete" onclick="excluirOrgao(${index})">🗑️ Excluir</button>` : 
                    `<span style="color: #6b7280; font-size: 0.8rem;">Tem usuários</span>`
                }
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// GESTÃO DE SOLICITAÇÕES
function preencherFiltros() {
    // Preencher filtro de órgãos
    const filterOrgao = document.getElementById('filter-orgao');
    const orgaosUnicos = [...new Set(solicitacoes.map(s => s.orgao))];
    
    filterOrgao.innerHTML = '<option value="">Todos os Órgãos</option>';
    orgaosUnicos.forEach(orgao => {
        filterOrgao.innerHTML += `<option value="${orgao}">${orgao}</option>`;
    });

    // Preencher filtro de responsáveis (equipes especializadas)
    const filterResponsavel = document.getElementById('filter-responsavel');
    const equipesEspecializadas = usuarios.filter(u => 
        ['equipe_extracao', 'equipe_regularidade', 'equipe_rubricas'].includes(u.perfil)
    );
    
    filterResponsavel.innerHTML = '<option value="">Todas as Equipes</option><option value="nao_atribuido">Não Atribuído</option>';
    equipesEspecializadas.forEach(membro => {
        filterResponsavel.innerHTML += `<option value="${membro.nome}">${membro.nome}</option>`;
    });
}

function carregarSolicitacoes() {
    const container = document.getElementById('solicitacoes-lista');
    container.innerHTML = '';

    solicitacoes.forEach(sol => {
        const statusClass = `status-${sol.status}`;
        const solicitacaoDiv = document.createElement('div');
        solicitacaoDiv.className = 'solicitacao-item';
        solicitacaoDiv.onclick = () => verDetalheSolicitacao(sol.id);
        
        solicitacaoDiv.innerHTML = `
            <div class="solicitacao-header">
                <span class="solicitacao-id">${sol.id}</span>
                <span class="solicitacao-status ${statusClass}">${sol.status.charAt(0).toUpperCase() + sol.status.slice(1)}</span>
            </div>
            <div class="solicitacao-info">
                <strong>${sol.orgao}:</strong> ${sol.tipo} - ${sol.descricao.substring(0, 80)}...<br>
                <small>Solicitado por ${sol.solicitante} • ${sol.data}</small>
                ${sol.responsavel ? `<div class="solicitacao-assignee">👤 Responsável: ${sol.responsavel}</div>` : '<div class="solicitacao-assignee">⚠️ Não atribuído</div>'}
            </div>
        `;
        
        container.appendChild(solicitacaoDiv);
    });
}

function aplicarFiltros() {
    const status = document.getElementById('filter-status').value;
    const orgao = document.getElementById('filter-orgao').value;
    const responsavel = document.getElementById('filter-responsavel').value;

    const container = document.getElementById('solicitacoes-lista');
    container.innerHTML = '';

    const solicitacoesFiltradas = solicitacoes.filter(sol => {
        let passaStatus = !status || sol.status === status;
        let passaOrgao = !orgao || sol.orgao === orgao;
        let passaResponsavel = !responsavel || 
            (responsavel === 'nao_atribuido' && !sol.responsavel) ||
            (responsavel !== 'nao_atribuido' && sol.responsavel === responsavel);

        return passaStatus && passaOrgao && passaResponsavel;
    });

    solicitacoesFiltradas.forEach(sol => {
        const statusClass = `status-${sol.status}`;
        const solicitacaoDiv = document.createElement('div');
        solicitacaoDiv.className = 'solicitacao-item';
        solicitacaoDiv.onclick = () => verDetalheSolicitacao(sol.id);
        
        solicitacaoDiv.innerHTML = `
            <div class="solicitacao-header">
                <span class="solicitacao-id">${sol.id}</span>
                <span class="solicitacao-status ${statusClass}">${sol.status.charAt(0).toUpperCase() + sol.status.slice(1)}</span>
            </div>
            <div class="solicitacao-info">
                <strong>${sol.orgao}:</strong> ${sol.tipo} - ${sol.descricao.substring(0, 80)}...<br>
                <small>Solicitado por ${sol.solicitante} • ${sol.data}</small>
                ${sol.responsavel ? `<div class="solicitacao-assignee">👤 Responsável: ${sol.responsavel}</div>` : '<div class="solicitacao-assignee">⚠️ Não atribuído</div>'}
            </div>
        `;
        
        container.appendChild(solicitacaoDiv);
    });
}

// FUNÇÕES PARA EQUIPES ESPECIALIZADAS
function preencherFiltrosEquipeEspecializada() {
    // Filtros simplificados para equipes especializadas
    const filterOrgao = document.getElementById('filter-orgao');
    const filterResponsavel = document.getElementById('filter-responsavel');
    
    // Simplificar - focar apenas no status dos chamados da sua equipe
    filterOrgao.style.display = 'none';
    filterResponsavel.style.display = 'none';
    
    // Ocultar labels dos filtros desnecessários
    filterOrgao.parentElement.style.display = 'none';
    filterResponsavel.parentElement.style.display = 'none';
}

function carregarSolicitacoesEquipeEspecializada() {
    const container = document.getElementById('solicitacoes-lista');
    container.innerHTML = '';

    // Filtrar solicitações apenas para membros da equipe do usuário logado
    const membrosEquipe = usuarios.filter(u => u.perfil === usuarioLogado.perfil).map(u => u.nome);
    const solicitacoesDaEquipe = solicitacoes.filter(sol => 
        sol.responsavel && membrosEquipe.includes(sol.responsavel)
    );

    if (solicitacoesDaEquipe.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: rgba(255,255,255,0.95); border-radius: 12px; color: #6b7280;">
                <h3>📋 Nenhum chamado atribuído</h3>
                <p>Não há chamados atribuídos para sua equipe no momento.</p>
                <p>Aguarde novas atribuições da Divisão eSocial.</p>
            </div>
        `;
        return;
    }

    solicitacoesDaEquipe.forEach(sol => {
        const statusClass = `status-${sol.status}`;
        const solicitacaoDiv = document.createElement('div');
        solicitacaoDiv.className = 'solicitacao-item';
        solicitacaoDiv.onclick = () => verDetalheSolicitacaoEquipe(sol.id);
        
        solicitacaoDiv.innerHTML = `
            <div class="solicitacao-header">
                <span class="solicitacao-id">${sol.id}</span>
                <span class="solicitacao-status ${statusClass}">${sol.status.charAt(0).toUpperCase() + sol.status.slice(1)}</span>
            </div>
            <div class="solicitacao-info">
                <strong>${sol.orgao}:</strong> ${sol.tipo} - ${sol.descricao.substring(0, 80)}...<br>
                <small>Solicitado por ${sol.solicitante} • ${sol.data}</small>
                <div class="solicitacao-assignee">👤 Atribuído para: ${sol.responsavel}</div>
            </div>
        `;
        
        container.appendChild(solicitacaoDiv);
    });
}