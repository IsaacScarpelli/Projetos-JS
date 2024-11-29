const readline = require('readline');
const fs = require('fs').promises;

let opcao;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pergunta(texto) {
    return new Promise(resolve => {
        rl.question(texto, (resposta) => {
            resolve(resposta);
        });
    });
}

function validaTelefone(telefone) {
    return /^[0-9]{10,11}$/.test(telefone);
}

async function perguntar() {
    const nome = await pergunta("Qual o seu nome? : ");
    const idade = await pergunta("Qual a sua idade? : ");
    let telefone = await pergunta("Qual é o seu telefone? : ");
    const endereco = await pergunta("Qual é o seu endereço? : ");
    const profissao = await pergunta("Qual é a sua profissão? : ");

    while (!validaTelefone(telefone)) {
        telefone = await pergunta("Telefone inválido. Por favor, insira um telefone válido (10 ou 11 dígitos): ");
    }

    console.log(`Nome: ${nome}, Idade: ${idade}, Telefone: ${telefone}, Endereço: ${endereco}, Profissão: ${profissao}`);

    await criarPasta(nome, profissao, idade, telefone, endereco);
}

async function criarPasta(nome, profissao, idade, telefone, endereco) {
    try {
        await fs.mkdir(`Currículos/${profissao}/${nome}`, { recursive: true });
        await fs.writeFile(
            `Currículos/${profissao}/${nome}/dados cadastrais.txt`,
            `Nome: ${nome}, Idade: ${idade}, Telefone: ${telefone}, Endereço: ${endereco}, Profissão: ${profissao}`
        );
        console.log('Pastas e arquivo de dados criados com sucesso!');
    } catch (err) {
        console.error('Erro ao criar as pastas ou salvar o arquivo:', err);
    }
}

async function iniciar() {
    let continuar = true;

    while (continuar) {
        console.log('');
        console.log('================================================================')
        console.log('Escolha sua opção :')
        console.log('1 - Inserir novo funcionário')
        console.log('2 - Sair')

        opcao = await pergunta('Qual opção você deseja?');

        switch (opcao) {
            case '1':
                await perguntar();
                break;

            case '2':
                console.log('Encerrando sistema');
                continuar = false;
                break;

            default:
                console.log('Opção não reconhecida');
                break;
        }
    }

    rl.close();
}

iniciar();
