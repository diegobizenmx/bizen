-- Enable RLS on file_uploads table
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their own files
CREATE POLICY "Users can view their own files" ON file_uploads
    FOR SELECT USING (auth.uid()::text = user_id);

-- Create policy for users to insert their own files
CREATE POLICY "Users can insert their own files" ON file_uploads
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create policy for users to update their own files
CREATE POLICY "Users can update their own files" ON file_uploads
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policy for users to delete their own files
CREATE POLICY "Users can delete their own files" ON file_uploads
    FOR DELETE USING (auth.uid()::text = user_id);

-- Create policy for service role to access all files (for admin purposes)
CREATE POLICY "Service role can access all files" ON file_uploads
    FOR ALL USING (auth.role() = 'service_role');

-- Add comments for documentation
COMMENT ON POLICY "Users can view their own files" ON file_uploads IS 'Users can only see files they uploaded';
COMMENT ON POLICY "Users can insert their own files" ON file_uploads IS 'Users can only upload files to their own account';
COMMENT ON POLICY "Users can update their own files" ON file_uploads IS 'Users can only update their own files';
COMMENT ON POLICY "Users can delete their own files" ON file_uploads IS 'Users can only delete their own files';
COMMENT ON POLICY "Service role can access all files" ON file_uploads IS 'Service role has full access for admin operations';
