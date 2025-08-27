// DADOS DO SISTEMA
let orgaos = [
    { nome: 'Secretaria de Gestão e Governo Digital', codigo: 53, sigla: 'SGGD', usuarios: 0 },
    { nome: 'Departamento Estadual de Trânsito - DETRAN', codigo: 9, sigla: 'DETRAN', usuarios: 0 },
    { nome: 'Departamento de Estradas de Rodagem - DER', codigo: 7, sigla: 'DER', usuarios: 0 },
    { nome: 'Agência de Transporte do Estado de São Paulo - ARTESP', codigo: 24, sigla: 'ARTESP', usuarios: 0 },
    { nome: 'Hospital das Clínicas FMUSP', codigo: 10, sigla: 'HC-FMUSP', usuarios: 0 },
    { nome: 'Secretaria da Educação', codigo: 25, sigla: 'SEDUC', usuarios: 0 },
    { nome: 'Secretaria de Estado da Saúde', codigo: 26, sigla: 'SES', usuarios: 0 },
    { nome: 'Secretaria da Fazenda e Planejamento', codigo: 27, sigla: 'SEFAZ', usuarios: 0 },
    { nome: 'Agência de Águas do Estado de São Paulo', codigo: 29, sigla: 'ANA-SP', usuarios: 0 },
    { nome: 'Agência Metropolitana da Baixada Santista - AGEM', codigo: 30, sigla: 'AGEM', usuarios: 0 },
    { nome: 'CENTRO ESTADUAL DE EDUCAÇÃO TECNOLÓGICA PAULA SOUZA - CEETEPS', codigo: 31, sigla: 'CEETEPS', usuarios: 0 },
    { nome: 'Agência Metropolitana de Campinas - AGEMCAMP', codigo: 32, sigla: 'AGEMCAMP', usuarios: 0 },
    { nome: 'Agência Metropolitana de Sorocaba - AGEM-SOROCABA', codigo: 33, sigla: 'AGEM-SOC', usuarios: 0 },
    { nome: 'Agência Metropolitana do Vale do Paraíba e Litoral Norte - AGEM-VALE', codigo: 34, sigla: 'AGEM-VALE', usuarios: 0 },
    { nome: 'Caixa Beneficiencia da Polícia Militar - CBPM', codigo: 35, sigla: 'CBPM', usuarios: 0 }
];

