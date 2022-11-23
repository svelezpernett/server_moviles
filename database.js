const {connect} = require('mongoose')

const dbConnection =() =>{
    
    const db = connect(process.env.URI)
    .then(() =>{
        console.log('connected to database mongoDb')
    }).catch(() =>{
        console.log('error no connection')
    })
    return db
}
module.exports ={ dbConnection}