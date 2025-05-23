// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuariosRouter = require("./src/routes/usuarios");
var contatoRouter = require("./src/routes/contato");
var servicosRouter = require("./src/routes/servicos");
var sobreNosRouter = require("./src/routes/sobre-nos");
var cadastroRouter = require("./src/routes/cadastro");
var loginRouter = require("./src/routes/login");
var dashboardRouter = require("./src/routes/dashboard");
var perfilRouter = require("./src/routes/perfil");
var suporteRouter = require("./src/routes/suporte");
var suporteMessageReceivedRouter = require("./src/routes/suporte-message-received");
var indexDashboardRouter = require("./src/routes/indexDashboard");


var deleteUser = require("./src/routes/deleteUserData")
var getUserData = require("./src/routes/getUserData");
var updateUserData = require("./src/routes/updateUserData");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/contato", contatoRouter);
app.use("/servicos", servicosRouter);
app.use("/sobre-nos", sobreNosRouter);
app.use("/cadastro", cadastroRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/dashboard/perfil", perfilRouter);
app.use("/dashboard/suporte", suporteRouter);
app.use("/dashboard/suporte-mensagem", suporteMessageReceivedRouter);
app.use("/dashboard/visao-geral", indexDashboardRouter);

app.use("/get_user_data", getUserData);
app.use("/update_user_data", updateUserData);
app.use("/delete_user_data", deleteUser);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORTA_APP, function () {
    console.log(`

                                    ####      ##   ######   ##    ##   ##    ##  ###    ###
                                    ## ##    ####    ##    ####   ##   ##   ####  ###  ###
                                    ##  ##  ##  ##   ##   ##  ##  ##   ##  ##  ##   ####
                                    ##  ##  ######   ##   ######  ## # ##  ######    ##
                                    ##  ##  ##  ##   ##   ##  ##  #######  ##  ##    ##
                                    ## ##   ##  ##   ##   ##  ##  ### ###  ##  ##    ##
                                    ####    ##  ##   ##   ##  ##  ##   ##  ##  ##    ##
 
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
