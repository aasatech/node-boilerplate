import requestIp from "request-ip";
import routes from "../routes";

require("express-async-errors");

export default app => {
  app.use(requestIp.mw());

  app.get("/", (_, res) =>
    res.json({message: 'Welcome to my home. knock! knock!'})
  );
  app.use("/api/v1", routes);

  app.use((_, res) => {
    return res.status(404).json({message: 404});
  });

  app.use((err, _, res, next) => {
    if (typeof err.status === "undefined")
      return res.status(500).json({message: err.message, status: 500});
    if (err.status === 404) return res.status(404).json({message: 400, status: 400});

    if (err.status === 500) return res.status(500).json({message: 500, status: 500});

    next();
  });
};