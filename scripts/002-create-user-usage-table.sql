CREATE TABLE user_usage (
  user_id UUID REFERENCES users(id),
  messages_to_ai INT DEFAULT 0,
  forms_auto_filled INT DEFAULT 0,
  pdfs_generated INT DEFAULT 0,
  uploads_count INT DEFAULT 0,
  last_activity TIMESTAMP DEFAULT now(),
  PRIMARY KEY (user_id)
);

-- Create index for better performance on last_activity queries
CREATE INDEX idx_user_usage_last_activity ON user_usage(last_activity);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_usage_updated_at 
    BEFORE UPDATE ON user_usage 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
