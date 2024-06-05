<!DOCTYPE html>
<html>
<head>
    <title>Notas dos alunos</title>
</head>
<body>
    <h1>Verificador de Notas</h1>
    <p>Insira a nota do aluno/a:</p>
    <input type="text" id="nota">
    <button id="verificarBotao">Verificar</button>
    <hr size="1" color="black">
    <h2>Situação do aluno</h2>
    <p id="demo"></p>


    <script type="text/javascript">
        document.getElementById("verificarBotao").addEventListener("click", function() {
            // Obtém o valor do input
            let nota = document.getElementById("nota").value;
            
            // Converte o valor para número inteiro
            nota = parseInt(nota);

            // Verifica se o aluno está aprovado ou não
            if (nota >=7 && nota <= 9){
                document.getElementById("demo").innerHTML = "Aluno aprovado";
            }
            else if(nota < 7){   
                document.getElementById("demo").innerHTML = "Aluno reprovado";
            }
            else if(nota == 10){
                document.getElementById("demo").innerHTML = "Parabéns ao aluno ele foi aprovado com nota máxima";
            }
            
            
        });
    </script>
</body>
</html>
