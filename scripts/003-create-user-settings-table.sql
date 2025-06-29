CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  openai_api_key VARCHAR,
  api_mode VARCHAR DEFAULT 'platform' CHECK (api_mode IN ('platform', 'byo')),
  firm_name VARCHAR,
  firm_logo_url VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create unique constraint to ensure one settings record per user
CREATE UNIQUE INDEX idx_user_settings_user_id ON user_settings(user_id);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_settings_updated_at 
    BEFORE UPDATE ON user_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
