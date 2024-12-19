const { conexion } = require("./BD/conexion");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")

// inicializar app
console.log("app de node arrancada");

// conectar a la base de datos
conexion();

// crear servidor node
const app = express();
const puerto = process.env.PORT || 3000;


const corsOptions = {
	origin: function (origin, callback) {
	  const allowedOrigins = [
		'https://ai-server-arg.netlify.app/'  // Dominio de producción
		// 'http://localhost:3000',          // Localhost para desarrollo
		// 'null'                            // Permite el origen 'file://'
	  ];
	  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
		// Si el origen está en la lista o no hay origen (por ejemplo, en solicitudes 'file://')
		callback(null, true);
	  } else {
		callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: 'GET,POST,PUT,DELETE,OPTIONS',
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
	credentials: true // Habilita las credenciales
  };

// configurar cors
app.use(cors(corsOptions));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));


// convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rutas_usuarios = require('./rutas/usuarios');
const clientes = require('./rutas/Clientes');
app.use("/api/user", rutas_usuarios);
app.use('/api/clientes',  clientes);


// crear servidor y escuchar peticiones
app.listen(puerto, ()=>{
    console.log("servidor corriendo en el puerto "+puerto);
});

