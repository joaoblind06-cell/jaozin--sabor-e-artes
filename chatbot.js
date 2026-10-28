/**
 * Chatbot Widget Auto-Injetável - Sabor & Arte Confeitaria
 * Recursos: Abertura/Fechamento inteligente, Tecla ESC, clique fora,
 * indicador de digitação, busca aprimorada e suporte a HTML sanitizado.
 */
(function () {
  if (window.chatbotInicializado) return;
  window.chatbotInicializado = true;

  // 1. ESTILOS CSS ADAPTADOS E MODERNIZADOS
  const cssStyles = `
    #faq-chatbot-widget {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif !important;
      position: fixed !important;
      bottom: 95px !important;
      right: 25px !important;
      z-index: 99999999 !important;
    }

    #faq-toggle-btn {
      width: 58px !important;
      height: 58px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #D85A7F, #B84364) !important;
      color: #ffffff !important;
      border: none !important;
      box-shadow: 0 4px 18px rgba(216, 90, 127, 0.45) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      outline: none !important;
      transition: transform 0.25s ease, box-shadow 0.25s ease !important;
    }

    #faq-toggle-btn:hover {
      transform: scale(1.08) !important;
      box-shadow: 0 6px 22px rgba(216, 90, 127, 0.6) !important;
    }

    #faq-toggle-btn svg {
      width: 26px !important;
      height: 26px !important;
      fill: #ffffff !important;
      pointer-events: none !important;
    }

    #faq-chat-window {
      position: fixed !important;
      bottom: 165px !important;
      right: 25px !important;
      width: 370px !important;
      max-width: calc(100vw - 35px) !important;
      height: 520px !important;
      max-height: calc(100vh - 180px) !important;
      background-color: #ffffff !important;
      border-radius: 18px !important;
      box-shadow: 0 12px 40px rgba(45, 30, 24, 0.28) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 99999999 !important;
      border: 1px solid #EAE0DD !important;
      transition: opacity 0.25s ease, transform 0.25s ease !important;
    }

    .faq-hidden {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }

    .faq-header {
      background: linear-gradient(135deg, #D85A7F, #B84364) !important;
      color: #ffffff !important;
      padding: 12px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    }

    .faq-header-info {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-size: 15px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      line-height: 1.2 !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    }

    .faq-icon-btn {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 16px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 5px 7px !important;
      opacity: 0.9;
      border-radius: 6px !important;
      transition: background-color 0.2s, opacity 0.2s !important;
    }

    .faq-icon-btn:hover {
      opacity: 1 !important;
      background-color: rgba(255, 255, 255, 0.2) !important;
    }

    #faq-messages {
      flex: 1 !important;
      padding: 14px !important;
      overflow-y: auto !important;
      background-color: #FFF8F6 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      scroll-behavior: smooth !important;
    }

    .faq-msg {
      max-width: 88% !important;
      padding: 10px 14px !important;
      border-radius: 14px !important;
      font-size: 13.5px !important;
      line-height: 1.5 !important;
      word-wrap: break-word !important;
      white-space: pre-line !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background-color: #ffffff !important;
      color: #2D1E18 !important;
      border: 1px solid #EAE0DD !important;
      border-bottom-left-radius: 3px !important;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03) !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background: linear-gradient(135deg, #D85A7F, #B84364) !important;
      color: #ffffff !important;
      border-bottom-right-radius: 3px !important;
      box-shadow: 0 2px 6px rgba(216, 90, 127, 0.25) !important;
    }

    .faq-msg.system-info {
      align-self: center !important;
      background-color: #FDF0ED !important;
      color: #B84364 !important;
      font-size: 11.5px !important;
      border: 1px solid #EAE0DD !important;
      border-radius: 8px !important;
      padding: 6px 12px !important;
      text-align: center !important;
      white-space: normal !important;
    }

    .faq-typing {
      align-self: flex-start !important;
      background-color: #ffffff !important;
      border: 1px solid #EAE0DD !important;
      border-radius: 14px !important;
      border-bottom-left-radius: 3px !important;
      padding: 10px 14px !important;
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
    }

    .faq-typing .dot {
      width: 6px !important;
      height: 6px !important;
      background-color: #D85A7F !important;
      border-radius: 50% !important;
      animation: faqDotPulse 1.4s infinite ease-in-out !important;
    }

    .faq-typing .dot:nth-child(2) { animation-delay: 0.2s !important; }
    .faq-typing .dot:nth-child(3) { animation-delay: 0.4s !important; }

    @keyframes faqDotPulse {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
      40% { transform: scale(1.1); opacity: 1; }
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      margin-top: 4px !important;
    }

    .faq-chip {
      background-color: #FFF0F3 !important;
      color: #D85A7F !important;
      border: 1px solid #FAD2E1 !important;
      padding: 7px 12px !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      text-align: left !important;
    }

    .faq-chip:hover {
      background-color: #FAD2E1 !important;
      color: #B84364 !important;
      transform: translateY(-1px) !important;
    }

    .faq-footer {
      padding: 12px !important;
      background-color: #ffffff !important;
      border-top: 1px solid #EAE0DD !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
      margin: 0 !important;
    }

    #faq-input {
      flex: 1 !important;
      padding: 10px 14px !important;
      border: 1px solid #EAE0DD !important;
      border-radius: 20px !important;
      font-size: 13.5px !important;
      outline: none !important;
      color: #2D1E18 !important;
      background-color: #FAFAFA !important;
      transition: border-color 0.2s, background-color 0.2s !important;
    }

    #faq-input:focus {
      border-color: #D85A7F !important;
      background-color: #ffffff !important;
    }

    #faq-send-btn {
      background: linear-gradient(135deg, #D85A7F, #B84364) !important;
      color: #ffffff !important;
      border: none !important;
      width: 38px !important;
      height: 38px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
      flex-shrink: 0 !important;
    }

    #faq-send-btn:hover {
      transform: scale(1.06) !important;
      box-shadow: 0 4px 12px rgba(216, 90, 127, 0.4) !important;
    }

    #faq-send-btn svg {
      width: 18px !important;
      height: 18px !important;
      fill: #ffffff !important;
    }
  `;

  // 2. ESTRUTURA HTML DO WIDGET
  const htmlTemplate = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir Atendimento Sabor & Arte">
      <svg id="faq-icon-open" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      </svg>
      <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <div id="faq-chat-window" class="faq-hidden" role="dialog" aria-label="Atendimento Sabor e Arte">
      <div class="faq-header">
        <div class="faq-header-info">
          <span>🎂</span>
          <h3>Sabor & Arte - Atendimento</h3>
        </div>
        <div class="faq-header-actions">
          <button type="button" id="faq-reset-btn" class="faq-icon-btn" title="Voltar ao Início">🔄</button>
          <label for="faq-json-file" class="faq-icon-btn" title="Anexar base JSON extra">📁</label>
          <input type="file" id="faq-json-file" accept=".json" style="display: none;" />
          <button type="button" id="faq-close-btn" class="faq-icon-btn" aria-label="Fechar Chat">✕</button>
        </div>
      </div>
      <div id="faq-messages"></div>
      <div class="faq-footer">
        <div class="faq-input-area">
          <input type="text" id="faq-input" placeholder="Digite sua dúvida (ex: morango, preço, entrega)..." autocomplete="off" />
          <button type="button" id="faq-send-btn" aria-label="Enviar mensagem">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  let baseConhecimento = [];

  // STOPWORDS PARA EVITAR FALSOS POSITIVOS
  const stopWords = new Set([
    "o",
    "a",
    "os",
    "as",
    "um",
    "uma",
    "uns",
    "umas",
    "de",
    "do",
    "da",
    "dos",
    "das",
    "em",
    "no",
    "na",
    "nos",
    "nas",
    "para",
    "por",
    "com",
    "como",
    "que",
    "se",
    "ou",
    "e",
    "mais",
    "tem",
    "voce",
    "voces",
    "gostaria",
    "saber",
    "quero",
    "queria",
    "onde",
  ]);

  // 3. INICIALIZAÇÃO DO CHATBOT
  window.initChatbot = function (opcoes = {}) {
    if (document.getElementById("faq-chatbot-widget")) return;

    // Injeta Estilos
    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

    // Injeta Elemento
    const container = document.createElement("div");
    container.id = "faq-chatbot-widget";
    container.innerHTML = htmlTemplate;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("faq-toggle-btn");
    const closeBtn = document.getElementById("faq-close-btn");
    const resetBtn = document.getElementById("faq-reset-btn");
    const chatWindow = document.getElementById("faq-chat-window");
    const iconOpen = document.getElementById("faq-icon-open");
    const iconClose = document.getElementById("faq-icon-close");
    const messagesBox = document.getElementById("faq-messages");
    const sendBtn = document.getElementById("faq-send-btn");
    const input = document.getElementById("faq-input");
    const jsonFileInput = document.getElementById("faq-json-file");

    // SANITIZAÇÃO E FORMATADOR DE MARKDOWN/LINKS
    function formatarTexto(txt) {
      if (!txt) return "";
      let textoSafe = txt
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Transforma **negrito**
      textoSafe = textoSafe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Transforma *italico*
      textoSafe = textoSafe.replace(/\*(.*?)\*/g, "<em>$1</em>");
      // Transforma links WhatsApp / HTTP
      textoSafe = textoSafe.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener" style="color: #D85A7F; font-weight: bold; text-decoration: underline;">$1</a>',
      );

      return textoSafe;
    }

    function addMessage(texto, tipo) {
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;
      div.innerHTML = formatarTexto(texto);
      messagesBox.appendChild(div);
      scrollToBottom();
    }

    function mostrarIndicadorDigitando() {
      const typingDiv = document.createElement("div");
      typingDiv.className = "faq-typing";
      typingDiv.id = "faq-typing-indicator";
      typingDiv.innerHTML =
        '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
      messagesBox.appendChild(typingDiv);
      scrollToBottom();
    }

    function removerIndicadorDigitando() {
      const typingDiv = document.getElementById("faq-typing-indicator");
      if (typingDiv) typingDiv.remove();
    }

    function scrollToBottom() {
      setTimeout(() => {
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }, 50);
    }

    function carregarMenuInicial() {
      messagesBox.innerHTML = "";
      addMessage(
        "Olá! 🎂 Seja bem-vindo(a) à **Sabor & Arte Confeitaria**! Escolha um dos tópicos abaixo ou digite sua dúvida:",
        "bot",
      );

      const optsContainer = document.createElement("div");
      optsContainer.className = "faq-options";

      baseConhecimento.forEach((item) => {
        if (!item.titulo) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-chip";
        btn.innerText = item.titulo;
        btn.addEventListener("click", () => {
          addMessage(item.titulo, "user");
          mostrarIndicadorDigitando();
          setTimeout(() => {
            removerIndicadorDigitando();
            addMessage(item.resposta, "bot");
          }, 350);
        });
        optsContainer.appendChild(btn);
      });

      messagesBox.appendChild(optsContainer);
      scrollToBottom();
    }

    function normalizarTexto(txt) {
      return (txt || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, " ");
    }

    // ALGORITMO DE BUSCA INTELIGENTE COM PONTUAÇÃO
    function buscarResposta(textoUsuario) {
      const queryNorm = normalizarTexto(textoUsuario);
      if (!queryNorm) return null;

      const palavrasUsuario = queryNorm
        .split(/\s+/)
        .filter((w) => w.length >= 2 && !stopWords.has(w));

      let melhorMatch = null;
      let maiorPontuacao = 0;

      baseConhecimento.forEach((item) => {
        let pontos = 0;
        const titulo = normalizarTexto(item.titulo || "");
        const resposta = normalizarTexto(item.resposta || "");

        // Match exato do titulo ou frase
        if (queryNorm.length > 2 && titulo.includes(queryNorm)) {
          pontos += 18;
        }

        // Keywords especificas
        if (item.keywords && Array.isArray(item.keywords)) {
          item.keywords.forEach((kw) => {
            const kwNorm = normalizarTexto(kw);
            if (queryNorm === kwNorm) {
              pontos += 20;
            } else if (
              queryNorm.includes(kwNorm) ||
              kwNorm.includes(queryNorm)
            ) {
              pontos += 10;
            }
          });
        }

        // Palavra por palavra
        palavrasUsuario.forEach((palavra) => {
          if (titulo.includes(palavra)) pontos += 5;
          if (resposta.includes(palavra)) pontos += 2;
        });

        if (pontos > maiorPontuacao) {
          maiorPontuacao = pontos;
          melhorMatch = item;
        }
      });

      if (melhorMatch && maiorPontuacao >= 5) {
        return melhorMatch.resposta;
      }

      return "Não encontrei uma resposta exata para essa dúvida. 😅\n\nMas você pode escolher uma opção do nosso menu inicial ou falar diretamente com a nossa equipe no **WhatsApp: (19) 99999-9999**!";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";
      mostrarIndicadorDigitando();

      setTimeout(() => {
        removerIndicadorDigitando();
        addMessage(buscarResposta(txt), "bot");
      }, 400);
    }

    function abrirChat() {
      chatWindow.classList.remove("faq-hidden");
      iconOpen.style.display = "none";
      iconClose.style.display = "block";
      setTimeout(() => input.focus(), 120);
    }

    function fecharChat() {
      chatWindow.classList.add("faq-hidden");
      iconOpen.style.display = "block";
      iconClose.style.display = "none";
    }

    function alternarChat() {
      if (chatWindow.classList.contains("faq-hidden")) {
        abrirChat();
      } else {
        fecharChat();
      }
    }

    // EVENT LISTENERS
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      alternarChat();
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      fecharChat();
    });

    resetBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      carregarMenuInicial();
    });

    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        dispararEnvio();
      }
    });

    // FECHAR AO CLICAR FORA
    document.addEventListener("click", (e) => {
      if (!chatWindow.classList.contains("faq-hidden")) {
        if (!container.contains(e.target)) {
          fecharChat();
        }
      }
    });

    // FECHAR COM A TECLA ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !chatWindow.classList.contains("faq-hidden")) {
        fecharChat();
      }
    });

    // CARREGAR DADOS JSON
    if (opcoes.jsonUrl) {
      fetch(opcoes.jsonUrl)
        .then((res) => res.json())
        .then((dados) => {
          if (Array.isArray(dados)) {
            baseConhecimento = dados;
            carregarMenuInicial();
          }
        })
        .catch((err) => {
          console.error(
            "Erro ao carregar base de conhecimento do Chatbot:",
            err,
          );
          carregarMenuInicial();
        });
    } else {
      carregarMenuInicial();
    }

    // UPLOAD DE JSON PERSONALIZADO
    jsonFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const json = JSON.parse(evt.target.result);
          if (Array.isArray(json)) {
            baseConhecimento = json;
            addMessage(
              `📂 Base de dados atualizada com ${json.length} tópicos!`,
              "system-info",
            );
            carregarMenuInicial();
          }
        } catch (err) {
          alert("Arquivo JSON inválido.");
        }
      };
      reader.readAsText(file);
    });
  };

  // Autoinicialização ao carregar a página
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.initChatbot({ jsonUrl: "minha-base-dados.json" });
    });
  } else {
    window.initChatbot({ jsonUrl: "minha-base-dados.json" });
  }
})();
