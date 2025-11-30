import app from "./index";

const port = process.env.port || 4000;

// Levantando el servidor:
app.listen(port, () => {
    console.log(`Escuchando el puerto: ${port}`)
});