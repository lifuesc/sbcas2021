// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2;

// Estrutura de registro
struct Registro{
    int16 value;  // Temperatura da vacina
    uint64 time;  // Hora do registro
    string local; // Local do registro
}

contract Vacina{
    address public  owner;          // Proprietario do contrato
    string public nome;            // Nome/tipo da vacina
    string public origem;          // Local de origem da vacina
    string public destino;         // Destina da vacina
    string public duracao;         // Duração prevista
    bool public condicao = true;   // Condição da vacina, se está boa ou não
    int public tempMax;            // Temperatura maxima da vacina
    int public tempMin;            // Temperatura minima da vacina
    Registro[] public registros;   // Historico de registros
    Registro public perdaVacina;   // Registro para perda da vacina
    
      constructor(
        string memory _nome,
        string memory _origem,
        string memory _destino,
        string memory _duracao,
        int16  _tempMax,
        int16  _tempMin
    ) {
        owner = msg.sender;
        nome = _nome;
        origem = _origem;
        destino = _destino;
        duracao = _duracao;
        tempMax = _tempMax;
        tempMin = _tempMin;
    }
    
    // Cadastra uma etapa da viagem
    function insertRegistro(int16 _value, uint64 _time, string memory _local) public {
        // Verifica se a temperatura esta entre a maxima e a mininma entre
        // se nao teve perda antes dessa inserção então execute o if
        if((_value > tempMax || _value < tempMin) && perdaVacina.value == 0){
            perdaVacina = Registro(_value, _time, _local);
            condicao = false;
        }
        registros.push(Registro(_value, _time, _local));
     }
     
    // Retorna etapas da viagem
    function getRegistro() public view returns(Registro[] memory _registro) {
        return registros;
     }
     
    // Destroi contrato
    function close() public verificaOwner {
        address payable addr = payable(msg.sender);
        selfdestruct(addr); 
     }
     
    modifier verificaOwner(){
        require(msg.sender == owner);
        _;
    }
}