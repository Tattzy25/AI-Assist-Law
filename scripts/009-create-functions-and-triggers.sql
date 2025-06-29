-- Function to initialize user usage record when user is created
CREATE OR REPLACE FUNCTION create_user_usage_record()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_usage (user_id) VALUES (NEW.id);
    INSERT INTO user_settings (user_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create usage and settings records for new users
CREATE TRIGGER create_user_records_trigger
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
        usage_gets = CASE WHEN p_action_type = 'api_call' THEN usage_gets + 1 ELSE usage_gets END,
        last_activity = now()
    WHERE user_id = p_user_id;
    
    -- Log the usage
    INSERT INTO usage_logs (user_id, action_type, tokens_used, cost_cents)
    VALUES (p_user_id, p_action_type, p_tokens_used, p_cost_cents);
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
    
    -- Get current month's usage and plan limit
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
        WHEN 'api_call' THEN
            SELECT usage_gets INTO current_usage FROM user_usage WHERE user_id = p_user_id;
            SELECT api_calls_per_month INTO plan_limit FROM plan_limits WHERE plan_name = user_plan;
    END CASE;
    
    -- Return true if within limits (or unlimited plan)
    RETURN (plan_limit = -1 OR current_usage < plan_limit);
END;
$$ LANGUAGE plpgsql;
