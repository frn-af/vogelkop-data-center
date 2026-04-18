UPDATE auth.users SET password_hash = 'oauth_dummy_hash' WHERE password_hash IS NULL;
ALTER TABLE auth.users DROP COLUMN IF EXISTS role_id;
ALTER TABLE auth.users ALTER COLUMN password_hash SET NOT NULL;
DELETE FROM auth.roles WHERE name IN ('admin', 'editor', 'viewer');
