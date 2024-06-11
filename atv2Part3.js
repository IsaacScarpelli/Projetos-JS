
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
            margin-bottom: 40px;
            font-size: 70px;
        }
        
        #reiniciar{
            margin: 20px;
        }

        #imagem{
            z-index: auto;
        }
        
    </style>

</head>

<body>

    <h1 id="title">Jogo da Forca</h1>
    <div id="ImagemDiv">
        <img alt="" src="" id="imagem"  />
    </div>
    <div id="exibirPalavra"></div>
    <input type="text" id="inputA">
    <button id="entradaLetra">Tentar Letra</button><br>
    <button id="reiniciar">Nova Rodada</button>
    <h3>Letras Erradas</h3>
    <h2 id="letrasErradas"></h2>
    
    <script type="text/javascript">

        const palavras = ["caixa", "carro", "escada", "lamparina","monitor"];

        let letraErrada;
        let palavraRodada;
        let exibirPalavra;
        let qtdErros = 0;

        function IniciarPartida(){

            document.getElementById("letrasErradas").innerHTML = "";


            palavraRodada = palavras[Math.floor(Math.random()* (palavras.length))];
            console.log(palavraRodada);

            exibirPalavra = Array(palavraRodada.length).fill("_");
            console.log(exibirPalavra);

            document.getElementById("imagem").src= 'Imagens Forca/forca1.jpeg'

            Atualizar();
        }

        function Atualizar(){
            document.getElementById("exibirPalavra").innerText = exibirPalavra.join(' ');
        }

        function VerificarVitoria(){
            return !exibirPalavra.includes("_");
        }

        function MostrarMensagemVitoria(){
            alert("Parabéns! Você ganhou!");
        }
 

        document.getElementById("entradaLetra").addEventListener("click", function(){
            const entradaLetra = document.getElementById("inputA");
            const letra = entradaLetra.value.toLowerCase();

            if(palavraRodada.includes(letra)){
                for(let i = 0;  i < palavraRodada.length; i++){
                    if(palavraRodada[i] == letra){
                        exibirPalavra[i] = letra;
                    }
                }           
                Atualizar();
                if(VerificarVitoria()){
                    MostrarMensagemVitoria();
                }
            }
            else{
                document.getElementById("letrasErradas").innerHTML += letra + " ,"
                qtdErros = qtdErros + 1;
            }

            if(qtdErros == 1){
                document.getElementById("imagem").src= 'Imagens Forca/forca2.jpeg'
            }
            else if(qtdErros == 2){
                document.getElementById("imagem").src= 'Imagens Forca/forca3.jpeg'
            }
            else if(qtdErros == 3){
                document.getElementById("imagem").src= 'Imagens Forca/forca4.jpeg'
            }
            else if(qtdErros == 4){
                document.getElementById("imagem").src= 'Imagens Forca/forca5.jpeg'
            }
            else if(qtdErros == 5){
                document.getElementById("imagem").src= 'Imagens Forca/forca6.jpeg'
            }
            else if(qtdErros == 6){
                document.getElementById("imagem").src= 'Imagens Forca/forca7.jpeg'
                alert("você Perdeu!")
            }
            
        }); 


        document.getElementById("reiniciar").addEventListener("click", function(){
            IniciarPartida();
        })

        window.onload = IniciarPartida;
    </script>
</body>
</html>
