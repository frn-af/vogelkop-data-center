<div align="center">

# 🗄️ Vogelkop Data Center Database Design

**Comprehensive database architecture for conservation area management**

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-Enabled-4CAF50?style=flat-square&logo=leaflet&logoColor=white)](https://postgis.net/)

---

**Document Version:** `2.1` • **Last Updated:** 19 January 2026

</div>

---

## 📑 Table of Contents

|  #  | Section                                              | Description                      |
| :-: | ---------------------------------------------------- | -------------------------------- |
|  1  | [Database Overview](#-database-overview)             | System purpose and key features  |
|  2  | [Entity Relation Diagram](#-entity-relation-diagram) | Visual database schema           |
|  3  | [Design Guidelines](#-table-design-guidelines)       | Naming conventions and standards |
|  4  | [Authentication](#-authentication)                   | User and session management      |
|  5  | [Core Tables](#-core-tables)                         | Primary data entities            |
|  6  | [Data Domain Tables](#-data-domain-tables)           | Domain-specific data structures  |
|  7  | [Junction Tables](#-junction-tables)                 | Relationship mapping tables      |
|  8  | [Enumerations](#-enumerations)                       | Predefined value types           |
|  9  | [Performance & Indexing](#-performance-and-indexing) | Optimization strategies          |
| 10  | [Documentation](#-documentation)                     | Version history and maintenance  |

---

## 📋 Database Overview

Database design for the **Vogelkop Data Center** application—a system designed to manage conservation areas under the jurisdiction of **Balai Besar KSDA Papua Barat Daya**, implementing data-driven governance principles.

### ✨ Key Features

| Feature                             | Description                                                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 🏞️ **Conservation Area Management** | Multi-location tracking with administration, spatial planning, legal frameworks, annual assessments (METT/RAPP), and conflict resolution |
| 🔬 **Scientific Data Repository**   | Centralized biodiversity data, field observations, geological features, and terrain characteristics for areas and buffer zones           |
| 👥 **Socio-Economic Management**    | Demographics and community interaction data within and around conservation areas                                                         |
| 📊 **Advanced Analytics**           | Cross-domain analysis capabilities for strategic conservation decision-making                                                            |
| 🤝 **Organizational Collaboration** | Multi-stakeholder engagement including NGO partnerships and external access                                                              |

---

## 🔗 Entity Relation Diagram

> [!NOTE]
> ERD is in progress and can be monitored here → `[[Normalisasi data SIDAK]]`

---

## 📐 Table Design Guidelines

### 1️⃣ Naming Conventions

| Element     | Convention                                   | Example                                         |
| ----------- | -------------------------------------------- | ----------------------------------------------- |
| **Tables**  | Prefix with `vogelkop_`                      | `vogelkop_users`, `vogelkop_conservation_areas` |
| **Columns** | Prefix with table name (singular/snake_case) | `user_name`, `user_email`, `user_role`          |

### 2️⃣ Primary Keys

> [!IMPORTANT]
> All Primary Keys must use **UUID** (Universally Unique Identifier) format instead of auto-increment integers.

### 3️⃣ Audit Trails & Lifecycle

Every table must include these standard metadata columns:

| Column       | Type                 | Purpose                               |
| ------------ | -------------------- | ------------------------------------- |
| `created_at` | Timestamp            | Record creation time                  |
| `updated_at` | Timestamp            | Last modification time                |
| `deleted_at` | Timestamp (Nullable) | Soft-delete timestamp                 |
| `is_active`  | Boolean              | Record availability (default: `true`) |
| `deleted_by` | UUID (Nullable)      | User who performed soft delete        |

---

## 🔐 Authentication

### `vogelkop_users`

| Field           | Type   | Note                   |
| --------------- | ------ | ---------------------- |
| `user_ID`       | UUID   | 🔑 Primary Key         |
| `role_ID`       | UUID   | 🔗 Foreign Key         |
| `user_email`    | String | Not Null               |
| `user_name`     | String | Not Null               |
| `user_password` | Hash   | Hashed value           |
| `user_avatar`   | String | Relative path          |
| `user_verified` | Date   | Verification timestamp |

---

### `vogelkop_account`

| Field                 | Type   | Note                      |
| --------------------- | ------ | ------------------------- |
| `user_ID`             | UUID   | 🔗 Foreign Key            |
| `account_type`        | String | Adapter type              |
| `account_provider`    | String | 🔑 Primary Key / Not Null |
| `account_provider_ID` | String | 🔑 Primary Key / Not Null |
| `refresh_token`       | Text   |                           |
| `access_token`        | Text   |                           |
| `expires_at`          | Int    |                           |
| `token_type`          | String |                           |
| `account_scope`       | String |                           |
| `id_token`            | Text   |                           |
| `session_state`       | String |                           |

---

### `vogelkop_role`

> [!CAUTION] > **Initial Seeding Required**
>
> - `guest`
> - `admin`
> - `staff`

| Field              | Type      | Note            |
| ------------------ | --------- | --------------- |
| `role_ID`          | UUID      | 🔑 Primary Key  |
| `role_name`        | String    | Not Null        |
| `role_description` | Text      |                 |
| `role_permission`  | List/JSON | Permission list |

---

### `vogelkop_session`

| Field           | Type   | Note           |
| --------------- | ------ | -------------- |
| `session_token` | String | 🔑 Primary Key |
| `user_ID`       | String | 🔗 Foreign Key |
| `expires`       | Date   | Timestamp      |

---

### `vogelkop_verification_token`

| Field        | Type   | Note |
| ------------ | ------ | ---- |
| `identifier` | String |      |
| `token`      | String |      |
| `expires`    | Date   |      |

---

## 🏛️ Core Tables

### Schema: Auth (Auth-related tables)
- auth.users (PK: user_id UUID, unique email, name, password_hash, avatar, verified_at, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- auth.accounts (PK: account_id UUID, user_id UUID FK -> auth.users(user_id), provider, provider_id, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- auth.roles (PK: role_id UUID, name, description, permissions JSONB, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- auth.sessions (PK: session_id UUID, user_id UUID FK -> auth.users(user_id), expires, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- auth.verification_tokens (PK: identifier, token, expires, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- auth.activity_logs (PK: log_id UUID, user_id UUID FK -> auth.users(user_id), log_action_type ENUM, entity_table TEXT, entity_ID UUID, changes JSONB, ip_address TEXT, user_agent TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)

### Schema: Core (Conservation & Domain data)
- core.conservation_areas (area_id UUID PK, area_register INT, area_name TEXT, area_description TEXT, area_note TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.legal_decisions (decision_id UUID PK, decision_name TEXT, decision_date DATE, decision_number TEXT, decision_description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.locations (location_id UUID PK, regency_name TEXT, province_name TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.functions (function_id UUID PK, function_name TEXT, function_description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.zoning_blocks (block_id UUID PK, area_id UUID FK -> core.conservation_areas, block_type ENUM, block_description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.area_plannings (plan_id UUID PK, area_id UUID FK -> core.conservation_areas, plan_start DATE, plan_end DATE, plan_status ENUM, plan_approval_date DATE, plan_description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.documents (document_id UUID PK, area_id UUID FK -> core.conservation_areas, document_name TEXT, document_number TEXT, document_type ENUM, document_path TEXT, document_cover TEXT, document_description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.ecosistem_recoveries (recovery_id UUID PK, area_id UUID FK -> core.conservation_areas, recovery_site INT, recovery_area FLOAT, recovery_damage_level ENUM, cause_of_damage ENUM, recovery_action ENUM, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.assessments (assessment_id UUID PK, area_id UUID FK -> core.conservation_areas, assessment_year INT, assessment_score INT, assessment_category ENUM, assessment_description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.certificates_in_area (certificate_id UUID PK, area_id UUID FK -> core.conservation_areas, certificate_right ENUM, certificate_NIB INT, certificate_area FLOAT, certificate_progress TEXT, certificate_description TEXT, location_id UUID FK, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.build_up_areas (buildup_id UUID PK, area_id UUID FK -> core.conservation_areas, buildup_subject_type ENUM, buildup_area FLOAT, buildup_activities TEXT, buildup_year DATE, buildup_permit TEXT, buildup_layout TEXT, buildup_overlap TEXT, buildup_status ENUM, buildup_survey_year DATE, buildup_subject_name TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.area_decisions (area_decision_id UUID PK, area_id UUID FK -> core.conservation_areas, decision_id UUID FK -> core.legal_decisions, decision_area FLOAT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.area_locations (area_location_id UUID PK, area_id UUID FK -> core.conservation_areas, location_id UUID FK, area_location FLOAT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.area_functions (area_function_id UUID PK, area_id UUID FK -> core.conservation_areas, function_id UUID FK -> core.functions, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- core.activity_logs (log_id UUID PK, user_id UUID FK -> auth.users, log_action_type ENUM, entity_table TEXT, entity_ID UUID, changes JSONB, ip_address TEXT, user_agent TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)

### Schema: CMS
- cms.posts (post_id UUID PK, author_id UUID FK -> auth.users, title TEXT, slug TEXT UNIQUE, content TEXT, excerpt TEXT, published_at TIMESTAMPTZ, status ENUM (draft/published/archived), featured_image TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- cms.categories (category_id UUID PK, name TEXT, slug TEXT UNIQUE, description TEXT, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- cms.tags (tag_id UUID PK, name TEXT, slug TEXT UNIQUE, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- cms.post_categories (post_id UUID FK -> cms.posts, category_id UUID FK -> cms.categories, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- cms.post_tags (post_id UUID FK -> cms.posts, tag_id UUID FK -> cms.tags, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)
- cms.media (media_id UUID PK, file_name TEXT, file_path TEXT, file_type TEXT, file_size INT, metadata JSONB, uploaded_by UUID FK -> auth.users, created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)

### Shared Enumerations and Cross-Schema References
- Enumerations (e.g., post_status, plan_status) are recommended to live in a shared area (public or shared schema) to avoid type-not-found in cross-schema queries. Consider declaring them under a dedicated public.shared_enums schema or within each schema as appropriate.

### Indexing Guidance (High level)
- cms.posts.slug: unique index
- cms.* foreign keys: index on FK columns (post.author_id, post_categories.post_id, etc.)
- auth.users.email: index for quick lookup
- cms.media.metadata: GIN index for JSONB fields
- core.* geometry columns (if added): GIST index

### UUID Generation
- Recommend UUIDv7 for primary keys for time-ordered indexing. Document that generation occurs in the application layer (Go) or via a small PL/pgSQL helper if you prefer server-side generation.

### Cross-schema Integrity
- Use explicit schema-qualified references (auth.users, cms.media) to ensure clarity in joins.

### Data Migration Guidance
- Plan to migrate existing vogelkop_* tables to their new schema-qualified names in a staged fashion, with data transformation steps documented in an accompanying migration plan.

This draft provides the scaffolding for a formal per-schema documentation in docs/database-design.md. The next step is to populate each section with concrete field definitions, exact data types, constraints, and example SQL snippets to guide implementation.

---

### Schema Implementations (Auth, Core, CMS)

 This section outlines the intended per-schema design at a high level to guide concrete definitions in follow-up work.

### Example DDL skeletons (not final)
```sql
-- Example: create per-schema basics (not final definitions)
CREATE SCHEMA IF NOT EXISTS auth;
CREATE TABLE auth.users (...);
CREATE SCHEMA IF NOT EXISTS core;
CREATE TABLE core.conservation_areas (...);
CREATE SCHEMA IF NOT EXISTS cms;
CREATE TABLE cms.posts (...);
```

#### Schema: Auth
- Tables:
  - auth.users: user_id UUID PK, email TEXT UNIQUE, name TEXT, password_hash TEXT, avatar TEXT, verified_at TIMESTAMPTZ, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, is_active BOOLEAN, created_by UUID, updated_by UUID, deleted_by UUID
  - auth.accounts: account_id UUID PK, user_id UUID FK -> auth.users(user_id), provider TEXT, provider_id TEXT, refresh_token TEXT, access_token TEXT, expires_at TIMESTAMPTZ, token_type TEXT, account_scope TEXT, id_token TEXT, session_state TEXT, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, is_active BOOLEAN, created_by UUID, updated_by UUID, deleted_by UUID
  - auth.roles: role_id UUID PK, name TEXT, description TEXT, permissions JSONB, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, is_active BOOLEAN, created_by UUID, updated_by UUID, deleted_by UUID
  - auth.sessions: session_id UUID PK, user_id UUID FK -> auth.users(user_id), expires TIMESTAMPTZ, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, is_active BOOLEAN, created_by UUID, updated_by UUID, deleted_by UUID
  - auth.verification_tokens: identifier UUID PK, token TEXT, expires TIMESTAMPTZ, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, is_active BOOLEAN, created_by UUID, updated_by UUID, deleted_by UUID
  - auth.activity_logs: log_id UUID PK, user_id UUID FK -> auth.users(user_id), log_action_type ENUM, entity_table TEXT, entity_ID UUID, changes JSONB, ip_address TEXT, user_agent TEXT, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, is_active BOOLEAN, created_by UUID, updated_by UUID, deleted_by UUID

#### Schema: Core
- Tables include master data, domain data, and junctions migrated to core.* namespace. Example tables (names indicative):
  - core.conservation_areas, core.legal_decisions, core.locations, core.functions, core.zoning_blocks, core.area_plannings, core.documents, core.ecosistem_recoveries, core.assessments, core.certificates_in_area, core.build_up_areas
  - Core junctions: core.area_decisions, core.area_locations, core.area_functions, core.activity_logs
  - Common fields: area_id/location_id/document_id etc. UUID PKs, audit columns (created_at, updated_at, deleted_at, is_active, created_by, updated_by, deleted_by)

#### Schema: CMS
- Tables: cms.posts, cms.categories, cms.tags, cms.post_categories, cms.post_tags, cms.media
- Fields overview (high level):
  - cms.posts: post_id UUID PK, author_id FK -> auth.users(user_id), title, slug UNIQUE, content, excerpt, published_at TIMESTAMPTZ, status ENUM (draft/published/archived), featured_image, audit fields
  - cms.categories: category_id UUID PK, name, slug UNIQUE, description, audit fields
  - cms.tags: tag_id UUID PK, name, slug UNIQUE, audit fields
  - cms.post_categories: post_id FK -> cms.posts, category_id FK -> cms.categories, audit fields
  - cms.post_tags: post_id FK -> cms.posts, tag_id FK -> cms.tags, audit fields
  - cms.media: media_id UUID PK, file_name, file_path, file_type, file_size, metadata JSONB, uploaded_by FK -> auth.users, audit fields

Notes:
- All cross-schema FKs should be schema-qualified, e.g., cms.posts.author_id REFERENCES auth.users(user_id).
- UUID generation strategy: maintain consistent UUIDv7 usage across schemas.
- Indexing guidance provided in the main plan remains applicable.

---
---

### Schema Implementation Snippets (Markdown skeleton)

- Auth schema (auth.*)
```sql
CREATE SCHEMA IF NOT EXISTS auth;
CREATE TABLE auth.users (
  user_id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password_hash TEXT,
  avatar TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);
```

- Core schema (core.*)
```sql
CREATE SCHEMA IF NOT EXISTS core;
CREATE TABLE core.conservation_areas (
  area_id UUID PRIMARY KEY,
  area_register INT NOT NULL,
  area_name TEXT,
  area_description TEXT,
  area_note TEXT,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);
```

- CMS schema (cms.*)
```sql
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
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  updated_by UUID,
  deleted_by UUID
);
```

These are skeletons intended to guide the actual, fully-typed DDL we’ll introduce in the migration plan. The final implementation will refine data types and constraints to align with the domain model and performance requirements.

---

### Cross-schema FK Examples

```sql
-- Example cross-schema FK constraints
ALTER TABLE cms.posts ADD CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES auth.users(user_id);
ALTER TABLE cms.media ADD CONSTRAINT fk_media_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES auth.users(user_id);
ALTER TABLE core.area_decisions ADD CONSTRAINT fk_area_decisions_area_id FOREIGN KEY (area_id) REFERENCES core.conservation_areas(area_id);
```

---
### `vogelkop_conservation_areas` _(Master Table)_

| Field              | Type   | Note               |
| ------------------ | ------ | ------------------ |
| `area_ID`          | UUID   | 🔑 Primary Key     |
| `area_register`    | Int    | Not Null           |
| `area_name`        | String |                    |
| `area_description` | Text   |                    |
| `area_note`        | Text   | Status description |

---

### `vogelkop_legal_decisions`

| Field                  | Type   | Note            |
| ---------------------- | ------ | --------------- |
| `decision_ID`          | UUID   | 🔑 Primary Key  |
| `decision_name`        | String | Document name   |
| `decision_date`        | Date   | Approval date   |
| `decision_number`      | String | Document number |
| `decision_description` | Text   |                 |

---

### `vogelkop_locations`

| Field           | Type   | Note           |
| --------------- | ------ | -------------- |
| `location_ID`   | UUID   | 🔑 Primary Key |
| `regency_name`  | String |                |
| `province_name` | String |                |

---

### `vogelkop_functions`

| Field                  | Type   | Note           |
| ---------------------- | ------ | -------------- |
| `function_ID`          | UUID   | 🔑 Primary Key |
| `function_name`        | String |                |
| `function_description` | Text   |                |

---

## 📊 Data Domain Tables

### 📅 Planning Tables

#### `vogelkop_zoning_blocks`

| Field               | Type | Note                          |
| ------------------- | ---- | ----------------------------- |
| `block_ID`          | UUID | 🔑 Primary Key                |
| `area_ID`           | UUID | 🔗 Foreign Key                |
| `block_type`        | Enum | [`block_type`](#enumerations) |
| `block_description` | Text |                               |

---

#### `vogelkop_area_plannings`

| Field                | Type | Note                           |
| -------------------- | ---- | ------------------------------ |
| `plan_ID`            | UUID | 🔑 Primary Key                 |
| `area_ID`            | UUID | 🔗 Foreign Key                 |
| `plan_start`         | Date | Year only                      |
| `plan_end`           | Date | Year only                      |
| `plan_status`        | Enum | [`plan_status`](#enumerations) |
| `plan_approval_date` | Date |                                |
| `plan_description`   | Text |                                |

---

#### `vogelkop_documents`

| Field                  | Type   | Note                             |
| ---------------------- | ------ | -------------------------------- |
| `document_ID`          | UUID   | 🔑 Primary Key                   |
| `area_ID`              | UUID   | 🔗 Foreign Key                   |
| `document_name`        | String |                                  |
| `document_number`      | String |                                  |
| `document_type`        | Enum   | [`document_type`](#enumerations) |
| `document_path`        | String | Relative path                    |
| `document_cover`       | String | Relative path                    |
| `document_description` | Text   |                                  |

---

### 🌿 Recovery & Assessment Tables

#### `vogelkop_ecosistem_recoveries`

| Field                   | Type  | Note                                     |
| ----------------------- | ----- | ---------------------------------------- |
| `recovery_ID`           | UUID  | 🔑 Primary Key                           |
| `area_ID`               | UUID  | 🔗 Foreign Key                           |
| `recovery_site`         | Int   | Total sites                              |
| `recovery_area`         | Float | Total area (HA)                          |
| `recovery_damage_level` | Enum  | [`recovery_damage_level`](#enumerations) |
| `cause_of_damage`       | Enum  | [`damage_cause`](#enumerations)          |
| `recovery_action`       | Enum  | [`recovery_action`](#enumerations)       |

---

#### `vogelkop_assessments`

| Field                    | Type | Note                                   |
| ------------------------ | ---- | -------------------------------------- |
| `assessment_ID`          | UUID | 🔑 Primary Key                         |
| `area_ID`                | UUID | 🔗 Foreign Key                         |
| `assessment_year`        | Int  | Year                                   |
| `assessment_score`       | Int  |                                        |
| `assessment_category`    | Enum | [`assessment_category`](#enumerations) |
| `assessment_description` | Text |                                        |

---

### 📜 Certification & Build-up Tables

#### `vogelkop_certificates_in_area`

| Field                     | Type  | Note                                 |
| ------------------------- | ----- | ------------------------------------ |
| `certificate_ID`          | UUID  | 🔑 Primary Key                       |
| `area_ID`                 | UUID  | 🔗 Foreign Key                       |
| `certificate_right`       | Enum  | [`certificate_right`](#enumerations) |
| `certificate_NIB`         | Int   | NIB Number                           |
| `certificate_area`        | Float | Area (HA)                            |
| `certificate_progress`    | Text  |                                      |
| `certificate_bhumi_info`  | Text  |                                      |
| `certificate_description` | Text  |                                      |
| `location_ID`             | UUID  | 🔗 Foreign Key                       |

---

#### `vogelkop_build_up_areas`

| Field                  | Type   | Note                                    |
| ---------------------- | ------ | --------------------------------------- |
| `buildup_ID`           | UUID   | 🔑 Primary Key                          |
| `area_ID`              | UUID   | 🔗 Foreign Key                          |
| `buildup_subject_type` | Enum   | [`buildup_subject_type`](#enumerations) |
| `buildup_area`         | Float  | Area (HA)                               |
| `buildup_activities`   | String |                                         |
| `buildup_year`         | Date   |                                         |
| `buildup_permit`       | String |                                         |
| `buildup_layout`       | String |                                         |
| `buildup_overlap`      | Text   |                                         |
| `buildup_status`       | Enum   | [`buildup_status`](#enumerations)       |
| `buildup_survey_year`  | Date   |                                         |
| `buildup_subject_name` | String |                                         |

---

## 🔀 Junction Tables

### Area Relationships

#### `vogelkop_area_decision`

| Field              | Type  | Note           |
| ------------------ | ----- | -------------- |
| `area_decision_ID` | UUID  | 🔑 Primary Key |
| `area_ID`          | UUID  | 🔗 Foreign Key |
| `decision_ID`      | UUID  | 🔗 Foreign Key |
| `decision_area`    | Float | Area (HA)      |

---

#### `vogelkop_area_locations`

| Field              | Type  | Note           |
| ------------------ | ----- | -------------- |
| `area_location_ID` | UUID  | 🔑 Primary Key |
| `location_ID`      | UUID  | 🔗 Foreign Key |
| `area_ID`          | UUID  | 🔗 Foreign Key |
| `location_area`    | Float | Area (HA)      |

---

#### `vogelkop_area_functions`

| Field           | Type | Note           |
| --------------- | ---- | -------------- |
| `area_function` | UUID | 🔑 Primary Key |
| `function_ID`   | UUID | 🔗 Foreign Key |
| `area_ID`       | UUID | 🔗 Foreign Key |

---

### Document & Planning Relationships

#### `vogelkop_planning_documents`

| Field              | Type | Note           |
| ------------------ | ---- | -------------- |
| `plan_document_ID` | UUID | 🔑 Primary Key |
| `document_ID`      | UUID | 🔗 Foreign Key |
| `plan_ID`          | UUID | 🔗 Foreign Key |

---

### Recovery Relationships

#### `vogelkop_recovery_locations`

| Field                  | Type   | Note           |
| ---------------------- | ------ | -------------- |
| `recovery_location_ID` | UUID   | 🔑 Primary Key |
| `location_ID`          | UUID   | 🔗 Foreign Key |
| `recovery_ID`          | UUID   | 🔗 Foreign Key |
| `district_name`        | String |                |
| `village_name`         | String |                |

---

#### `vogelkop_recovery_blocks`

| Field               | Type | Note           |
| ------------------- | ---- | -------------- |
| `recovery_block_ID` | UUID | 🔑 Primary Key |
| `block_ID`          | UUID | 🔗 Foreign Key |
| `recovery_ID`       | UUID | 🔗 Foreign Key |

---

### Build-up Relationships

#### `vogelkop_buildup_locations`

| Field                 | Type   | Note           |
| --------------------- | ------ | -------------- |
| `buildup_location_ID` | UUID   | 🔑 Primary Key |
| `location_ID`         | UUID   | 🔗 Foreign Key |
| `buildup_ID`          | UUID   | 🔗 Foreign Key |
| `district_name`       | String |                |
| `village_name`        | String |                |

---

### Activity Logging

#### `vogelkop_activity_logs`

| Field             | Type   | Note                                |
| ----------------- | ------ | ----------------------------------- |
| `log_ID`          | UUID   | 🔑 Primary Key                      |
| `user_ID`         | UUID   | 🔗 Foreign Key                      |
| `log_action_type` | Enum   | [`logs_action_type`](#enumerations) |
| `entity_table`    | String | Table name                          |
| `entity_ID`       | UUID   | Not Null                            |
| `changes`         | JSON   |                                     |
| `ip_address`      | String | Not Null                            |
| `user_agent`      | Text   | Not Null                            |

---

## 🏷️ Enumerations

### Block Types

```sql
CREATE TYPE block_type AS ENUM (
    'blok_pelindungan',
    'blok_perlindungan_bahari',
    'blok_khusus',
    'blok_rehabilitasi',
    'blok_traditional',
    'blok_religi',
    'blok_pemanfaatan'
);
```

### Plan Status

```sql
CREATE TYPE plan_status AS ENUM (
    'active',
    'proses_revisi',
    'menunggu_ekf',
    'proses_telaah',
    'draft',
    'konsultasi_publik',
    'complete'
);
```

### Document Types

```sql
CREATE TYPE document_type AS ENUM (
    -- Legal decision document types
    'ba_tata_batas',
    'sk_penunjukan',
    'sk_penetapan',
    'sk_penunjukan_parsial',
    -- Zoning block document types
    'penataan_blok',
    'konsultasi_publik',
    'evaluasi_blok',
    'evaluasi_konsultasi',
    -- Planning document types
    'dokumen_rpjp',
    'evaluasi_rpjp',
    'laporan_rpjp'
);
```

### Recovery & Damage Types

```sql
CREATE TYPE recovery_damage_level AS ENUM (
    'ringan',
    'berat'
);

CREATE TYPE damage_cause AS ENUM (
    'perambahan',
    'pembangunan_strategis_tak_terelakan',
    'pembangunan_non_prosedural'
);

CREATE TYPE recovery_action AS ENUM (
    'mekanisme_alam',
    'restorasi'
);
```

### Assessment Categories

```sql
CREATE TYPE assessment_category AS ENUM (
    'efektif',
    'tidak_efektif',
    'belum_dilakukan_penilaian'
);
```

### Certificate Rights

```sql
CREATE TYPE certificate_right AS ENUM (
    'hak_milik',
    'hak_pakai',
    'hak_guna_bangunan',
    'tidak_ada_sertifikat',
    'tanah_kosong'
);
```

### Build-up Types & Status

```sql
CREATE TYPE buildup_subject_type AS ENUM (
    'masyarakat',
    'instansi_pemerintah',
    'perusahaan',
    'kth'
);

CREATE TYPE buildup_status AS ENUM (
    'aktif',
    'mediasi',
    'eskalasi',
    'koordinasi',
    'terselesaikan'
);
```

### Action Log Types

```sql
CREATE TYPE logs_action_type AS ENUM (
    'create',
    'update',
    'delete',
    'restore',
    'login',
    'logout',
    'export'
);
```

---

## ⚡ Performance and Indexing

### User Table Indexing

```sql
CREATE INDEX idx_account_user_id ON vogelkop_accounts(user_ID);
CREATE INDEX idx_session_user_id ON vogelkop_session(user_ID);
```

### Foreign Key Indexing

```sql
CREATE INDEX idx_area_decisions_area_id ON vogelkop_area_decisions(area_ID);
CREATE INDEX idx_area_functions_area_id ON vogelkop_area_functions(area_ID);
CREATE INDEX idx_area_locations_area_id ON vogelkop_area_locations(area_ID);
CREATE INDEX idx_zoning_bloks_area_id ON vogelkop_zoning_blocks(area_ID);
CREATE INDEX idx_documents_area_id ON vogelkop_documents(area_ID);
CREATE INDEX idx_area_planning_area_id ON vogelkop_area_planning(area_ID);
CREATE INDEX idx_ecosistem_recoveries_area_id ON vogelkop_ecosistem_recoveries(area_ID);
CREATE INDEX idx_buildup_area_id ON vogelkop_build_up_areas(area_ID);
CREATE INDEX idx_certificate_area_id ON vogelkop_certificate_in_area(area_ID);
```

### Business Logic Optimization

```sql
CREATE INDEX idx_conservation_area_active ON vogelkop_areas(is_active);
CREATE INDEX idx_conservation_area_name ON vogelkop_areas(area_name);
CREATE INDEX idx_planning_status ON vogelkop_planning(plan_status);
CREATE INDEX idx_certificate_status ON vogelkop_certificate_in_area(certificate_status);
CREATE INDEX idx_buildup_status ON vogelkop_build_up_areas(buildup_status);
```

### Activity Logs Indexing

```sql
CREATE INDEX idx_logs_created_at ON vogelkop_activity_logs(created_at DESC);
CREATE INDEX idx_logs_entity ON vogelkop_activity_logs(entity_table, entity_ID);
CREATE INDEX idx_logs_user ON vogelkop_activity_logs(user_id);
```

### 📈 Performance Guidelines

| Strategy                  | Recommendation                                    |
| ------------------------- | ------------------------------------------------- |
| 🔍 **Query Optimization** | Use appropriate indexes for common query patterns |
| 📦 **Data Archiving**     | Implement archiving strategy for historical data  |
| 🔌 **Connection Pooling** | Configure database connection pooling             |
| 📊 **Monitoring**         | Regular performance monitoring and optimization   |

---

## 📚 Documentation

### 📜 Version History

| Version | Changes                                                                            |
| :-----: | ---------------------------------------------------------------------------------- |
| **2.1** | Added `activity_logs` table for logging                                            |
| **2.0** | Added Authentication table group                                                   |
| **1.1** | Added note for relative path in document storage                                   |
| **1.0** | Initial conservation core data table with planning domain and performance indexing |

### 🔧 Maintenance

> [!TIP]
> This design should be updated when:
>
> - New data sources are integrated
> - Schema changes are required
> - Business rules evolve
> - Performance optimization is needed

### 💬 Support

For questions about this database design:

1. 📖 Review this documentation first
2. 📊 Check the source CSV files for data understanding
3. ✅ Validate against business requirements
4. 📝 Update documentation with any changes

---

<div align="center">

**Vogelkop Data Center** • Database Design Document

_Balai Besar KSDA Papua Barat Daya_

</div>
