# Work Plan: Database Restructuring (Docs Update)

**Target File**: `docs/database-design.md`

## Overview
This plan dictates how to completely restructure the `database-design.md` document to implement separate PostgreSQL Schemas (`auth`, `core`, and `cms`) and establish a robust, full-featured CMS structure that prepares for future scaling.

## Task 1: Update Document Header & Guidelines
1. Update **Document Version** to `3.0` and **Last Updated** to the current date.
2. In the **Table of Contents**, restructure sections into:
   - Database Overview
   - ERD
   - Design Guidelines
   - Schema: Auth
   - Schema: Core
   - Schema: CMS
   - Enumerations & Shared Types
   - Performance & Indexing
3. Update **Table Design Guidelines**:
   - Change the naming convention: Tables no longer require the `vogelkop_` prefix. Instead, the schema acts as the namespace (e.g., `auth.users`, `core.conservation_areas`).
   - Column names must drop redundant prefixes (e.g., use `auth.users.email` instead of `auth.users.user_email`).
   - Specify **UUID v7** as the recommended format for primary keys. Since PostgreSQL lacks a native v7 generator, document that UUID generation should be handled at the application layer (Go) or via a custom PL/pgSQL function.
   - Expand the Audit Trails list to standardly include `created_by` and `updated_by` (UUIDs referencing `auth.users`) alongside `created_at`, `updated_at`, `deleted_at`, and `deleted_by`. Clarify that `is_active` boolean indicates suspension, whereas `deleted_at` signifies soft-delete.

## Task 2: Re-map Auth Schema
1. Restructure the **Authentication** section to be **Schema: Auth**.
2. Rename all tables by dropping the prefix and qualifying with schema:
   - `vogelkop_users` -> `auth.users`
   - `vogelkop_account` -> `auth.accounts`
   - `vogelkop_role` -> `auth.roles`
   - `vogelkop_session` -> `auth.sessions`
   - `vogelkop_verification_token` -> `auth.verification_tokens`
   - `vogelkop_activity_logs` -> `auth.activity_logs` (move from Core to Auth)
3. Ensure column names in these tables are simplified (e.g. `role_name` to `name`).
4. Include the standard audit columns across these tables.

## Task 3: Re-map Core Schema
1. Restructure the "Core Tables", "Data Domain Tables", and "Junction Tables" sections under a single **Schema: Core** umbrella.
2. Categorize them neatly (e.g., "Conservation Master", "Planning", "Recovery & Assessments", "Certification & Build-up", "Junctions").
3. Rename all tables to remove `vogelkop_` and add `core.` prefix:
   - `core.conservation_areas`
   - `core.legal_decisions`
   - `core.locations`
   - `core.functions`
   - `core.zoning_blocks`
   - `core.area_plannings`
   - `core.documents`
   - `core.ecosistem_recoveries`
   - `core.assessments`
   - `core.certificates_in_area`
   - `core.build_up_areas`
   - (And similarly rename all junction tables).
4. Simplify column prefixes inside Core tables (e.g. `area_name` -> `name`).
5. Update their foreign keys (e.g. references to `auth.users`).

## Task 4: Introduce CMS Schema
1. Add a brand new section: **Schema: CMS**.
2. Design a "Full CMS" to support the website backend securely:
   - **`cms.posts`**: `post_id` (PK UUID), `author_id` (FK to auth.users), `title` (String), `slug` (String, Unique), `content` (Text/Markdown), `excerpt` (Text), `published_at` (Timestamp, allows scheduling), `status` (Enum: draft, published, archived), `featured_image` (FK to cms.media), plus standard audit columns.
   - **`cms.categories`**: `category_id` (PK UUID), `name` (String), `slug` (String, Unique), `description` (Text), plus audit columns.
   - **`cms.tags`**: `tag_id` (PK UUID), `name` (String), `slug` (String, Unique).
   - **`cms.post_categories`**: Junction table (`post_id`, `category_id`).
   - **`cms.post_tags`**: Junction table (`post_id`, `tag_id`).
   - **`cms.media`**: `media_id` (PK UUID), `file_name` (String), `file_path` (String - path to S3/local storage), `file_type` (String), `file_size` (Int), `metadata` (JSONB for dims/alt text), `uploaded_by` (FK to auth.users), plus audit columns.

## Task 5: Refine Enumerations and Indexing
1. Move enumerations into a **Shared Types & Enumerations** section. Prefix ENUMs with `public.` schema so they are globally accessible across schemas without "type not found" errors.
2. Update the **Performance and Indexing** section SQL snippets to use the new schema prefixes (e.g., `CREATE INDEX idx_accounts_user_id ON auth.accounts(user_id);`).
3. Include new indices for the CMS (e.g., `CREATE UNIQUE INDEX idx_cms_posts_slug ON cms.posts(slug);`).
4. Mandate **GIST** indices for any PostGIS geometry columns in the `core` schema, and **GIN** indices for JSONB columns like `cms.media.metadata`.

## Final Verification Wave
- [x] Read `docs/database-design.md` completely.
- [x] Ensure NO table starts with `vogelkop_`.
- [x] Ensure all 3 schemas (`auth`, `core`, `cms`) are clearly isolated.
- [x] Check that `auth.users` is correctly referenced as the foreign key in `created_by` across the board.
