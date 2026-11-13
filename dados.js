// Edite aqui: cursos, módulos, aulas, provas, lives e ranking.
// "video" = ID do YouTube (o trecho depois de watch?v=).
const ESCOLA = {
  nome: "Darlene Araújo",
  subtitulo: "Escola de Unhas",
  logo: "logo.png", // assinatura em dourado, fundo transparente. Vazio = mostra o nome em texto
  fotoLogin: "imagens-site/login.jpg", // foto da tela de login (ex.: "img/login.jpg")
  whatsapp: "", // ex.: "5511999999999" — usado no suporte e no botão de compra quando o curso não tem link
  fotoBoasVindas: "imagens-site/darlene-unhas.jpg", // foto do banner de entrada da área de membros
  // números do Instagram @darlene_araujonails (nov/2026). Vazio [] = o banner fica sem números
  numeros: [{ valor: "239 mil", rotulo: "seguidoras" }, { valor: "+5 mil", rotulo: "alunas" }, { valor: "+4 mil", rotulo: "publicações" }],
};

// DEMONSTRAÇÃO: cursos que a aluna de teste "comprou". Os outros aparecem travados em "Compre também".
// Na versão real isso vem do cadastro da aluna (liberado pela plataforma de pagamento).
const COMPRADOS = ["manutencao-f1"];

// Pontos: cada aula concluída vale XP_AULA, cada prova aprovada vale XP_PROVA.
const XP_AULA = 10, XP_PROVA = 50;
const NIVEIS = [ // a partir de quantos XP
  { nome: "Iniciante", xp: 0 },
  { nome: "Bronze", xp: 50 },
  { nome: "Prata", xp: 150 },
  { nome: "Ouro", xp: 300 },
  { nome: "Diamante", xp: 600 },
];

// Ranking de exemplo (a aluna logada entra no meio com os pontos dela).
const RANKING_DEMO = [
  { nome: "Juliana S.", xp: 420 }, { nome: "Patrícia M.", xp: 310 }, { nome: "Fernanda R.", xp: 220 },
  { nome: "Camila O.", xp: 140 }, { nome: "Aline P.", xp: 90 }, { nome: "Bruna T.", xp: 40 },
];

// Lives dentro da plataforma: "video" = link ou ID da transmissão no YouTube (pode ser "não listada").
// Toda aluna cadastrada assiste, mesmo sem curso; "exclusiva: true" deixa só para quem comprou o curso.
// "oferta" = cursos mostrados ao lado da live para comprar (vazio = todos que a aluna ainda não tem).
// "link" = sala de fora (Zoom/Meet), usado só quando não tem "video".
const AO_VIVO = [
  { curso: "manutencao-f1", titulo: "Tira-dúvidas: manutenção sem descolamento", data: "2026-11-20T19:00", video: "", oferta: ["manutencao-f1", "manicure-russa"] },
  { curso: "formacao-f1", titulo: "Live de correção de alongamentos", data: "2026-11-27T19:00", video: "", exclusiva: true },
];

