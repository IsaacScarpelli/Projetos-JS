
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    

    <h1>Estoque</h1>
    <div id="pai">

    </div>





    <script>
        // Classes
        class Dispositivo {
            constructor(modelo, categoria, serial) {
                this.modelo = modelo;
                this.categoria = categoria;
                this.disponivel = true;
                this.serial = serial;
            }

            emprestar() {
                if (this.disponivel === true) {
                    this.disponivel = false;
                    return true; // Adicionado para indicar sucesso
                } else {
                    return false; // Alterado para indicar falha
                }
            }

            devolver() {
                console.log("Dispositivo devolvido ao estoque!");
                this.disponivel = true;
            }
        }

        class CentroDeEmprestimos {
            constructor() {
                this.inventario = [];
            }

            adicionarDispositivo(dispositivo) {
                this.inventario.push(dispositivo);
            }

            verificarDispositivo(verificarSerial) {
                for (let i = 0; i < this.inventario.length; i++) {
                    if (this.inventario[i].serial === verificarSerial) {
                        console.log("Serial de Dispositivo Válido");
                        return true;
                    }
                }
                console.log("Serial de Dispositivo não encontrado");
                return false;
            }

            emprestarDispositivo(verificarSerial) {
                for (let i = 0; i < this.inventario.length; i++) {
                    if (this.inventario[i].serial === verificarSerial) {
                        return this.inventario[i].emprestar();
                    }
                }
                return "Não foi possível emprestra esse item!";
            }

            devolverDispositivos(verificarSerial) {
                for (let i = 0; i < this.inventario.length; i++) {
                    if (this.inventario[i].serial === verificarSerial) {
                        this.inventario[i].devolver();
                        return true;
                    }
                }
                return "Não foi possível devolver  esse item!";
            }
        }

        



        let item = new Dispositivo("g45", "Headset", 1);
        let item2 = new Dispositivo("cobra", "mouse", 2);

        let estoque = new CentroDeEmprestimos();
        estoque.adicionarDispositivo(item);
        estoque.adicionarDispositivo(item2);

        console.log(estoque);

        if (estoque.verificarDispositivo(1) === true) {
            estoque.emprestarDispositivo(1);
        }

        console.log(estoque);


        function teste() {  
    let pai = document.querySelector("#pai");

    for (let i = 0; i < estoque.inventario.length; i++) {
        let lista = document.createElement("ul");

        let novoItemModelo = document.createElement("li");
        let novoItemCategoria = document.createElement("li");
        let novoItemSerial = document.createElement("li");
        let novoItemDisponivel = document.createElement("li");

        novoItemModelo.textContent = "Modelo: " + estoque.inventario[i].modelo;
        novoItemCategoria.textContent = "Categoria: " + estoque.inventario[i].categoria;
        novoItemSerial.textContent = "Serial: " + estoque.inventario[i].serial;
        novoItemDisponivel.textContent = "Disponível: " + (estoque.inventario[i].disponivel ? "Sim" : "Não");

        lista.appendChild(novoItemModelo); 
        lista.appendChild(novoItemCategoria);
        lista.appendChild(novoItemSerial);
        lista.appendChild(novoItemDisponivel);

        pai.appendChild(lista); 
    }
}

teste();


    





        
    </script>
</body>
</html>
