import pg, { QueryResultRow } from "pg";

const { Pool } = pg;

const pool = new Pool();

export const query = async <T extends QueryResultRow>(
  text: string,
  params?: any,
  callback?: (err: Error, result: pg.QueryResult<T>) => void
): Promise<pg.QueryResult<T>> => {
  return pool.query(text, params, callback!) as unknown as Promise<
    pg.QueryResult<T>
  >;
};
