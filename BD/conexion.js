const mongoose = require("mongoose");


const conexion = async()=>{

    try{

        
       await mongoose.connect("mongodb+srv://lautarorcloudy:x6qQtGVy97QENF1d@cluster0.9bhds.mongodb.net/Cluster0");
       
    //    mongodb+srv://lautarocloudy:<password>@cluster0.dbqadgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
       console.log("conectado correctamente");

    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports={
    conexion
}


