// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0x2CBe1f0CC77544F7D6B6E08fEA36fea73Ca585d0";

// Abi gerada no deploy do contrato
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_nome",
        type: "string",
      },
      {
        internalType: "string",
        name: "_origem",
        type: "string",
      },
      {
        internalType: "string",
        name: "_destino",
        type: "string",
      },
      {
        internalType: "string",
        name: "_duracao",
        type: "string",
      },
      {
        internalType: "int16",
        name: "_tempMax",
        type: "int16",
      },
      {
        internalType: "int16",
        name: "_tempMin",
        type: "int16",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "close",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "condicao",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "destino",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "duracao",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRegistro",
    outputs: [
      {
        components: [
          {
            internalType: "int16",
            name: "value",
            type: "int16",
          },
          {
            internalType: "uint64",
            name: "time",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "local",
            type: "string",
          },
        ],
        internalType: "struct Registro[]",
        name: "_registro",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int16",
        name: "_value",
        type: "int16",
      },
      {
        internalType: "uint64",
        name: "_time",
        type: "uint64",
      },
      {
        internalType: "string",
        name: "_local",
        type: "string",
      },
    ],
    name: "insertRegistro",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nome",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "origem",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "perdaVacina",
    outputs: [
      {
        internalType: "int16",
        name: "value",
        type: "int16",
      },
      {
        internalType: "uint64",
        name: "time",
        type: "uint64",
      },
      {
        internalType: "string",
        name: "local",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "registros",
    outputs: [
      {
        internalType: "int16",
        name: "value",
        type: "int16",
      },
      {
        internalType: "uint64",
        name: "time",
        type: "uint64",
      },
      {
        internalType: "string",
        name: "local",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tempMax",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tempMin",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);
