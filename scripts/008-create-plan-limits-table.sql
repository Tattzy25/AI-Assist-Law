CREATE TABLE plan_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name VARCHAR NOT NULL UNIQUE,
  messages_per_month INTEGER DEFAULT -1, -- -1 means unlimited
  forms_per_month INTEGER DEFAULT -1,
  pdfs_per_month INTEGER DEFAULT -1,
  uploads_per_month INTEGER DEFAULT -1,
  api_calls_per_month INTEGER DEFAULT -1,
  max_file_size_mb INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT now()
);

-- Insert default plan limits
INSERT INTO plan_limits (plan_name, messages_per_month, forms_per_month, pdfs_per_month, uploads_per_month, api_calls_per_month, max_file_size_mb) VALUES
('free', 10, 3, 2, 5, 0, 5),
('premium', 100, 25, 15, 50, 100, 25),
('white_label_standard', -1, -1, -1, -1, -1, 50),
('white_label_pro', -1, -1, -1, -1, -1, 100);
