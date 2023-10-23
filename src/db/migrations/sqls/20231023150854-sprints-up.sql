CREATE TABLE IF NOT EXISTS sprints(
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  judge INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR,
  estimated_days INT DEFAULT 0,
  completed BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  )
