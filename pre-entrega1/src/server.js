import initApp from "./app/index.js";
import { config } from "./config/index.js";

const app = initApp()

const server = app.listen(config.PORT,()=>{
    console.info(`server listen on htpp://localhost:${config.PORT}`)
})