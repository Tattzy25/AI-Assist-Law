-- Complete Immigration AI Assistant Database Schema
-- Execute this entire file to set up the complete database

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS usage_logs CASCADE;
DROP TABLE IF EXISTS ai_conversations CASCADE;
DROP TABLE IF EXISTS forms CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS plan_limits CASCADE;
DROP TABLE IF EXISTS user_usage CASCADE;
DROP TABLE IF EXISTS firms CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS create_user_usage_record() CASCADE;
DROP FUNCTION IF EXISTS increment_usage(UUID, VARCHAR, INTEGER, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS check_plan_limit(UUID, VARCHAR) CASCADE;

-- Create users table - Core user information
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_provider_id VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  plan VARCHAR DEFAULT 'free' CHECK (plan IN ('free', 'premium', 'white_label_standard', 'white_label_pro')),
  created_at TIMESTAMP DEFAULT now(),
  last_login TIMESTAMP
);

-- Create user_usage table - Usage tracking
CREATE TABLE user_usage (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  messages_to_ai INT DEFAULT 0,
  forms_auto_filled INT DEFAULT 0,
  pdfs_generated INT DEFAULT 0,
  uploads_count INT DEFAULT 0,
  last_activity TIMESTAMP DEFAULT now(),
  PRIMARY KEY (user_id)
);

-- Create firms table - White-label firm management
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

-- Create documents table - File uploads with AI processing
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename VARCHAR NOT NULL,
  original_filename VARCHAR NOT NULL,
  file_size INTEGER NOT NULL,
  file_type VARCHAR NOT NULL,
  file_url VARCHAR NOT NULL,
  ai_processed BOOLEAN DEFAULT false,
  ai_extracted_data JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create forms table - Form submissions with AI auto-fill
CREATE TABLE forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  form_type VARCHAR NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}',
  ai_auto_filled BOOLEAN DEFAULT false,
  ai_suggestions JSONB,
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'submitted')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create ai_conversations table - Chat history with token/cost tracking
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR NOT NULL UNIQUE,
  messages JSONB NOT NULL DEFAULT '[]',
  tokens_used INTEGER DEFAULT 0,
  cost_cents INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create usage_logs table - Detailed action logging
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR NOT NULL,
  details JSONB,
  tokens_used INTEGER DEFAULT 0,
  cost_cents INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Create plan_limits table - Subscription tier limits
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

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_provider_id ON users(auth_provider_id);
CREATE INDEX idx_users_plan ON users(plan);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_user_usage_last_activity ON user_usage(last_activity);

CREATE INDEX idx_firms_plan ON firms(plan);
CREATE INDEX idx_firms_api_mode ON firms(api_mode);

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_created_at ON documents(created_at);
CREATE INDEX idx_documents_ai_processed ON documents(ai_processed);

CREATE INDEX idx_forms_user_id ON forms(user_id);
CREATE INDEX idx_forms_form_type ON forms(form_type);
CREATE INDEX idx_forms_status ON forms(status);
CREATE INDEX idx_forms_created_at ON forms(created_at);

CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_session_id ON ai_conversations(session_id);
CREATE INDEX idx_ai_conversations_created_at ON ai_conversations(created_at);

CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_action_type ON usage_logs(action_type);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);

-- Insert default plan limits
INSERT INTO plan_limits (plan_name, messages_per_month, forms_per_month, pdfs_per_month, uploads_per_month, api_calls_per_month, max_file_size_mb) VALUES
('free', 10, 3, 2, 5, 0, 5),
('premium', 100, 25, 15, 50, 100, 25),
('white_label_standard', -1, -1, -1, -1, -1, 50),
('white_label_pro', -1, -1, -1, -1, -1, 100);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at columns
CREATE TRIGGER update_firms_updated_at 
    BEFORE UPDATE ON firms 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at 
    BEFORE UPDATE ON documents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forms_updated_at 
    BEFORE UPDATE ON forms 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at 
    BEFORE UPDATE ON ai_conversations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize user usage record when user is created
