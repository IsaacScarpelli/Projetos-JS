<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        body {
            text-align: center;
        }

        #titulo {
            margin-top: 100px;
        }

        #Dados {
            display: flex;
            justify-content: space-around; 
            flex-wrap: wrap;
        }

        .tituloDado {
            flex: 1; 
            padding: 10px;
        }

        p{
            font-size: 60px;
            color: purple;
        }
    </style>
</head>
<body>
    <h1 id="titulo">Você tem dado em Casa?</h1>
    <div id="gifDados"><a href="https://www.imagensanimadas.com/cat-dados-710.htm"><img src="https://www.imagensanimadas.com/data/media/710/dado-imagem-animada-0084.gif" border="0" alt="dado-imagem-animada-0084" /></a></div>
    <h2>Aperte para girar os dados </h2>
    <button id="demo">Aperte Aqui</button>
    <div id="Dados">
        <div id="d6" class="tituloDado">
            <h1>D6</h1>
            <p id="numeroSorteadoD6"></p>
        </div>
        
        <div id="d8" class="tituloDado">
            <h1>D8</h1>
            <p id="numeroSorteadoD8"></p>
        </div>

        <div id="d20" class="tituloDado">
            <h1>D20</h1>
            <p id="numeroSorteadoD20"></p>
        </div>
    </div>

    <script type="text/javascript">
        document.getElementById("demo").addEventListener("click", function(){
            let d6 = Math.floor(Math.random() * 6) + 1;
            let d8 = Math.floor(Math.random() * 8) + 1;
            let d20 = Math.floor(Math.random() * 20) + 1;

            document.getElementById("numeroSorteadoD6").innerHTML = d6;
            document.getElementById("numeroSorteadoD8").innerHTML = d8;
            document.getElementById("numeroSorteadoD20").innerHTML = d20;
        })
    </script>
    
</body>
</html>
