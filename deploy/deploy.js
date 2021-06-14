require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

// Configuração do provider do infura
const provider = new HDWalletProvider({
  mnemonic: { phrase: process.env.MNEMONIC },
  providerOrUrl: process.env.RINKEBY_INFURA,
});

const web3 = new Web3(provider);

const deploy = async () => {
  // Pega as contas do navegador
  const accounts = await web3.eth.getAccounts();
  // Pega a primeira conta que será utilizada no deploy
  const deploymentAccount = accounts[0];
  // Gera a chave primária a partir da carteira
  const privateKey =
    provider.wallets[accounts[0].toLowerCase()].privateKey.toString("hex");
  // Mostra carteira utilizada para deploy
  console.log("Conta usada para o deploy ", accounts[0]);

  try {
    // Prepara uma instancia do contrato para assinatura
    let contract = await new web3.eth.Contract(abi)
      .deploy({
        data: evm.bytecode.object,
        // Nome/tipo da vacina, Origem, Destino, Duração, temperatura máxima, temperatura minima
        arguments: ["Vacina Covid Pzifer", "China", "Brasil", "12h", 40, 30],
      })
      .encodeABI();
    // Configura um objeto para transação
    let transactionObject = {
      gas: 9000000,
      data: contract,
      from: deploymentAccount,
    };
    // Assina o objeto de transação com a chave primária da carteira
    let signedTransactionObject = await web3.eth.accounts.signTransaction(
      transactionObject,
      "0x" + privateKey
    );
    // Envia transação assinada para a rede
    let result = await web3.eth.sendSignedTransaction(
      signedTransactionObject.rawTransaction
    );
    // Mostra endereço do contrato
    console.log("Contract deployed to", result.contractAddress);
  } catch (error) {
    // Mostra caso ocorra algum erro
    console.log("error", error);
  }
  // Para de rodar o provider
  provider.engine.stop();
};

deploy();
