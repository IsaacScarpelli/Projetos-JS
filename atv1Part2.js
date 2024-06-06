<!DOCTYPE html>
<html>
<head>
    <title>Par ou Ímpar</title>
</head>
<body>
    <h1>Par ou Ímpar</h1>
    <p>Escolha uma entre par ou impar:</p>
    <input type="text" id="opcao">
    <p>Insira um número de 0 a 10</p>
    <input type="text" id="jogada">
    <button id="verificarBotao">Verificar</button>
    <hr size="1" color="black">
    <h2>Resultado da partida</h2>
    <p id="demo1"></p>
    <p id="demo"></p>


    <script type="text/javascript">
        document.getElementById("verificarBotao").addEventListener("click", function() {
            // Obtém o valor do input

            let opcao = document.getElementById("opcao").value;

            let jogada = document.getElementById("jogada").value;
            
            // Converte o valor para número inteiro
            jogada = parseInt(jogada);

            // Jogada da máquina randomizada
            
            let maquina = Math.floor(Math.random() * (9 - 0 + 1));

            // Verificação do resultado da partida
            let resultado ;
            let soma = maquina + jogada;
            if ((soma % 2) == 0)
            {resultado = "par"}
            else if((soma % 2) != 0)
            {resultado = "impar"}
            
            document.getElementById("demo1").innerHTML = "O resultado da jogada foi " + soma ;
            console.log(resultado);
            console.log(opcao);
            
            if(opcao === "par" && resultado === "par"){
                document.getElementById("demo").innerHTML = "Parabéns você venceu!"

            }
            else if(opcao === "impar" && resultado === "impar"){
                document.getElementById("demo").innerHTML = "Parabéns você venceu!"

            }
            else
            {document.getElementById("demo").innerHTML = "A máquina venceu"}
            
            
            
            
        });
    </script>
</body>
</html>
