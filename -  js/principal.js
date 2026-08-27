// ==============================================
// WILLIAM PEDREIRO - SISTEMA DE ORÇAMENTOS
// Versão melhorada e profissional
// ==============================================

// ================= CONFIGURAÇÕES =================
const SEU_NUMERO_WHATSAPP = "5531990721928"; // com código do país + DDD
const CHAVE_PIX = "williamempreiteiro007@gmail.com";
const SENHA_LIBERACAO = "12345"; // ← ALTERE A SENHA AQUI!
// =================================================

let jaPagouELiberado = false;
let tentativasSenha = 0;
const MAX_TENTATIVAS = 3;

// ========== NAVEGAÇÃO ENTRE TELAS ==========
function mostrarPagina(idPagina) {
    // Esconde TODAS as páginas
    document.querySelectorAll('.pagina').forEach(pagina => {
        pagina.classList.add('oculta');
    });
    // Mostra a página solicitada
    const pagina = document.getElementById(idPagina);
    if (pagina) {
        pagina.classList.remove('oculta');
        // Volta para o topo suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ========== FUNÇÕES DE BOTÃO ==========
function comecar() {
    mostrarPagina('pg-servicos');
}

function voltarParaPrincipal() {
    mostrarPagina('pg-principal');
    tentativasSenha = 0; // Reseta tentativas ao voltar
}

function voltarParaServicos() {
    mostrarPagina('pg-servicos');
}

// ========== IR PARA PÁGINA DE SERVIÇO ==========
function irPara(urlDestino) {
    if (jaPagouELiberado) {
        // Já liberado → vai direto
        window.location.href = urlDestino;
    } else {
        // Ainda não liberou → pede pagamento/senha
        mostrarPagina('pg-senha');
    }
}

// ========== COPIAR CHAVE PIX ==========
function copiarPix() {
    navigator.clipboard.writeText(CHAVE_PIX)
        .then(() => {
            alert("✅ Chave PIX copiada com sucesso!\n" + CHAVE_PIX);
        })
        .catch(() => {
            // Fallback se o navegador bloquear
            alert("⚠️ Não foi possível copiar automaticamente.\nChave: " + CHAVE_PIX);
        });
}

// ========== AVISAR PAGAMENTO ==========
function avisarPagamento() {
    const campoWhats = document.getElementById('whats_cliente');
    let numeroWhats = campoWhats.value.replace(/\D/g, ''); // Remove tudo que não é número

    // Validação do número
    if (numeroWhats.length < 10) {
        alert("⚠️ Digite um WhatsApp válido!\nEx: 31999998888");
        campoWhats.focus();
        return;
    }

    // Garante que tem o código do país
    if (numeroWhats.length === 10 || numeroWhats.length === 11) {
        numeroWhats = "55" + numeroWhats;
    }

    // Abre WhatsApp com mensagem pronta
    const mensagem = encodeURIComponent("Olá William! Paguei o PIX. Preciso da senha de liberação, por favor! 🙏");
    window.open(`https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${mensagem}`, '_blank');
    
    alert("✅ WhatsApp aberto!\nAguarde a senha e digite abaixo.");
}

// ========== VALIDAR SENHA ==========
function validarSenha() {
    const campoSenha = document.getElementById('campo-senha');
    const senhaDigitada = campoSenha.value.trim();

    // Conta tentativas
    tentativasSenha++;

    // Validações
    if (senhaDigitada.length < 4) {
        alert("⚠️ Digite a senha completa!");
        campoSenha.focus();
        return;
    }

    // Verifica se acertou
    if (senhaDigitada === SENHA_LIBERACAO) {
        jaPagouELiberado = true;
        tentativasSenha = 0;
        alert("✅ Acesso LIBERADO!\nAgora você pode usar todos os orçamentos! 🎉");
        mostrarPagina('pg-servicos');
        // Salva liberação mesmo se recarregar a página
        localStorage.setItem('liberado', 'sim');
    } else {
        alert(`❌ Senha incorreta!\nTentativa ${tentativasSenha} de ${MAX_TENTATIVAS}`);
        campoSenha.value = "";
        campoSenha.focus();

        // Bloqueia depois de muitas tentativas
        if (tentativasSenha >= MAX_TENTATIVAS) {
            alert("🔒 Muitas tentativas erradas!\nVolte e tente novamente mais tarde.");
            voltarParaPrincipal();
        }
    }
}

// ========== VERIFICAR LIBERAÇÃO AO CARREGAR ==========
window.addEventListener('load', () => {
    if (localStorage.getItem('liberado') === 'sim') {
        jaPagouELiberado = true;
    }
});

// ========== RESETAR LIBERAÇÃO (se precisar) ==========
// function resetarAcesso() {
//     jaPagouELiberado = false;
//     localStorage.removeItem('liberado');
//     alert("🔒 Acesso bloqueado novamente.");
// }
