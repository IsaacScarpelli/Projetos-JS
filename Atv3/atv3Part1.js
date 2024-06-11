<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Insira seu nome</h2>
<input type="text" id="entradaNome">
<button id="demo">Aperte Aqui</button>

    <script type="text/javascript">
        document.getElementById("demo").addEventListener("click", function(){
            let nome = document.getElementById("entradaNome").value;
            alert("Bem Vindo "+ nome);
        })
    </script>
    
</body>
</html>
