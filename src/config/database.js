import "dotenv/config";

const pg = require('pg').types;
const { setTypeParser, builtins } = pg;
const typesToReset = [builtins.DATE, builtins.TIME, builtins.TIMETZ, builtins.TIMESTAMP, builtins.TIMESTAMPTZ];
function resetPgDateParsers() {
  for (const pgType of typesToReset) {
    setTypeParser(pgType, val => String(val));
  }
}

resetPgDateParsers();

const configTimezone = {
  afterCreate: function(conn, done) {
    conn.query('SET timezone="Asia/Tokyo";', function(err) {
      done(err, conn);
    });
  },
};

var knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT || 5432,
    timezone: "Japan"
  },
  pool: {min: 2, max: 30, ...configTimezone}
});

export default knex;
