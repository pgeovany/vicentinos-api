# Vicentinos API

Back-end system for managing food assistance operations for a **Vicentinos (Sociedade de São Vicente de Paulo)** group.

This API supports the full operational workflow of a charitable organization, handling **donations, food stock, basket distribution, assisted families, emergency assistance (SOS), and public transparency**, with a strong emphasis on **data integrity, traceability, and accountability**.

---

## 🧩 Problem & Motivation

While volunteering with a local Vicentinos group at the parish near my home, I noticed that all operational data was managed manually — using notebooks and spreadsheets.

This included:
- Tracking food donations and their sources
- Managing stock levels
- Registering assisted families and their monthly baskets
- Handling emergency food requests (SOS)
- Maintaining historical records for transparency and accountability

This manual approach made it difficult to:
- Ensure data consistency and accuracy
- Track incoming and outgoing items reliably
- Audit operations over time
- Generate statistics and reports
- Scale or adapt workflows as the group grew

The goal of this project was to **digitize and centralize these processes**, replacing manual records with a reliable, auditable system that reflects real operational responsibilities and data sensitivity.

The API is **actively used in production** by the organization.

---

## 🏗️ Solution Overview

This repository contains the **backend API** responsible for:
- Authentication and role-based authorization
- Business rules and validations
- Donation, stock, and distribution workflows
- Assisted family lifecycle management
- Audit logging and transparency endpoints

The system is designed with a **backend-first, domain-oriented approach**, exposing RESTful endpoints consumed by a separate frontend application.

---

## 🚀 Features

### 🎁 Donations Management
- Registration of received donations
- Donation sources (e.g. Sunday mass, Saturday mass, punctual donations)
- Products and quantities per donation
- Filtering by date and source
- Donation statistics and aggregates

### 📊 Statistics & Reporting
- Total donations over time
- Average items per donation
- Distribution per donation source
- Period-based and source-based filtering
- Operational metrics for transparency and planning

### 📦 Stock Management
- Product registration and lifecycle
- Entry and exit tracking
- Real-time stock availability
- Monthly usage history
- Consistency checks between donations, stock, and distributions

### 🧺 Basket Management
- Basket sizes (P, M, G)
- Configurable basket composition
- Product quantity per basket
- Monthly basket distribution tracking
- Assisted family ↔ basket relationship

### 🚨 Emergency Assistance (SOS)
- Outgoing food distribution outside the regular assisted list
- Registration of SOS requests
- Product and quantity tracking
- Historical records of emergency assistance

### 👨‍👩‍👧 Assisted People Management
- Full registration (personal data, documents, dependents)
- Assignment of basket size
- Editing and updating detailed personal information
- Soft removal with historical reason tracking
- Simple reactivation of previously assisted families
- Search and advanced filtering

### 🔎 Transparency & Auditing
- Extensive logging of all operations
- Historical records of donations, distributions, and changes
- Public transparency endpoints
- Filtering by period, product, and source

### 🔐 Security & Access Control
- JWT-based authentication
- Role-based authorization
- Protected administrative operations

---

## 🧠 Architecture Highlights

- Modular NestJS architecture
- Clear separation of concerns (domains, services, controllers)
- Defensive data validation
- Explicit audit trails for all critical operations
- Database-first thinking (constraints, integrity, consistency)
- Production-oriented error handling and logging

---

## 🛠️ Tech Stack

- **Node.js**
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM**
- **Redis**
- **JWT Authentication**
- **Swagger / OpenAPI**

---

## 🌍 Public Transparency Endpoints

The API powers public-facing transparency pages to ensure **accountability to the community and donors**:

- 📦 Products transparency  
  - https://vicentinos.vercel.app/transparencia/produtos

- 📊 Statistics & distribution data  
  - https://vicentinos.vercel.app/transparencia/estatisticas

---

## 🧪 Documentation

- API documented using **Swagger / OpenAPI**
- Clear request/response contracts
- Designed to support frontend clients and non-technical auditing needs

---

## 📌 Status

✅ In production  
🔁 Actively maintained  
📈 Real users, real data, real operational impact  
