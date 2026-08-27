// ==============================================
// WILLIAM PEDREIRO - SISTEMA DE ORÇAMENTOS
// Versão corrigida e funcionando 100%
// ==============================================

const SEU_NUMERO_WHATSAPP = "5531990721928";
const CHAVE_PIX = "williamempreiteiro007@gmail.com";
const SENHA_LIBERACAO = "12345"; // ← ALTERE AQUI!

let jaPagouELiberado = false;

// ========== FUNÇÃO PRINCIPAL DE TROCA DE TELA ==========
function mostrarPagina(idPagina) {
    console.log("👉 Indo para:", idPagina); // ← mostra no console (F12)

    // Esconde TODAS as páginas
    const todasPaginas = document.querySelectorAll('.pagina');
    todasPaginas.forEach(pagina => {
        pagina.classList.add('oculta');
    });

    // Mostra a página solicitada
    const paginaAlvo = document.getElementById(idPagina);
    if (paginaAlvo) {
        paginaAlvo.classList.remove('oculta');
        window.scrollTo(0, 0);
    } else {
        console.error("❌ Página não encontrada:", idPagina);
        alert("Erro: página " + idPagina + " não encontrada!");
    }
}

// ========== BOTÃO ENTRAR ==========
function comecar() {
    mostrarPagina('pg-servicos');
}

function voltarParaPrincipal() {
    mostrarPagina('pg-principal');
}

function voltarParaServicos() {
    mostrarPagina('pg-servicos');
}

function irPara(urlDestino) {
    if (jaPagouELiberado) {
        window.location.href = urlDestino;
    } else {
        mostrarPagina('pg-senha');
    }
}

function copiarPix() {
    navigator.clipboard.writeText(CHAVE_PIX)
        .then(() => alert("✅ Chave PIX copiada!\n" + CHAVE_PIX))
        .catch(() => alert("Chave: " + CHAVE_PIX));
}

function avisarPagamento() {
    const campoWhats = document.getElementById('whats_cliente');
    let numeroWhats = campoWhats.value.replace(/\D/g, '');

    if (numeroWhats.length < 10) {
        alert("⚠️ Digite um WhatsApp válido!\nEx: 31999998888");
        campoWhats.focus();
        return;
    }

    if (numeroWhats.length === 10 || numeroWhats.length === 11) {
        numeroWhats = "55" + numeroWhats;
    }

    const mensagem = encodeURIComponent("Olá William! Paguei o PIX. Preciso da senha de liberação! 🙏");
    window.open(`https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${mensagem}`, '_blank');
    alert("✅ WhatsApp aberto! Aguarde a senha.");
}

function validarSenha() {
    const campoSenha = document.getElementById('campo-senha');
    const senhaDigitada = campoSenha.value.trim();

    if (senhaDigitada === SENHA_LIBERACAO) {
        jaPagouELiberado = true;
        alert("✅ Acesso LIBERADO! 🎉");
        mostrarPagina('pg-servicos');
    } else {
        alert("❌ Senha incorreta!");
        campoSenha.value = "";
        campoSenha.focus();
    }
}
