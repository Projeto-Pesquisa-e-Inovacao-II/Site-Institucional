var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    empresaModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.status(200).json(resultadoAutenticar[0]);
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {resposta
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var empresaServer = req.body.empresaServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var numero = req.body.numeroServer;
  var representanteLegal = req.body.representanteLegalServer;
  var CPNJ = req.body.cnpjServer;
  var telefone = req.body.telefoneServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cep = req.body.cepServer;

  console.log(req.body)

  console.log("OI");
  // Faça as validações dos valores
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
    // console.log(nomeFantasia);
    empresaModel
      .cadastrar(
        empresaServer,
        nomeFantasia,
        numero,
        cep,
        email,
        senha,
        representanteLegal,
        CPNJ,
        telefone
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function deletar(req, res) {
  const idEmpresa = req.params.idEmpresa;
  if (idEmpresa == undefined) {
    res.status(400).send("Seu id está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
    empresaModel
      .deletar(idEmpresa)
      .then((resultado) => {
        res.status(200).json({ sucesso: true, resultado });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar empresa." });
      });
  }
}
module.exports = {
  autenticar,
  cadastrar,
  deletar,
};
