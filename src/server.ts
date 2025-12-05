import app from "./index";
import { Env } from "./utils/env.utils";

const port = Env.PORT || 4000;

// Levantando el servidor:
app.listen(port, () => {
    console.log(`Escuchando el puerto: ${port}`)
});