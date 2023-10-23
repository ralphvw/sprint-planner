CREATE TABLE IF NOT EXISTS projects(
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  )
