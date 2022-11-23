const mongoose = require('mongoose');

const Vendedor = mongoose.model('Vendedor',
  new mongoose.Schema({   
                          idvend:String,
                          nombre: String, 
                          apellido: String,
                          correoe:String,
                          totalcomision:[{type:mongoose.Schema.ObjectId,ref:"Venta"}]
                        })
);  

const Venta = mongoose.model('Venta',
  new mongoose.Schema({ idvend:{ type:mongoose.Schema.Types.ObjectId,ref: 'Vendedor' },
                        zona: String,
                        fecha: String,
                        valorventa:String,
                      })
);

module.exports = {
  Vendedor,
  Venta
}

// Otra forma más corta:
// module.exports = {
//     Cliente,
//     Articulo
// }
