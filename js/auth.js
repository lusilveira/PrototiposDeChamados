// SISTEMA DE AUTENTICAÇÃO

// Verificar se há usuário logado ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    const sessao = JSON.parse(sessionStorage.getItem('usuarioLogado') || 'null');
    if (sessao) {
        usuarioLogado = sessao;
        mostrarInterface();
    }
    
    // Atualizar contadores de usuários por órgão
    atualizarContadorUsuariosPorOrgao();
});

// Sistema de Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;
    
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    
    if (usuarioEncontrado) {
        usuarioLogado = usuarioEncontrado;
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        mostrarInterface();
    } else {
        document.getElementById('error-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('error-message').style.display = 'none';
        }, 3000);
    }
});

// Mostrar interface após login
function mostrarInterface() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    
    // Atualizar informações do usuário
    const iniciais = usuarioLogado.nome.split(' ')
        .map(palavra => palavra[0])
        .slice(0, 2)
        .join('');
    
    document.getElementById('user-avatar').textContent = iniciais;
    document.getElementById('user-name').textContent = usuarioLogado.nome;
    document.getElementById('user-org').textContent = usuarioLogado.orgao;
    document.getElementById('user-perfil').textContent = usuarioLogado.perfil.replace('_', ' ').toUpperCase();
    
    // Controle de acesso por perfil
    if (usuarioLogado.perfil === 'divisao_esocial') {
        // DIVISÃO ESOCIAL: Painel completo, NÃO vê formulário de solicitações
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('user-section').style.display = 'none';
        configurarPainelDivisao();
    } else if (usuarioLogado.perfil === 'admin') {
        // ADMIN: Dashboard + Gestão de usuários e órgãos, NÃO vê formulário de solicitações
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('user-section').style.display = 'none';
        configurarPainelAdmin();
    } else if (usuarioLogado.perfil === 'gestor') {
        // GESTOR: Apenas gestão de usuários do próprio órgão
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('user-section').style.display = 'none';
        configurarPainelGestor();
    } else if (['equipe_extracao', 'equipe_regularidade', 'equipe_rubricas'].includes(usuarioLogado.perfil)) {
        // EQUIPES ESPECIALIZADAS: Veem apenas seus chamados atribuídos, NÃO fazem solicitações
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('user-section').style.display = 'none';
        configurarPainelEquipeEspecializada();
    } else {
        // USUÁRIOS: Apenas solicitações
        document.getElementById('admin-panel').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
    }
    
    atualizarContadores();
}

// Logout
function logout() {
    sessionStorage.removeItem('usuarioLogado');
    usuarioLogado = null;
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
    
    // Limpar formulários
    document.getElementById('login-form').reset();
    document.getElementById('error-message').style.display = 'none';
}

// Função para atualizar contadores de usuários por órgão
function atualizarContadorUsuariosPorOrgao() {
    // Resetar contadores
    orgaos.forEach(orgao => orgao.usuarios = 0);
    
    // Contar usuários por órgão
    usuarios.forEach(usuario => {
        const orgao = orgaos.find(o => o.nome === usuario.orgao);
        if (orgao) {
            orgao.usuarios++;
        }
    });
}