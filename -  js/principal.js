const SEU_NUMERO = "5531990721928";
let jaPagou = false;

function mostrarPagina(id) {
    document.querySelectorAll('.pagina').forEach(p => p.classList.add('oculta'));
    document.getElementById(id).classList.remove('oculta');
    window.scrollTo(0, 0);
}

function comecar() { mostrarPagina('pg-servicos'); }
function voltarParaPrincipal() { mostrarPagina('pg-principal'); }
function voltarParaServicos() { mostrarPagina('pg-servicos'); }

function irPara(url) {
    if (jaPagou) {
        window.location.href = url;
    } else {
        mostrarPagina('pg-senha');
    }
}

function copiarPix() {
    navigator.clipboard.writeText("williamempreiteiro007@gmail.com");
    alert("✅ Chave copiada!");
}

function avisarPagamento() {
    const num = document.getElementById('whats_cliente').value.replace(/\D/g, '');
    if (num.length < 10) { alert("Digite o WhatsApp certo!"); return; }
    window.open(`https://wa.me/${SEU_NUMERO}?text=Olá, paguei! Preciso da senha.`,'_blank');
}

function validarSenha() {
    const s = document.getElementById('campo-senha').value.toUpperCase();
    if (s.length !== 5) { alert("Senha inválida!"); return; }
    jaPagou = true;
    alert("✅ Acesso liberado!");
    mostrarPagina('pg-servicos');
}
