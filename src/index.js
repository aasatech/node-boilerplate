import express from "express";
import morgan from 'morgan';
import {Model} from "objection";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import db from "./config/database";
import routes from "./config/routes";
import logger from './config/logger';

const PORT = process.env.PORT || 3000
const app = express();
const http = require("http").Server(app);

const corsOption = {
  origin: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true
};

const productionLog =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';
const logMode = app.get("env") === "development" ? "dev" : productionLog;

app.set("trust proxy", true);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());
app.use(cors(corsOption));

app.use(morgan('combined', { stream: logger }))
app.use(morgan(logMode))

Model.knex(db);
routes(app);

const server = http.listen(PORT, () => {
  console.log(`Server now listening at localhost:${PORT}`);
});

server.on("close", () => {
  console.log("Closed express server");

  db.pool.end(() => {
    console.log("Shut down connection pool");
  });
});
