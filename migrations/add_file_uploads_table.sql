-- Migration: Add file_uploads table for Module 6 file storage
-- Run this with: psql -d your_database_name -f migrations/add_file_uploads_table.sql

CREATE TABLE IF NOT EXISTS file_uploads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL,
    original_name TEXT NOT NULL,
    filename TEXT NOT NULL,
    title TEXT,
    notes TEXT,
    size INTEGER NOT NULL,
    type TEXT NOT NULL,
    path TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by user
CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON file_uploads(user_id);

-- Create index for faster queries by upload date
CREATE INDEX IF NOT EXISTS idx_file_uploads_uploaded_at ON file_uploads(uploaded_at);

-- Add comments for documentation
COMMENT ON TABLE file_uploads IS 'Stores metadata for files uploaded in Module 6';
COMMENT ON COLUMN file_uploads.user_id IS 'ID of the user who uploaded the file';
COMMENT ON COLUMN file_uploads.original_name IS 'Original filename when uploaded';
COMMENT ON COLUMN file_uploads.filename IS 'Sanitized filename stored on disk';
COMMENT ON COLUMN file_uploads.title IS 'User-provided title for the file';
COMMENT ON COLUMN file_uploads.notes IS 'User-provided notes for the file';
COMMENT ON COLUMN file_uploads.size IS 'File size in bytes';
COMMENT ON COLUMN file_uploads.type IS 'MIME type of the file';
COMMENT ON COLUMN file_uploads.path IS 'Relative path to the file from public directory';
COMMENT ON COLUMN file_uploads.uploaded_at IS 'Timestamp when file was uploaded';