// DADOS DOS USUÁRIOS
let usuarios = [
    // ADMIN GERAL
    {
        usuario: 'admin',
        senha: 'admin123',
        nome: 'Administrador Geral do Sistema',
        email: 'admin@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'admin',
        telefone: '(11) 2188-8500'
    },
    
    // EQUIPE DIVISÃO eSocial
    {
        usuario: 'divisao',
        senha: 'divisao123',
        nome: 'Coordenação Divisão eSocial',
        email: 'divisao@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'divisao_esocial',
        telefone: '(11) 2188-8500'
    },
    
    // EQUIPE EXTRAÇÃO
    {
        usuario: 'extracao1',
        senha: '123456',
        nome: 'Ana Paula Santos - Extração',
        email: 'ana.santos@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'equipe_extracao',
        telefone: '(11) 2188-8501'
    },
    {
        usuario: 'extracao2',
        senha: '123456',
        nome: 'Carlos Eduardo Lima - Extração',
        email: 'carlos.lima@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'equipe_extracao',
        telefone: '(11) 2188-8502'
    },
    
    // EQUIPE REGULARIDADE
    {
        usuario: 'regularidade1',
        senha: '123456',
        nome: 'Maria Fernanda Silva - Regularidade',
        email: 'maria.silva@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'equipe_regularidade',
        telefone: '(11) 2188-8503'
    },
    {
        usuario: 'regularidade2',
        senha: '123456',
        nome: 'João Paulo Oliveira - Regularidade',
        email: 'joao.oliveira@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'equipe_regularidade',
        telefone: '(11) 2188-8504'
    },
    
    // EQUIPE RUBRICAS
    {
        usuario: 'rubricas1',
        senha: '123456',
        nome: 'Paula Regina Santos - Rubricas',
        email: 'paula.santos@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'equipe_rubricas',
        telefone: '(11) 2188-8505'
    },
    {
        usuario: 'rubricas2',
        senha: '123456',
        nome: 'Ricardo Almeida Costa - Rubricas',
        email: 'ricardo.costa@esocial.sp.gov.br',
        orgao: 'Secretaria de Gestão e Governo Digital',
        codigoOrgao: 53,
        perfil: 'equipe_rubricas',
        telefone: '(11) 2188-8506'
    },
    
    // GESTORES
    {
        usuario: 'gestor_detran',
        senha: 'gestor123',
        nome: 'Gestor DETRAN eSocial',
        email: 'gestor.detran@detran.sp.gov.br',
        orgao: 'Departamento Estadual de Trânsito - DETRAN',
        codigoOrgao: 9,
        perfil: 'gestor',
        telefone: '(11) 3327-3000'
    },
    {
        usuario: 'gestor_der',
        senha: 'gestor123',
        nome: 'Gestor DER eSocial',
        email: 'gestor.der@sp.gov.br',
        orgao: 'Departamento de Estradas de Rodagem - DER',
        codigoOrgao: 7,
        perfil: 'gestor',
        telefone: '(11) 3311-1400'
    },
    
    // USUÁRIOS PONTOS FOCAIS (baseados em dados reais)
    {
        usuario: '42574990870',
        senha: '123456',
        nome: 'RAFAEL FELIPE DA SILVA',
        email: 'rafael.felipe@spaguas.sp.gov.br',
        orgao: 'Agência de Águas do Estado de São Paulo',
        codigoOrgao: 29,
        perfil: 'usuario',
        telefone: '11 3293-3533'
    },
    {
        usuario: '38097886863',
        senha: '123456',
        nome: 'Jéssica Silva de Oliveira',
        email: 'jessica.oliveira@artesp.sp.gov.br',
        orgao: 'Agência de Transporte do Estado de São Paulo - ARTESP',
        codigoOrgao: 24,
        perfil: 'usuario',
        telefone: '(11) 96358-2805'
    },
    {
        usuario: '25593240833',
        senha: '123456',
        nome: 'Daniela Guimarães Cintra',
        email: 'daniela.cintra@apoioartesp.sp.gov.br',
        orgao: 'Agência de Transporte do Estado de São Paulo - ARTESP',
        codigoOrgao: 24,
        perfil: 'usuario',
        telefone: '(11) 98118-4780'
    },
    {
        usuario: '11515081877',
        senha: '123456',
        nome: 'Marisa Simões de Sales Ribeiro',
        email: 'mssribeiro@agem.sp.gov.br',
        orgao: 'Agência Metropolitana da Baixada Santista - AGEM',
        codigoOrgao: 30,
        perfil: 'usuario',
        telefone: '(13)97404-2866'
    },
    {
        usuario: '35115922835',
        senha: '123456',
        nome: 'Lidiane da Silva Calsolari Almeida',
        email: 'lscalmeida@sp.gov.br',
        orgao: 'Departamento de Estradas de Rodagem - DER',
        codigoOrgao: 7,
        perfil: 'usuario',
        telefone: '(11) 95041-7122'
    },
    {
        usuario: '46484317828',
        senha: '123456',
        nome: 'Julia da Silva Sponchiado',
        email: 'julia.sponchiado@detran.sp.gov.br',
        orgao: 'Departamento Estadual de Trânsito - DETRAN',
        codigoOrgao: 9,
        perfil: 'usuario',
        telefone: '(11) 94603-4257'
    },
    {
        usuario: '27539698845',
        senha: '123456',
        nome: 'Lucia Freire de Almeida',
        email: 'lucia.almeida@detran.sp.gov.br',
        orgao: 'Departamento Estadual de Trânsito - DETRAN',
        codigoOrgao: 9,
        perfil: 'usuario',
        telefone: '(11) 99125-1772'
    },
    {
        usuario: '32917442840',
        senha: '123456',
        nome: 'Marcos Paulo Botelho Buch',
        email: 'marcos.buch@cps.sp.gov.br',
        orgao: 'CENTRO ESTADUAL DE EDUCAÇÃO TECNOLÓGICA PAULA SOUZA - CEETEPS',
        codigoOrgao: 31,
        perfil: 'usuario',
        telefone: '(11) 98595-9928'
    }
];

