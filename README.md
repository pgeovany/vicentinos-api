# Vicentinos API

Back-end system for managing food assistance operations for a **Vicentinos (Sociedade de São Vicente de Paulo)** group.

This API powers the full workflow of a real-world charitable operation, handling **assisted families, food stock, basket distribution, transparency, and historical tracking**, with a strong emphasis on **data integrity, traceability, and accountability**.

---

## 🧩 Context

At the parish near my home, members of the Vicentinos group:
- Collect food donations at every mass
- Assemble food baskets monthly
- Distribute them to assisted families
- Maintain strict records for transparency and responsibility

This system was built to **replace manual spreadsheets and notebooks** with a reliable, auditable digital platform.

It is **actively used in production**.

---

## 🚀 Features

### 👨‍👩‍👧 Assisted People Management
- Full registration (personal data, documents, dependents)
- Historical tracking of assistance received
- Search and advanced filtering

### 📦 Stock Management
- Control of ~10 food categories
- Entry and exit tracking
- Real-time stock availability
- Monthly usage history

### 🧺 Basket Management
- Basket composition
- Distribution records
- Assisted person ↔ basket relationship
- Monthly tracking

### 🔎 Transparency & Auditing
- **Extensive logging**
- Historical records of all operations
- Data exposed to public transparency endpoints
- Filtering by period and product

### 🔐 Security & Access Control
- JWT-based authentication
- Role-based authorization
- Protected admin operations

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

## 🧠 Architecture Highlights

- Modular NestJS architecture
- Clear separation of concerns (domains, services, controllers)
- Defensive data validation
- Explicit audit trails
- Database-first thinking (integrity & constraints)
- Production-oriented error handling and logging

---

## 🌍 Public Transparency Endpoints

The API powers public-facing transparency pages:

- 📦 Products transparency  
  👉 https://vicentinos.vercel.app/transparencia/produtos

- 📊 Statistics & distribution data  
  👉 https://vicentinos.vercel.app/transparencia/estatisticas

These endpoints exist to ensure **accountability to the community** and donors.

---

## 🧪 Documentation

- API documented using **Swagger / OpenAPI**
- Clear request/response contracts
- Designed for front-end and non-technical auditing use cases

---

## 📌 Status

✅ In production
🔁 Actively maintained
📈 Real users, real data, real impact

---

## 🤝 Motivation

This project combines **software engineering** with **social responsibility**.  
It was built not as a demo, but as a **tool people depend on every month**.