CREATE OR REPLACE FUNCTION create_user_usage_record()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_usage (user_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create usage record for new users
CREATE TRIGGER create_user_usage_trigger
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_usage_record();

-- Function to increment usage counters
CREATE OR REPLACE FUNCTION increment_usage(
    p_user_id UUID,
    p_action_type VARCHAR,
    p_tokens_used INTEGER DEFAULT 0,
    p_cost_cents INTEGER DEFAULT 0
)
RETURNS VOID AS $$
BEGIN
    -- Update usage counters
    UPDATE user_usage 
    SET 
        messages_to_ai = CASE WHEN p_action_type = 'ai_message' THEN messages_to_ai + 1 ELSE messages_to_ai END,
        forms_auto_filled = CASE WHEN p_action_type = 'form_autofill' THEN forms_auto_filled + 1 ELSE forms_auto_filled END,
        pdfs_generated = CASE WHEN p_action_type = 'pdf_generation' THEN pdfs_generated + 1 ELSE pdfs_generated END,
        uploads_count = CASE WHEN p_action_type = 'file_upload' THEN uploads_count + 1 ELSE uploads_count END,
        last_activity = now()
    WHERE user_id = p_user_id;
    
    -- Log the usage
    INSERT INTO usage_logs (user_id, action_type, tokens_used, cost_cents, details)
    VALUES (p_user_id, p_action_type, p_tokens_used, p_cost_cents, jsonb_build_object('timestamp', now()));
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has exceeded plan limits
CREATE OR REPLACE FUNCTION check_plan_limit(
    p_user_id UUID,
    p_action_type VARCHAR
)
RETURNS BOOLEAN AS $$
DECLARE
    user_plan VARCHAR;
    current_usage INTEGER;
    plan_limit INTEGER;
BEGIN
    -- Get user's plan
    SELECT plan INTO user_plan FROM users WHERE id = p_user_id;
    
    -- Get current usage and plan limit based on action type
    CASE p_action_type
        WHEN 'ai_message' THEN
            SELECT messages_to_ai INTO current_usage FROM user_usage WHERE user_id = p_user_id;
            SELECT messages_per_month INTO plan_limit FROM plan_limits WHERE plan_name = user_plan;
        WHEN 'form_autofill' THEN
            SELECT forms_auto_filled INTO current_usage FROM user_usage WHERE user_id = p_user_id;
            SELECT forms_per_month INTO plan_limit FROM plan_limits WHERE plan_name = user_plan;
        WHEN 'pdf_generation' THEN
            SELECT pdfs_generated INTO current_usage FROM user_usage WHERE user_id = p_user_id;
            SELECT pdfs_per_month INTO plan_limit FROM plan_limits WHERE plan_name = user_plan;
        WHEN 'file_upload' THEN
            SELECT uploads_count INTO current_usage FROM user_usage WHERE user_id = p_user_id;
            SELECT uploads_per_month INTO plan_limit FROM plan_limits WHERE plan_name = user_plan;
        ELSE
            RETURN TRUE; -- Unknown action type, allow by default
    END CASE;
    
    -- Return true if within limits (or unlimited plan)
    RETURN (plan_limit = -1 OR COALESCE(current_usage, 0) < plan_limit);
END;
$$ LANGUAGE plpgsql;

-- Function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE(
    total_messages INTEGER,
    total_forms INTEGER,
    total_pdfs INTEGER,
    total_uploads INTEGER,
    last_activity TIMESTAMP,
    plan_name VARCHAR,
    messages_limit INTEGER,
    forms_limit INTEGER,
    pdfs_limit INTEGER,
    uploads_limit INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        uu.messages_to_ai,
        uu.forms_auto_filled,
        uu.pdfs_generated,
        uu.uploads_count,
        uu.last_activity,
        u.plan,
        pl.messages_per_month,
        pl.forms_per_month,
        pl.pdfs_per_month,
        pl.uploads_per_month
    FROM user_usage uu
    JOIN users u ON uu.user_id = u.id
    JOIN plan_limits pl ON u.plan = pl.plan_name
    WHERE uu.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to reset monthly usage (to be called monthly via cron job)
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS VOID AS $$
BEGIN
    UPDATE user_usage SET
        messages_to_ai = 0,
        forms_auto_filled = 0,
        pdfs_generated = 0,
        uploads_count = 0;
    
    UPDATE firms SET
        usage_gets = 0;
        
    INSERT INTO usage_logs (user_id, action_type, details)
    SELECT id, 'monthly_reset', jsonb_build_object('reset_date', now())
    FROM users;
END;
$$ LANGUAGE plpgsql;

-- Create a view for user dashboard statistics
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
    u.id as user_id,
    u.email,
    u.plan,
    u.created_at as signup_date,
    u.last_login,
    uu.messages_to_ai,
    uu.forms_auto_filled,
    uu.pdfs_generated,
    uu.uploads_count,
    uu.last_activity,
    pl.messages_per_month as messages_limit,
    pl.forms_per_month as forms_limit,
    pl.pdfs_per_month as pdfs_limit,
    pl.uploads_per_month as uploads_limit,
    pl.max_file_size_mb,
    CASE 
        WHEN pl.messages_per_month = -1 THEN 100
        ELSE CAST(CAST(uu.messages_to_ai AS NUMERIC) / CAST(pl.messages_per_month AS NUMERIC) * 100 AS NUMERIC(5,2))
    END as messages_usage_percent,
    CASE 
        WHEN pl.forms_per_month = -1 THEN 100
        ELSE CAST(CAST(uu.forms_auto_filled AS NUMERIC) / CAST(pl.forms_per_month AS NUMERIC) * 100 AS NUMERIC(5,2))
    END as forms_usage_percent,
    CASE 
        WHEN pl.pdfs_per_month = -1 THEN 100
        ELSE CAST(CAST(uu.pdfs_generated AS NUMERIC) / CAST(pl.pdfs_per_month AS NUMERIC) * 100 AS NUMERIC(5,2))
    END as pdfs_usage_percent,
    CASE 
        WHEN pl.uploads_per_month = -1 THEN 100
        ELSE CAST(CAST(uu.uploads_count AS NUMERIC) / CAST(pl.uploads_per_month AS NUMERIC) * 100 AS NUMERIC(5,2))
    END as uploads_usage_percent
FROM users u
LEFT JOIN user_usage uu ON u.id = uu.user_id
LEFT JOIN plan_limits pl ON u.plan = pl.plan_name;

-- Schema creation complete
SELECT 'Immigration AI Assistant Database Schema Created Successfully!' as status;
