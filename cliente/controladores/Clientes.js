const Clientes = require('../modelo/Clientes')

const crear = (req, res) => {

    //recoger todos los datos de post
    let parametros = req.body;

    //crear el objeto a guardar
    const cliente = new Clientes(parametros);

    //guardar articulo en la base de datos
    cliente.save((error, clientesGuardado) => {

        if (error || !clientesGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: 'no se ha guardado'
            });
        }

        //devolver el resultado
        return res.status(200).json({
            status: 'success',
            mensaje: 'se ha guardado la informacion',
            clientesGuardado
        });
    })

}

const listar = (req, res) => {
    Clientes.find()
         .sort({fecha: -1})
        .exec((error, clientes) => {
            if (error || !clientes || clientes.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "no se ha encontrado ningun dato"
                })
            }

            res.status(200).json({
                status: "success",
                clientes
            })
        })
}


const uno = (req, res) => {

    //recoger el id
    let id = req.params.id;

    //buscar articulos
    Clientes.findById(id, (error, clientes) => {

        if (error || !clientes) {
            return res.status(404).json({
                status: "error",
                mensaje: 'no se ha podido encontrar datos'
            });
        }

        return res.status(200).json({
            status: "success",
            clientes
        })

    })

}

const editar = (req, res) => {

    let id = req.params.id;

    let parametros = req.body;



    Clientes.findOneAndUpdate({ _id: id }, parametros, { new: true }, (error, clientesActualizado) => {

        if (error || !clientesActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "error al actualizar el articulo"
            });
        }

        return res.status(200).json({
            status: "success",
            mactred: clientesActualizado
        })
    })
}
const buscarPagoPorCuit = async (req, res) => {
    try {
      const { cuit } = req.query; // Obtén el cuit de la consulta
  
      // Buscar el cliente por cuit
      const cliente = await Clientes.findOne({ cuit });
  
      if (!cliente) {
        return res.status(404).json({ status: 'error', message: 'Cliente no encontrado' });
      }
  
      // Devolver solo el campo 'pago'
      return res.json({ status: 'success', pago: cliente.pago });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Error en el servidor' });
    }
  };

module.exports = {
    crear,
    listar,
    uno,
    editar,
    buscarPagoPorCuit,
}