import Koa from 'koa'
import routes from "../Config/routes.js"
import koaBody from "koa-body"

export default async function createServer(){
    let app = new Koa();

    console.log("Server Started");
    
    app.use(koaBody())
    
    app.use(routes);

    return app;
}