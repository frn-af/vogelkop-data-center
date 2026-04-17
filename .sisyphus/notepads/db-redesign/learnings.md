## [2026-04-17T02:01:53Z] Task: db-redesign
- Summary: Completed end-to-end planning for multi-schema PostgreSQL design (auth/core/cms). All decisions captured in final plan; plan state updated and committed.
- Key learnings:
  - Plan stabilized around 3 schemas with per-schema namespaces; ensured audit columns and UUIDv7 alignment; CMS schema expanded to posts/categories/tags/media.
  - Prefer dropping table prefixes in favor of schema namespaces to maintain readable SQL and cleaner code.
  - UUIDv7 generation should be handled at application layer or via a small function due to lack of native generator in PostgreSQL.
  - Cross-schema FK references should be carefully defined; consider a shared audit or public schema for ENUMs to avoid type-not-found issues.
  - CMS design now includes media with metadata JSONB to store dimensions, alt text, and other attributes.
- Indices: plan includes indices for slug uniqueness and foreign keys; also notes need for PostGIS GIST indexing for geometry if added later; JSONB indices for media.metadata.

-## [2026-04-17T02:40:00Z] Task: Per-schema docs draft
- Summary: Began drafting a formal per-schema documentation structure for Auth, Core, and CMS in docs/database-design.md.
- Next steps: Populate with explicit table definitions, relationships, and cross-schema mappings; define UUID generation approach and audit columns; plan indexing strategy per schema.

## [2026-04-17T03:20:00Z] Task: Progress tracking
- Summary: Drafted per-schema documentation skeleton with plan to fill in concrete DDL and constraints. Next steps: populate detailed fields and constraints in docs/database-design.md, and prepare migration plan.
