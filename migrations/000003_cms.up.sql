CREATE SCHEMA IF NOT EXISTS cms;

CREATE TABLE cms.posts (
  post_id UUID PRIMARY KEY,
  author_id UUID REFERENCES auth.users(user_id),
  title TEXT,
  slug TEXT UNIQUE,
  content TEXT,
  excerpt TEXT,
  published_at TIMESTAMPTZ,
  status VARCHAR(32) CHECK (status IN ('draft','published','archived')),
  featured_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE cms.categories (
  category_id UUID PRIMARY KEY,
  name TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE cms.tags (
  tag_id UUID PRIMARY KEY,
  name TEXT,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE cms.post_categories (
  post_id UUID REFERENCES cms.posts(post_id),
  category_id UUID REFERENCES cms.categories(category_id),
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE cms.post_tags (
  post_id UUID REFERENCES cms.posts(post_id),
  tag_id UUID REFERENCES cms.tags(tag_id),
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE cms.media (
  media_id UUID PRIMARY KEY,
  file_name TEXT,
  file_path TEXT,
  file_type TEXT,
  file_size INT,
  metadata JSONB,
  uploaded_by UUID REFERENCES auth.users(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);
