CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_provider_id VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  plan VARCHAR DEFAULT 'free' CHECK (plan IN ('free', 'premium', 'white_label_standard', 'white_label_pro')),
  created_at TIMESTAMP DEFAULT now(),
  last_login TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_provider_id ON users(auth_provider_id);
CREATE INDEX idx_users_plan ON users(plan);
