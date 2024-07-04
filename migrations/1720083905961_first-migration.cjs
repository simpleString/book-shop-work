/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    username: {
      type: "varchar(255)",
      notNull: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    role: {
      type: "integer",
      notNull: true,
      default: 0,
    },
  });

  pgm.createTable("books", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    title: {
      type: "varchar(255)",
      notNull: true,
    },
    author: {
      type: "varchar(255)",
      notNull: true,
    },
    genres: {
      type: "text",
      notNull: true,
    },
    publicationdate: {
      type: "date",
      notNull: true,
    },
  });

  pgm.createIndex("users", ["username", "email"]);
  pgm.createIndex("books", ["title", "author"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
