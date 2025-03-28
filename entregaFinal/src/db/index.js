import { connect} from 'mongoose';
import { config } from '../config/index.js'
export const initMongoDBAtlas = async()=>{
    try{
        await connect(config.db.connectionString)
        console.info(`MongoDB connected to: ${config.db.connectionString}`);


    }catch(error) {
        console.error(
            `Error en la conexion a la base de datos, motivo "${error.message}"`
        )
    }
}