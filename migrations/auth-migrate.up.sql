CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE auth.users (
  user_id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(512),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE auth.accounts (
  account_id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(user_id),
  provider VARCHAR(100),
  provider_id VARCHAR(255),
  refresh_token TEXT,
  access_token TEXT,
  expires_at TIMESTAMPTZ,
  token_type VARCHAR(50),
  account_scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE auth.roles (
  role_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE auth.sessions (
  session_id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(user_id),
  expires TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE auth.verification_tokens (
  identifier VARCHAR(255) PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE auth.activity_logs (
  log_id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(user_id),
  log_action_type VARCHAR(50),
  entity_table TEXT,
  entity_ID UUID,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

-- Data Migration (if vogelkop_users exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vogelkop_users') THEN
        INSERT INTO auth.users (user_id, email, name, password_hash, avatar, verified_at, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
        SELECT user_id, user_email, user_name, user_password, user_avatar, user_verified, created_at, updated_at, deleted_at, is_active, deleted_by, NULL, deleted_by
        FROM public.vogelkop_users;
    END IF;
END $$;
