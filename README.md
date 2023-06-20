# Climbing Buddies

Neon login:
// Do not expose your Neon credentials to the browser
// .env
PGHOST='ep-throbbing-bonus-190479.eu-central-1.aws.neon.tech'
PGDATABASE='neondb'
PGUSER='hoferdev.mi'
PGPASSWORD='NFsOHi9k6zXh'

// pages/api/hello_worlds.js
import postgres from "postgres";

const conn = postgres();

function selectAll() {
return conn.query("SELECT \* FROM hello_world");
}
