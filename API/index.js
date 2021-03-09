import createServer from "./Config/server.js"

const PORT = 8080 // 

createServer().then(app => {
    app.listen(PORT);
})