const CURSOS = [
  {
    id: "manutencao-f1", capa: "imagens-site/capa-manutencao-f1.jpg", banner: "imagens-site/banner-manutencao-f1.jpg",
    titulo: "Manutenção no Molde F1",
    descricao: "Aprenda a fazer a manutenção no molde F1 com acabamento perfeito e durabilidade.",
    cor: "#2e5e45",
    preco: "R$ 197", // shortcut: preço de exemplo, o checkout da Kiwify não mostra o valor sem carregar o pagamento
    linkCompra: "https://pay.kiwify.com.br/c0DlZJT", // link do checkout (Hotmart, Kiwify...). Vazio = abre o WhatsApp
    // subpágina do curso (curso.html?c=id). Sem "pagina" = o mini banner vai direto para a compra
    pagina: {
      promessa: "Domine a manutenção no Molde F1 com segurança, precisão e acabamento profissional, mesmo depois de semanas de crescimento.",
      aprende: ["Corrigir descolamentos sem remover toda a estrutura", "Reposicionar o ponto de tensão", "Nivelar a área da cutícula com naturalidade", "Reduzir o tempo de atendimento sem perder qualidade", "Fidelizar a cliente com unhas que duram"],
      tecnicas: ["Baby Boomer", "Esmaltação em gel vermelha", "Esmaltação em gel magnético", "Esmaltação em gel preta", "Pó cromado", "Traço cromado", "Raminho de folha"],
      inclui: ["Certificado", "1 ano de acesso", "Moldes indicados", "Formatos: 3 quadradas, 1 bailarina e 5 almonds"],
      obs: "Este curso não tem grupo de suporte.",
      plataforma: "Kiwify",
    },
    modulos: [
      { titulo: "Primeiros passos", imagem: "imagens-site/modulo-manutencao-f1-1.jpg", aulas: [{ titulo: "Seja bem-vinda", video: "" }, { titulo: "Materiais que você vai usar", video: "" }] },
      { titulo: "Preparação", imagem: "imagens-site/modulo-manutencao-f1-2.jpg", aulas: [{ titulo: "Remoção e preparo da unha", video: "" }, { titulo: "Higienização", video: "" }] },
      { titulo: "Manutenção na prática", imagem: "imagens-site/modulo-manutencao-f1-3.jpg", aulas: [{ titulo: "Aplicação no molde F1", video: "" }, { titulo: "Lixamento e acabamento", video: "" }] },
    ],
    prova: [
      { p: "Qual o primeiro passo antes da manutenção?", op: ["Aplicar o gel", "Preparar e higienizar a unha", "Lixar o acabamento"], certa: 1 },
      { p: "O molde F1 serve para:", op: ["Dar formato à unha", "Remover cutícula", "Secar o esmalte"], certa: 0 },
    ],
  },
  {
    id: "formacao-f1", capa: "imagens-site/capa-formacao-f1.jpg", banner: "imagens-site/banner-formacao-f1.jpg",
    titulo: "Formação Completa no Molde F1",
    descricao: "Do zero ao profissional: alongamento no molde F1 passo a passo.",
    cor: "#24533f", preco: "R$ 497", linkCompra: "https://pay.kiwify.com.br/XmsV73Y", // Master Molde F1 2.0; sem descrição no checkout, então sem subpágina
    modulos: [
      { titulo: "Primeiros passos", imagem: "imagens-site/modulo-formacao-f1-1.jpg", aulas: [{ titulo: "Seja bem-vinda", video: "" }] },
      { titulo: "Técnica", imagem: "imagens-site/modulo-formacao-f1-2.jpg", aulas: [{ titulo: "Aula 1", video: "" }, { titulo: "Aula 2", video: "" }] },
    ],
  },
  {
    id: "manicure-russa", capa: "imagens-site/capa-manicure-russa.jpg", banner: "imagens-site/banner-manicure-russa.jpg",
    titulo: "Manicure Russa e Blindagem",
    descricao: "Cutilagem russa com segurança e blindagem para unhas naturais mais fortes.",
    cor: "#4f5d3a", preco: "R$ 295", linkCompra: "https://pay.hotmart.com/L98605735Q", // Manicure PRO 2.0 na Hotmart
    pagina: {
      promessa: "Manicure russa com vaselina sólida para uma cutícula perfeita, e blindagem com alinhamento estrutural para a esmaltação em gel durar.",
      aprende: ["Manicure russa com vaselina sólida", "Esmaltação em gel", "Blindagem estruturada", "Banho de gel", "Pé com esmaltação em gel", "Teoria aprofundada de cada etapa"],
      bonus: "Manutenção no Molde F1 com naturalidade",
      inclui: ["Grupo de suporte", "Certificado", "1 ano de acesso", "7 dias de garantia"],
      parcelas: "ou 12x de R$ 30,51",
      plataforma: "Hotmart",
    },
    modulos: [{ titulo: "Primeiros passos", imagem: "imagens-site/modulo-manicure-russa-1.jpg", aulas: [{ titulo: "Seja bem-vinda", video: "" }] }],
  },
  {
    id: "decoracao", capa: "imagens-site/capa-decoracao.jpg", banner: "imagens-site/banner-decoracao.jpg",
    titulo: "Decoração",
    descricao: "Técnicas de decoração para valorizar seu trabalho e cobrar mais.",
    cor: "#6b5a32", preco: "R$ 97", linkCompra: "",
    modulos: [{ titulo: "Primeiros passos", imagem: "imagens-site/modulo-decoracao-1.jpg", aulas: [{ titulo: "Seja bem-vinda", video: "" }] }],
  },
  {
    id: "fibra-de-vidro", capa: "imagens-site/capa-fibra-de-vidro.jpg", banner: "imagens-site/banner-fibra-de-vidro.jpg",
    titulo: "Fibra de Vidro",
    descricao: "Alongamento em fibra de vidro com naturalidade e resistência.",
    cor: "#2c4f46", preco: "R$ 197", linkCompra: "",
    modulos: [{ titulo: "Primeiros passos", imagem: "imagens-site/modulo-fibra-de-vidro-1.jpg", aulas: [{ titulo: "Seja bem-vinda", video: "" }] }],
  },
  {
    id: "aperfeicoamento", capa: "imagens-site/capa-aperfeicoamento.jpg",
    titulo: "Aperfeiçoamento (Presencial)",
    descricao: "Curso presencial de aperfeiçoamento.",
    cor: "#4a4a42",
    emBreve: true,
    modulos: [],
  },
];

// O que foi editado no painel (painel.html) substitui a lista acima. Só na demo: fica salvo no navegador.
try {
  const doPainel = JSON.parse(localStorage.getItem("cursosPainel"));
  if (Array.isArray(doPainel)) CURSOS.splice(0, CURSOS.length, ...doPainel);
} catch {}
