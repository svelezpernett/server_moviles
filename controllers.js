const {response} = require("express")
const { Vendedor,Venta } = require("./models.js");

exports.postVendedor =async (req, res =response) =>{

    const iden = req.body.idvend

    const vendedor = await  Vendedor.findOne({idvend:iden})
    console.log(vendedor)
    if(vendedor){
        return  res.status(401).json({
            ok:false,
            msg:"la identificacion ya esta en uso"
        })
    }

    new Vendedor({ idvend: req.body.idvend, nombre: req.body.nombre, apellido: req.body.apellido,correoe:req.body.correoe, })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

}

exports.postVenta =async(req, res =response) =>{

    const vendedor = await Vendedor.findOne({idvend:req.body.idvend})
    
    if(!vendedor){
        return res.status(401).json({
            ok:false,
            msg:"no esta registrado"
        })
    }

    const newVenta = new Venta({
                idvend:vendedor._id,
                zona:req.body.zona,
                fecha:req.body.fecha,
                valorventa:req.body.valorventa
            })

    try {

        const savedNewVenta = await  newVenta.save()

        vendedor.totalcomision =vendedor.totalcomision.concat(savedNewVenta._id)
        await vendedor.save()

        res.status(201).json({
            ok:true,
        })

    } catch (error) {

        res.status(401).json({
            ok:false,
            msg:"guardado"
        })

    }
 
}

exports.getVenta =async(req, res =response) =>{   


    const vended = await  Vendedor.findOne({idvend:req.params.id})

    if(!vended){
        return  res.status(401).json({
            ok:false,
            msg:"no se encontro"        })
    }

    const vendedor =  await (await Vendedor.find({_id:vended._id}).populate("Venta"))

    const venta =  await (await Venta.find({idvend:vended._id}).populate("Vendedor"))

    const initialValue = 0;
    const sumWithInitial = venta.reduce(
        
        (previousValue, currentValue) =>{
            if(currentValue.zona =="norte"){
                return  previousValue + parseInt (currentValue.valorventa)*2/100
            }else if (currentValue.zona =="sur"){
                return  previousValue + parseInt (currentValue.valorventa)*3/100
            }
        }
        ,initialValue
      );

    const result = vendedor.map(index => {
        const {idvend,nombre,apellido,correoe} = index

        return {idvend,nombre,apellido,correoe,totalcomision:sumWithInitial}
    })
    
    res.status(201).json({
        ok:true,
        result,
        venta
    })

}

exports.getVendedor =async(rep,res=response) =>{

    try {

        const vendedor = await Vendedor.find({})


        if(vendedor.length ==0){
            res.status(201).json({
                ok:false,
                msg:"no hay informacion"
            })
        }

        res.status(201).json({
            ok:true,
            vendedor
        })

    } catch (error) {
        
        res.status(401).json({
            ok:false
        })

    }

}

