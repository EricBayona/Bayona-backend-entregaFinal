import initApp from "./app/index.js";
import { config } from "./config/index.js";
import { initMongoDBAtlas } from "./db/index.js";

initMongoDBAtlas();

const app = initApp();

const server = app.listen(config.PORT,()=>{
    console.info(`server listen on htpp://localhost:${config.PORT}`)
});