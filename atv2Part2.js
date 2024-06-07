<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversão de Palavars</title>
</head>
<body>
    <h1>Conversão de Palavars</h1>
    <p>Insira uma palavra que você deseja converter para maiúsculo:</p>
    <input type="text" id="palavra">
    <button id="converterBotao">Converter a palavra</button>
    <div id="resultado"></div>


    <script type="text/javascript">
        //Ativaçao da função ao apetar o botão
        document.getElementById("converterBotao").addEventListener("click", function() {

            //Obtém a palavra digitada pelo usuário
            let palavra = document.getElementById("palavra").value

            let resultadoDiv = document.getElementById("resultado")

            for(let i = 0; i < palavra.length; i++){
                resultadoDiv.innerHTML += palavra[i].toUpperCase() + "<br>"
            }
        });
    </script>
    
</body>
</html>
