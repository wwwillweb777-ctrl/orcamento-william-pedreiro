// ==============================================
// WILLIAM PEDREIRO - SISTEMA DE ORÇAMENTOS
// VERSÃO FINAL E GARANTIDA
// ==============================================

const SEU_NUMERO_WHATSAPP = "5531990721928";
const CHAVE_PIX = "williamempreiteiro007@gmail.com";
const SENHA_LIBERACAO = "12345"; // ← ALTERE A SENHA AQUI!

let jaPagouELiberado = false;

// ========== TROCA DE TELA ==========
function mostrarPagina(idPagina) {
    // Esconde todas
    document.getElementById('pg-principal').classList.add('oculta');
    document.getElementById('pg-servicos').classList.add('oculta');
    document.getElementById('pg-senha').classList.add('oculta');
    // Mostra a certa
    document.getElementById(idPagina).classList.remove('oculta');
    window.scrollTo(0, 0);
}

// ========== BOTÕES ==========
function comecar() { mostrarPagina('pg-servicos'); }
function voltarParaPrincipal() { mostrarPagina('pg-principal'); }
function voltarParaServicos() { mostrarPagina('pg-servicos'); }

function irPara(url) {
    if (jaPagouELiberado) {
        window.location.href = url;
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
    const num = document.getElementById('whats_cliente').value.replace(/\D/g, '');
    if (num.length < 10) { alert("⚠️ Digite um WhatsApp válido!"); return; }
    const numero = num.length === 11 ? "55" + num : num;
    const msg = encodeURIComponent("Olá William! Paguei o PIX. Preciso da senha! 🙏");
    window.open(`https://wa.me/${numero}?text=${msg}`, '_blank');
    alert("✅ WhatsApp aberto! Aguarde a senha.");
}

function validarSenha() {
    const s = document.getElementById('campo-senha').value.trim();
    if (s === SENHA_LIBERACAO) {
        jaPagouELiberado = true;
        alert("✅ Acesso LIBERADO! 🎉");
        mostrarPagina('pg-servicos');
    } else {
        alert("❌ Senha incorreta!");
        document.getElementById('campo-senha').value = "";
    }
}
