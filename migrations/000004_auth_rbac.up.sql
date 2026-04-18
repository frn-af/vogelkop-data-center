-- Add role_id FK to auth.users (nullable for existing rows)
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role_id UUID REFERENCES auth.roles(role_id);

-- Make password_hash nullable (OAuth users don't have passwords)
ALTER TABLE auth.users ALTER COLUMN password_hash DROP NOT NULL;

-- Seed default roles with deterministic UUIDs
INSERT INTO auth.roles (role_id, name, description, permissions, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin', 'Full access to all resources including delete and user management', '{}'::jsonb, true),
  ('00000000-0000-0000-0000-000000000002', 'editor', 'Can view, create, and update resources', '{}'::jsonb, true),
  ('00000000-0000-0000-0000-000000000003', 'viewer', 'Read-only access to all resources', '{}'::jsonb, true)
ON CONFLICT (role_id) DO NOTHING;

-- Assign all existing users the viewer role by default
UPDATE auth.users SET role_id = (SELECT role_id FROM auth.roles WHERE name = 'viewer') WHERE role_id IS NULL;
