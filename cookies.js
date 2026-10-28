document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     SISTEMA DE CONSENTIMENTO DE COOKIES ROBUSTO
     ========================================================= */
  const bannerCookies = document.getElementById("banner-cookies");
  const btnAceitar = document.getElementById("btn-aceitar-cookies");
  const btnRecusar = document.getElementById("btn-recusar-cookies");
  const CHAVE_COOKIES = "saborArte_consentimento_cookies";

  function ocultarBanner() {
    if (!bannerCookies) return;
    bannerCookies.style.opacity = "0";
    bannerCookies.style.transform = "translateY(20px)";
    bannerCookies.style.transition = "opacity 0.4s ease, transform 0.4s ease";

    setTimeout(() => {
      bannerCookies.classList.add("oculto");
      bannerCookies.style.display = "none";
    }, 400);
  }

  function mostrarBanner() {
    if (!bannerCookies) return;
    bannerCookies.classList.remove("oculto");
    bannerCookies.style.display = "flex";
    bannerCookies.style.opacity = "1";
    bannerCookies.style.transform = "translateY(0)";
  }

  function salvarEscolhaCookie(resposta) {
    try {
      localStorage.setItem(CHAVE_COOKIES, resposta);
    } catch (e) {}

    try {
      sessionStorage.setItem(CHAVE_COOKIES, resposta);
    } catch (e) {}

    try {
      const dataExpira = new Date();
      dataExpira.setTime(dataExpira.getTime() + 365 * 24 * 60 * 60 * 1000);
      document.cookie = `${CHAVE_COOKIES}=${resposta}; expires=${dataExpira.toUTCString()}; path=/; SameSite=Lax`;
    } catch (e) {}

    ocultarBanner();
  }

  function verificarConsentimento() {
    let jaRespondeu = false;

    try {
      if (localStorage.getItem(CHAVE_COOKIES) !== null) jaRespondeu = true;
    } catch (e) {}

    try {
      if (sessionStorage.getItem(CHAVE_COOKIES) !== null) jaRespondeu = true;
    } catch (e) {}

    try {
      if (document.cookie.indexOf(`${CHAVE_COOKIES}=`) !== -1)
        jaRespondeu = true;
    } catch (e) {}

    if (jaRespondeu) {
      ocultarBanner();
    } else {
      mostrarBanner();
    }
  }

  if (btnAceitar)
    btnAceitar.addEventListener("click", () => salvarEscolhaCookie("aceito"));
  if (btnRecusar)
    btnRecusar.addEventListener("click", () => salvarEscolhaCookie("recusado"));

  verificarConsentimento();
});
