<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alvenaria - William Pedreiro</title>
    <link rel="stylesheet" href="../css/estilo.css">
</head>
<body>
    <div class="pagina">
        <h1>🧱 ALVENARIA — R$52,00/M²</h1>

        <div class="regra-importante">
            ⚠️ <strong>REGRA OBRIGATÓRIA!</strong><br>
            SEMPRE converta centímetro para metros!<br>
            Se não converter, o cálculo <strong>NÃO SAI CORRETO</strong>.
        </div>

        <div class="aviso-erro">
            <strong>❌ ERRO COMUM:</strong><br>
            4cm = <span class="correto">0,04</span> — NÃO escreva 0,4!
        </div>

        <div class="tabela-conversao">
            <div class="linha"><span class="medida">1 cm</span><span>➡️ 0,01 m</span></div>
            <div class="linha"><span class="medida">4 cm</span><span>➡️ 0,04 m</span></div>
            <div class="linha"><span class="medida">10 cm</span><span>➡️ 0,10 m</span></div>
            <div class="linha"><span class="medida">1 m</span><span>➡️ 1,00 m</span></div>
        </div>

        <label>📏 Comprimento (metros):</label>
        <input type="text" id="comprimento" placeholder="Ex: 5,00">

        <label>📏 Altura (metros):</label>
        <input type="text" id="altura" placeholder="Ex: 2,80">

        <button class="btn btn-calcular" onclick="calcular()">CALCULAR VALOR</button>
        
        <div class="resultado" id="resultado" style="display:none;">
            <p>Área Total: <span id="area" class="valor-final">0</span> M²</p>
            <p>Valor Total: <span id="valor" class="valor-final">R$ 0,00</span></p>
        </div>

        <button class="btn btn-voltar" onclick="window.history.back()">VOLTAR</button>
    </div>

<script>
const PRECO = 52;

function calcular() {
    const comprimento = parseFloat(document.getElementById('comprimento').value.replace(',', '.'));
    const altura = parseFloat(document.getElementById('altura').value.replace(',', '.'));

    if (!comprimento || !altura || comprimento <= 0 || altura <= 0) {
        alert("⚠️ Digite medidas válidas maiores que zero!");
        return;
    }

    const area = comprimento * altura;
    const valor = area * PRECO;

    document.getElementById('area').textContent = area.toFixed(2).replace('.', ',');
    document.getElementById('valor').textContent = `R$ ${valor.toFixed(2).replace('.', ',')}`;
    document.getElementById('resultado').style.display = 'block';
}
</script>
</body>
</html>
