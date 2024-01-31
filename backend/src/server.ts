import app from "./app";

import { port, environment } from "./config";

app.listen(port, () => {
  console.log(
    `✅ Server started successfully on PORT : ${port} in ${environment} mode.`
  );
});
