<div align="center">

# 🗄️ Vogelkop Data Center Database Design

**Comprehensive database architecture for conservation area management**

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-Enabled-4CAF50?style=flat-square&logo=leaflet&logoColor=white)](https://postgis.net/)

---

**Document Version:** `3.0` • **Last Updated:** 18 April 2026

</div>

---

## 📑 Table of Contents

|  #  | Section                                              | Description                      |
| :-: | ---------------------------------------------------- | -------------------------------- |
|  1  | [Database Overview](#-database-overview)             | System purpose and key features  |
|  2  | [Design Guidelines](#-design-guidelines)             | Naming conventions and standards |
|  3  | [Auth Schema](#-auth-schema)                         | Authentication and Authorization |
|  4  | [Core Schema](#-core-schema)                         | Conservation and Domain Data     |
|  5  | [CMS Schema](#-cms-schema)                           | Content Management System        |
|  6  | [Shared Enumerations](#-shared-enumerations)         | Common value types               |
|  7  | [Performance & Indexing](#-performance-and-indexing) | Optimization strategies          |
|  8  | [Data Mapping](#-data-mapping)                       | Legacy to Per-Schema mapping     |

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

## 📐 Design Guidelines

### 1️⃣ Naming Conventions

- **Schemas**: Use logical namespaces (`auth`, `core`, `cms`).
- **Tables**: No prefixes (e.g., `users` instead of `vogelkop_users`).
- **Columns**: Snake case, descriptive (e.g., `email`, `created_at`).

### 2️⃣ Primary Keys

- All Primary Keys must use **UUIDv7** (Universally Unique Identifier) for time-ordered indexing.
- Generation occurs in the application layer (Go).

### 3️⃣ Audit Trails

Every table must include these standard metadata columns:

| Column       | Type                 | Purpose                               |
| ------------ | -------------------- | ------------------------------------- |
| `created_at` | Timestamp            | Record creation time                  |
| `updated_at` | Timestamp            | Last modification time                |
| `deleted_at` | Timestamp (Nullable) | Soft-delete timestamp                 |
| `is_active`  | Boolean              | Record availability (default: `true`) |
| `created_by` | UUID (Nullable)      | User who created the record           |
| `updated_by` | UUID (Nullable)      | User who last updated the record      |
| `deleted_by` | UUID (Nullable)      | User who performed soft delete        |

---

## 🔐 Auth Schema

Authentication and authorization management.

### Tables

- **`auth.users`**: Primary user accounts.
- **`auth.accounts`**: OAuth/External provider links.
- **`auth.roles`**: RBAC roles and permissions.
- **`auth.sessions`**: Active user sessions.
- **`auth.verification_tokens`**: Email/OTP verification tokens.
- **`auth.activity_logs`**: Security and audit logs.

### Relationships

- `auth.accounts` -> `auth.users` (Many-to-One)
- `auth.sessions` -> `auth.users` (Many-to-One)
- `auth.users` -> `auth.roles` (Many-to-One)

---

## 🏛️ Core Schema

Conservation areas, legal decisions, and domain-specific data.

### Tables

- **`core.conservation_areas`**: Master table for conservation areas.
- **`core.legal_decisions`**: Legal frameworks and decrees.
- **`core.locations`**: Regency and province mapping.
- **`core.functions`**: Area functions (e.g., Nature Reserve).
- **`core.zoning_blocks`**: Zoning and block management.
- **`core.area_plannings`**: Management plans (RPJP/RPJPn).
- **`core.documents`**: Document repository for areas.
- **`core.ecosistem_recoveries`**: Ecosystem restoration tracking.
- **`core.assessments`**: METT/RAPP assessments.
- **`core.certificates_in_area`**: Land tenure and certification.
- **`core.build_up_areas`**: Human settlements and infrastructure.

### Junctions

- **`core.area_decisions`**: Links areas to legal decisions.
- **`core.area_locations`**: Links areas to administrative locations.
- **`core.area_functions`**: Links areas to their functions.

---

## 📝 CMS Schema

Content management for posts, categories, and media.

### Tables

- **`cms.posts`**: Blog posts and articles.
- **`cms.categories`**: Post categories.
- **`cms.tags`**: Post tags.
- **`cms.media`**: Media library (images, documents).

### Junctions

- **`cms.post_categories`**: Many-to-Many link for posts and categories.
- **`cms.post_tags`**: Many-to-Many link for posts and tags.

### Relationships

- `cms.posts` -> `auth.users` (Author)
- `cms.media` -> `auth.users` (Uploader)

---

## 🏷️ Shared Enumerations

Common types used across schemas.

- `post_status`: `draft`, `published`, `archived`
- `plan_status`: `active`, `revision`, `complete`
- `block_type`: `protection`, `utilization`, `rehabilitation`, etc.

---

## ⚡ Performance & Indexing

- **Unique Indexes**: `auth.users(email)`, `cms.posts(slug)`.
- **Foreign Keys**: All FK columns must be indexed.
- **JSONB**: GIN indexes for `cms.media(metadata)` and `auth.roles(permissions)`.
- **Spatial**: GIST indexes for PostGIS geometry columns (future).

---

## 🔄 Data Mapping

| Legacy Table (`public.vogelkop_*`) | New Schema & Table (`schema.table`) |
| :--------------------------------- | :---------------------------------- |
| `vogelkop_users`                   | `auth.users`                        |
| `vogelkop_account`                 | `auth.accounts`                     |
| `vogelkop_role`                    | `auth.roles`                        |
| `vogelkop_conservation_areas`      | `core.conservation_areas`           |
| `vogelkop_legal_decisions`         | `core.legal_decisions`              |
| *(New)*                            | `cms.posts`                         |
| *(New)*                            | `cms.media`                         |

---

<div align="center">

**Vogelkop Data Center** • Database Design Document

_Balai Besar KSDA Papua Barat Daya_

</div>
