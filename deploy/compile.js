const path = require("path");
const fs = require("fs");
const solc = require("solc");

// ! Alterar aqui
// ! ---------------------------------------------------
// Nome da classe do contrato
const contractName = "Vacina";
// Nome do arquivo do contrato baseado no nome da classe
const contractFileName = `Vacina.sol`;
// ! ---------------------------------------------------

// Pega o diretório do arquivo do contrato
const ContractPath = path.resolve(__dirname, "contracts", contractFileName);
// Conteudo do contrato convertido
const sourceContract = fs.readFileSync(ContractPath, "utf8");

// Configuração do SOLC
const input = {
  language: "Solidity",
  sources: {
    [contractFileName]: {
      content: sourceContract,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

let contratoCompilado = JSON.parse(solc.compile(JSON.stringify(input)));

// * Descomentar para imprimir ABI
console.log(
  JSON.stringify(
    contratoCompilado.contracts[contractFileName][contractName].abi,
    null,
    4
  )
);

// Exporta dados do contrato
module.exports = contratoCompilado.contracts[contractFileName][contractName];
