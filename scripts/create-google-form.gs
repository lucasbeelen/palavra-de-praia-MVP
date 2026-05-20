/**
 * Cria automaticamente o formulario de feedback do MVP Palavra de Praia.
 *
 * Como executar:
 * 1. Acesse https://script.google.com.
 * 2. Crie um novo projeto.
 * 3. Cole todo este conteudo no arquivo Code.gs, ou crie um arquivo
 *    create-google-form.gs e cole este conteudo nele.
 * 4. Salve o projeto.
 * 5. Execute a funcao createPalavraDePraiaForm.
 * 6. Autorize sua conta Google quando solicitado.
 * 7. Abra "Executions" ou "Logs" no Apps Script.
 * 8. Copie o link publico do formulario e substitua o FEEDBACK_FORM_URL
 *    da landing page por esse link.
 *
 * Depois de criar o formulario, ajuste manualmente no Google Forms:
 * - imagem de cabecalho;
 * - cores e tema visual;
 * - configuracoes de coleta de e-mail, caso necessario;
 * - mensagem de confirmacao;
 * - permissoes de resposta.
 */

function createPalavraDePraiaForm() {
  var form = FormApp.create("Feedback do MVP - Palavra de Praia");

  form.setDescription(
    [
      "Estamos validando o Palavra de Praia, um jogo educativo criado para ajudar adolescentes a praticar vocabulário em inglês por meio de anagramas e pistas progressivas.",
      "",
      "O jogo é gratuito e está em fase de MVP. Quem quiser apoiar o projeto também pode contribuir pelo sistema \"pague quanto quiser\" no Itch.io.",
      "",
      "Sua resposta leva menos de 2 minutos e vai nos ajudar a avaliar a experiência, melhorias e possibilidades de monetização."
    ].join("\n")
  );

  form.setConfirmationMessage(
    "Obrigado pelo feedback! Sua resposta ajuda o Palavra de Praia a evoluir como MVP educativo."
  );

  // Cria uma planilha separada para armazenar as respostas do formulario.
  var spreadsheet = SpreadsheetApp.create("Respostas - Feedback Palavra de Praia");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  // 1. Faixa etaria.
  addMultipleChoiceQuestion(
    form,
    "Qual é sua faixa etária?",
    [
      "Menos de 12 anos",
      "12 a 14 anos",
      "15 a 17 anos",
      "18 a 24 anos",
      "25 anos ou mais"
    ],
    true
  );

  // 2. Perfil do respondente.
  addMultipleChoiceQuestion(
    form,
    "Qual opção mais combina com você?",
    [
      "Estudante",
      "Pai, mãe ou responsável",
      "Professor(a)",
      "Trabalho em escola ou curso",
      "Outro"
    ],
    true
  );

  // 3. Acesso ao MVP.
  addMultipleChoiceQuestion(
    form,
    "Você conseguiu jogar o MVP?",
    [
      "Sim",
      "Acessei, mas não consegui jogar",
      "Ainda não joguei"
    ],
    true
  );

  // 4. Dispositivo usado.
  addMultipleChoiceQuestion(
    form,
    "Você jogou em qual dispositivo?",
    [
      "Celular",
      "Computador/notebook",
      "Tablet",
      "Não joguei"
    ],
    true
  );

  // 5. Facilidade de entendimento.
  form.addScaleItem()
    .setTitle("O jogo foi fácil de entender?")
    .setBounds(1, 5)
    .setLabels("Muito confuso", "Muito fácil")
    .setRequired(true);

  // 6. Diversao da dinamica.
  form.addScaleItem()
    .setTitle("Você achou a dinâmica divertida?")
    .setBounds(1, 5)
    .setLabels("Nada divertida", "Muito divertida")
    .setRequired(true);

  // 7. Utilidade das pistas.
  addMultipleChoiceQuestion(
    form,
    "As pistas após os erros ajudaram?",
    [
      "Sim, ajudaram bastante",
      "Ajudaram um pouco",
      "Não fizeram diferença",
      "Não percebi as pistas",
      "Não joguei o suficiente para avaliar"
    ],
    true
  );

  // 8. Interesse em jogar novamente.
  addMultipleChoiceQuestion(
    form,
    "Você jogaria novamente se tivesse mais palavras, fases e temas?",
    [
      "Sim",
      "Talvez",
      "Não"
    ],
    true
  );

  // 9. Percepcao de valor pago.
  addMultipleChoiceQuestion(
    form,
    "Você pagaria por uma versão com mais conteúdo ou acha que pais/escolas poderiam pagar?",
    [
      "Sim, eu pagaria",
      "Talvez, dependendo do preço",
      "Eu não pagaria, mas pais/escolas poderiam pagar",
      "Não vejo valor pago"
    ],
    true
  );

  // 10. Temas desejados para futuras versoes.
  form.addCheckboxItem()
    .setTitle("Quais temas você gostaria de ver em próximas versões?")
    .setChoiceValues([
      "Escola",
      "Comida",
      "Animais",
      "Esportes",
      "Viagem",
      "Profissões",
      "Objetos do cotidiano",
      "Verbos básicos",
      "Outro"
    ])
    .setRequired(false);

  // 11. Campo aberto para melhorias.
  form.addParagraphTextItem()
    .setTitle("O que você melhoraria no jogo?")
    .setRequired(false);

  Logger.log("Formulario criado com sucesso.");
  Logger.log("Link de edicao do formulario: " + form.getEditUrl());
  Logger.log("Link publico para respostas: " + form.getPublishedUrl());
  Logger.log("Planilha de respostas: " + spreadsheet.getUrl());

  return {
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl(),
    spreadsheetUrl: spreadsheet.getUrl()
  };
}

/**
 * Adiciona uma pergunta de multipla escolha ao formulario.
 *
 * @param {GoogleAppsScript.Forms.Form} form Formulario do Google Forms.
 * @param {string} title Titulo da pergunta.
 * @param {string[]} choices Opcoes de resposta.
 * @param {boolean} required Define se a pergunta e obrigatoria.
 */
function addMultipleChoiceQuestion(form, title, choices, required) {
  form.addMultipleChoiceItem()
    .setTitle(title)
    .setChoiceValues(choices)
    .setRequired(required);
}
