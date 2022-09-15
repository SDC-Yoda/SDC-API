CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id SERIAL,
  body VARCHAR,
  date_written TEXT,
  asker_name VARCHAR,
  asker_email VARCHAR,
  reported BOOL,
  helpful SERIAL
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id SERIAL REFERENCES questions (id),
  body VARCHAR,
  date_written TEXT,
  answerer_name VARCHAR,
  answerer_email VARCHAR,
  reported BOOL,
  helpful SERIAL
);

CREATE TABLE IF NOT EXIST answer_photos (
  id SERIAL PRIMARY KEY,
  answer_id SERIAL REFERENCES answers (id),
  url TEXT
)
