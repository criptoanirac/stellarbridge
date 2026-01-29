import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './drizzle/schema.ts';
import dotenv from 'dotenv';

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const talents = await db.select().from(schema.talents);
console.log('Talents in database:', talents.map(t => ({ 
  id: t.id, 
  pseudonym: t.pseudonym,
  xp: t.xp, 
  level: t.level 
})));

process.exit(0);
