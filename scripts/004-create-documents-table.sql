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

-- Create indexes
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_created_at ON documents(created_at);
CREATE INDEX idx_documents_ai_processed ON documents(ai_processed);
