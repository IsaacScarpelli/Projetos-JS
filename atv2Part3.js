<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
       
        body{
            text-align: center;
        }

        #exibirPalavra{
            margin: 40px;
            font-size: 70px;
        }
        
        #reiniciar{
            margin: 20px;
        }
        
    </style>

</head>

<body>

    <h1 id="title">Jogo da Forca</h1>
    <div id="exibirPalavra"></div>
    <input type="text" id="inputA">
    <button id="entradaLetra">Tentar Letra</button><br>
    <button id="reiniciar">Nova Rodada</button>
    
    <script type="text/javascript">

        const palavras = ["caixa", "carro", "escada", "lamparina","monitor"];

        let letraErrada;
        let palavraRodada
        let exibirPalavra

        function IniciarPartida(){
            palavraRodada = palavras[Math.floor(Math.random()* palavras.length)]
            console.log(palavraRodada);

            exibirPalavra = Array(palavras.length).fill("_");
            console.log(exibirPalavra);

            atualizar();
        }

        
        function atualizar(){
            document.getElementById("exibirPalavra").innerText = (exibirPalavra).join(' ');
        }

        function chutePalavra(){
            const entradaLetra = document.getElementById("inputA")
            const letra = entradaLetra.value.ToLowerCase;


            if(palavraRodada.includes(letra)){
                for(let i = 0;  i< palavraRodada; i++){
                    if(palavraRodada[i] === letra){
                        exibirPalavra[i] = letra;
                    }
                }
            }
        }

        document.getElementById("entradaLetra").addEventListener("click", function(){
            chutePalavra();
        } )


        window.load = IniciarPartida();
    </script>
</body>
</html>