// DADOS DAS SOLICITAÇÕES
let solicitacoes = [
    {
        id: 'SOL-2025-001',
        tipo: 'Extração',
        solicitante: 'Julia da Silva Sponchiado',
        orgao: 'Departamento Estadual de Trânsito - DETRAN',
        email: 'julia.sponchiado@detran.sp.gov.br',
        telefone: '(11) 94603-4257',
        data: '22/08/2025',
        status: 'pendente',
        descricao: 'Solicitação de extração de dados de funcionários ativos no mês de janeiro de 2025, incluindo informações de admissão, demissão e alterações salariais para transmissão do eSocial.',
        observacoes: 'Aguardando atribuição para equipe especializada em extração de dados.',
        responsavel: null
    },
    {
        id: 'SOL-2025-002',
        tipo: 'Reenvio',
        solicitante: 'Lidiane da Silva Calsolari Almeida',
        orgao: 'Departamento de Estradas de Rodagem - DER',
        email: 'lscalmeida@sp.gov.br',
        telefone: '(11) 95041-7122',
        data: '21/08/2025',
        status: 'andamento',
        descricao: 'Reenvio de arquivo de transmissão do evento S-2299 (Desligamento) que apresentou erro de validação durante o envio inicial ao eSocial.',
        observacoes: 'Em análise técnica pela equipe de regularidade para correção dos dados.',
        responsavel: 'Maria Fernanda Silva - Regularidade'
    },
    {
        id: 'SOL-2025-003',
        tipo: 'Rubrica',
        solicitante: 'Jéssica Silva de Oliveira',
        orgao: 'Agência de Transporte do Estado de São Paulo - ARTESP',
        email: 'jessica.oliveira@artesp.sp.gov.br',
        telefone: '(11) 96358-2805',
        data: '20/08/2025',
        status: 'concluida',
        descricao: 'Criação de nova rubrica salarial para adicional de insalubridade categoria 3, conforme acordo coletivo 2025.',
        observacoes: 'Rubrica criada com sucesso. Código: 1547 - Adicional Insalubridade Grau Médio.',
        responsavel: 'Paula Regina Santos - Rubricas'
    },
    {
        id: 'SOL-2025-004',
        tipo: 'Transmissão',
        solicitante: 'Carla Daniela Pascoal Riciati',
        orgao: 'Caixa Beneficiencia da Polícia Militar - CBPM',
        email: 'carla@cbpm.sp.gov.br',
        telefone: '(11) 94700-7405',
        data: '19/08/2025',
        status: 'aguardando',
        descricao: 'Transmissão de dados de afastamento por licença médica para integração com sistema nacional de saúde e previdência.',
        observacoes: 'Aguardando liberação de acesso aos sistemas externos do INSS.',
        responsavel: 'Ana Paula Santos - Extração'
    },
    {
        id: 'SOL-2025-005',
        tipo: 'Regularidade',
        solicitante: 'Marcos Paulo Botelho Buch',
        orgao: 'CENTRO ESTADUAL DE EDUCAÇÃO TECNOLÓGICA PAULA SOUZA - CEETEPS',
        email: 'marcos.buch@cps.sp.gov.br',
        telefone: '(11) 98595-9928',
        data: '18/08/2025',
        status: 'andamento',
        descricao: 'Regularização de inconsistências nos eventos S-2200 (Cadastramento Inicial) identificadas no relatório de pendências do eSocial.',
        observacoes: 'Análise em andamento - identificadas 47 inconsistências de CPF e dados pessoais.',
        responsavel: 'João Paulo Oliveira - Regularidade'
    },
    {
        id: 'SOL-2025-006',
        tipo: 'Extração',
        solicitante: 'Lucia Freire de Almeida',
        orgao: 'Departamento Estadual de Trânsito - DETRAN',
        email: 'lucia.almeida@detran.sp.gov.br',
        telefone: '(11) 99125-1772',
        data: '17/08/2025',
        status: 'pendente',
        descricao: 'Extração de relatório de folha de pagamento consolidada do exercício 2024 para auditoria interna.',
        observacoes: 'Aguardando atribuição para equipe de extração.',
        responsavel: null
    }
];

// VARIÁVEIS GLOBAIS
let usuarioLogado = null;
let editandoUsuario = null;
let editandoOrgao = null;
let tipoSelecionado = null;