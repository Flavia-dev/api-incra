import Router from "@koa/router"
import Controller from "./controllers.js"

const routes = new Router({})
const productorController = new Controller()


routes.get('/get_imovel/:codigoImovel', async (ctx, next) => {
    await productorController.getProductorByCode(ctx)
})

routes.get('/get_nome/:nome', async (ctx, next) => {
    await productorController.getProductorByName(ctx)
})

export default routes.middleware()