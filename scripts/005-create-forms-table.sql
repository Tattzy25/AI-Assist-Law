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

-- Create indexes
CREATE INDEX idx_forms_user_id ON forms(user_id);
CREATE INDEX idx_forms_form_type ON forms(form_type);
CREATE INDEX idx_forms_status ON forms(status);
CREATE INDEX idx_forms_created_at ON forms(created_at);
