import React, { useEffect, useState } from "react";

// Informação do contrato
import vacina from "./contracts/vacina.contract";
// Configuração para requisições na rede
import web3 from "./contracts/web3";
// Estilização
import "./style.css";
import axios from "axios";

// Verifica se o numero é menor que 10 e poe um 0 na frente
const checkZero = (val) => {
  return val < 10 ? "0" + val : val;
};
// Função que transforma time em dd/mm/yyyy hh:mm:ss
const converteHorario = (time) => {
  var date = new Date(time);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var ddmmmyyyy =
    checkZero(date.getDate()) +
    "/" +
    checkZero(date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  var formattedTime =
    ddmmmyyyy +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return formattedTime;
};
function Home() {
  // Origem da vacina
  const [origem, setOrigem] = useState("");
  // Nome/tipo da vacina
  const [nome, setNome] = useState("");
  // Destino da vacina
  const [destino, setDestino] = useState("");
  // Duração do transporte
  const [duracao, setDuracao] = useState("");
  // Temperatura máxima da vacina
  const [tempMax, setTempMax] = useState("");
  // Temperatura mínima da vacina
  const [tempMin, setTempMin] = useState("");
  // Condição vacina
  const [condicao, setCondicao] = useState(true);
  // Histórico de registro
  const [register, setRegister] = useState([]);
  // Registro de perda
  const [lostRegister, setLostRegister] = useState([]);
  // Mensagem de carregando
  const [loading, setLoading] = useState(false);
  // Informação da transação
  const [transaction, setTransaction] = useState();
  // Dados da API
  const [apiData, setApiData] = useState([]);
  // Dados da API selecionado
  const [selectedApiData, setSelectedApiData] = useState("");
  // Pega dados da API
  const getDataAPI = async () => {
    try {
      // Faz requisição GET para rota da API
      const response = await axios.get("http://localhost:3333/get-data");
      // Insere dados retornados no apiData
      setApiData(response.data.data);
    } catch (error) {
      // Mostra erro
      console.log(error);
    }
  };

  const pegaRegistroPerda = async () => {
    try {
      // Pega informações do contrato
      const _perdaVacina = await vacina.methods.perdaVacina().call();

      // Altera o valor da Condição vacina
      setLostRegister(_perdaVacina);
    } catch (error) {
      console.log(error);
    }
  };
  // Pega informações do contrato
  const pegaInfoContrato = async () => {
    try {
      // Pega informações do contrato
      const _nome = await vacina.methods.nome().call();
      const _origem = await vacina.methods.origem().call();
      const _destino = await vacina.methods.destino().call();
      const _duracao = await vacina.methods.duracao().call();
      const _tempMax = await vacina.methods.tempMax().call();
      const _tempMin = await vacina.methods.tempMin().call();
      const _condicao = await vacina.methods.condicao().call();
      // Altera o valor do Nome/tipo da vacina
      setNome(_nome);
      // Altera o valor da Origem da vacina
      setOrigem(_origem);
      // Altera o valor da Destino da vacina
      setDestino(_destino);
      // Altera o valor da Duração do transporte
      setDuracao(_duracao);
      // Altera o valor da Temperatura máxima da vacina
      setTempMax(_tempMax);
      // Altera o valor da Temperatura mínima da vacina
      setTempMin(_tempMin);
      // Altera o valor da Condição vacina
      setCondicao(_condicao);
    } catch (error) {
      console.log(error);
    }
  };

  // Lista registro do contrato
  const listRegister = async () => {
    try {
      // Chama o método do contrato que retorna registros
      const registro = await vacina.methods.getRegistro().call();

      // Insere na variável que é renderizado no gráfico
      setRegister(registro);
    } catch (error) {
      // Mostra erro
      console.log(error);
    }
  };
  // Insere registro que está cadastrado no servidor
  const insertRegister = async (e) => {
    e.preventDefault();
    try {
      // Ativa mensagem de carregamento
      setLoading(true);
      // Pega as contas do metamask
      const contas = await web3.eth.getAccounts();
      // Não existir valor no apiData não será possivel rodar essa função
      if (apiData.length === 0) throw Error("Dados do servidor não encontrado");

      const idxSelected = parseInt(selectedApiData) - 1;
      // Pega value, time e local do array apiData
      const _value = apiData[idxSelected].value;
      const _time = apiData[idxSelected].time;
      const _local = apiData[idxSelected].local;
      // Insere dados de registro
      const responseTrx = await vacina.methods
        .insertRegistro(_value, _time, _local)
        .send({
          // Diz a carteira que está enviando os dados
          from: contas[0],
        });
      // Mostra os dados da transação
      setTransaction(responseTrx);
      // Recarrega dados
      listRegister();
      pegaInfoContrato();
      pegaRegistroPerda();
      // Retira mensagem de carregando
      setLoading(false);
    } catch (error) {
      // Retira mensagem de carregando
      setLoading(false);
      // Mostra erro
      console.log(error);
    }
  };

  // Antes da página ser carregada chama as funções dentro do useEffect
  useEffect(() => {
    getDataAPI();
    pegaInfoContrato();
    listRegister();
    pegaRegistroPerda();
  }, []);

  return (
    <div>
      <h1>Sistema de Rastreamento de Vacinas</h1>
      <div className="divider" />
      <h2>{nome}</h2>
      <h2>
        Contrato:{" "}
        <a
          href={
            "https://rinkeby.etherscan.io/address/" + vacina.options.address
          }
          target="_blank"
          rel="noreferrer"
        >
          {vacina.options.address}
        </a>
      </h2>
      <div id="form">
        <div className="form-div">
          <label>Origem</label>
          <input type="text" disabled value={origem} />

          <label>Estimativa de tempo</label>
          <input type="text" disabled value={duracao} />
        </div>
        <div className="form-div">
          <label>Destino</label>
          <input type="text" disabled value={destino} />

          <label>Condição da vacina</label>
          <input
            type="text"
            disabled
            className={condicao ? "success" : "error"}
            value={condicao ? "Adequada" : "Imprópria"}
          />
        </div>
        <div className="form-div">
          <label>Temperatura máxima</label>
          <input type="text" disabled value={tempMax} />
        </div>
        <div className="form-div">
          <label>Temperatura mínima</label>
          <input type="text" disabled value={tempMin} />
        </div>
      </div>
      <br />
      <br />
      <h2>Violação de Temperatura</h2>
      {lostRegister && lostRegister.local ? (
        <div className="center">
          <div className="form-div3">
            <label>Temperatura</label>
            <input type="text" disabled value={lostRegister.value} />
            <label>Local</label>
            <input type="text" disabled value={lostRegister.local} />
            <label>Data</label>
            <input
              type="text"
              disabled
              value={converteHorario(parseInt(lostRegister.time))}
            />
          </div>
        </div>
      ) : (
        <h3>Nenhuma</h3>
      )}
      <div className="divider" />

      <br />
      <br />
      <h2>Registros no contrato</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Valor</th>
            <th>Time</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {register.map((regis, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{regis.value}</td>
              <td>{converteHorario(parseInt(regis.time))}</td>
              <td>{regis.local}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!(register.length > 0) ? <h4>Nenhum registro no contrato</h4> : null}

      <br />
      <br />

      {loading ? (
        <h1>Cadastrando registro...</h1>
      ) : transaction ? (
        <>
          {/* Mostra informação da transação  */}
          <h2>Informação da última transação</h2>
          <h3>Endereço de envio: {transaction.from}</h3>
          <h3>Endereço do Contrato: {transaction.to}</h3>
          <h3>
            <a
              href={`https://rinkeby.etherscan.io/tx/${transaction.transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              Veja a transação no ethersan
            </a>
          </h3>
        </>
      ) : null}
      <br />
      <br />
      <div className="divider" />

      <h2>Dados cadastrados no servidor</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Valor</th>
            <th>Time</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {apiData.map((data, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{data.value}</td>
              <td>{converteHorario(parseInt(data.time))}</td>
              <td>{data.local}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!(apiData.length > 0) ? <h4>Nenhum registro no contrato</h4> : null}
      <div className="form-div2">
        <label>Selecione o id que deseja enviar para o contrato</label>
        <input
          type="text"
          value={selectedApiData}
          onChange={(e) => setSelectedApiData(e.target.value)}
        />
        <button onClick={insertRegister}>Enviar</button>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Home;
