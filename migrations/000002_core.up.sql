CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE core.conservation_areas (
  area_id UUID PRIMARY KEY,
  area_register INT NOT NULL,
  area_name TEXT,
  area_description TEXT,
  area_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE core.legal_decisions (
  decision_id UUID PRIMARY KEY,
  decision_name TEXT,
  decision_date DATE,
  decision_number TEXT,
  decision_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE core.locations (
  location_id UUID PRIMARY KEY,
  regency_name TEXT,
  province_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE core.functions (
  function_id UUID PRIMARY KEY,
  function_name TEXT,
  function_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

CREATE TABLE core.zoning_blocks (
  block_id UUID PRIMARY KEY,
  area_id UUID REFERENCES core.conservation_areas(area_id),
  block_type TEXT,
  block_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);

-- Data Migration (if vogelkop_conservation_areas exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'vogelkop_conservation_areas') THEN
        INSERT INTO core.conservation_areas (area_id, area_register, area_name, area_description, area_note, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
        SELECT area_id, area_register, area_name, area_description, area_note, created_at, updated_at, deleted_at, is_active, NULL, NULL, deleted_by
        FROM public.vogelkop_conservation_areas;
    END IF;
END $$;
