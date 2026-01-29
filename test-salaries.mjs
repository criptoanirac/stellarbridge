import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { jobPostings, matches } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const jobs = await db
  .select({
    jobId: jobPostings.id,
    title: jobPostings.title,
    salaryMin: jobPostings.salaryMin,
    salaryMax: jobPostings.salaryMax,
    matchStatus: matches.status,
  })
  .from(jobPostings)
  .innerJoin(matches, eq(matches.jobId, jobPostings.id))
  .where(eq(matches.status, "hired"));

console.log("Jobs with hired matches:");
console.log(JSON.stringify(jobs, null, 2));

await connection.end();
process.exit(0);
