CREATE TABLE firms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR,
  plan VARCHAR CHECK (plan IN ('white_label_standard', 'white_label_pro')),
  openai_api_key TEXT,
  api_mode VARCHAR DEFAULT 'BYO' CHECK (api_mode IN ('BYO', 'UsePlatform')),
  usage_gets INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_firms_plan ON firms(plan);
CREATE INDEX idx_firms_api_mode ON firms(api_mode);
