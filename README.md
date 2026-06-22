# VerisqAI

AI-Powered Third Party Risk Management (TPRM) Platform

## Overview
VerisqAI is a full-stack web application designed to streamline Third Party Risk Management workflows through vendor assessments, questionnaire automation, AI-assisted analysis, risk scoring, findings generation, and risk recommendations.

The platform enables organizations to assess vendor security posture, automate assessment workflows, and generate actionable risk insights.

---

## Live Demo
Frontend: https://verisq-ai-full-git-postgres-migration-pkrishna111s-projects.vercel.app

Backend API: https://verisqai-api.onrender.com

Swagger: https://verisqai-api.onrender.com/swagger

---

## Technology Stack

### Fronten
* React
* Vite
* JavaScript
* React Router
* CSS

### Backend
* ASP.NET Core 8 Web API
* Entity Framework Core
* ASP.NET Core Identity
* JWT Authentication

### Database
* PostgreSQL
* Supabase

### Hosting
* Vercel (Frontend)
* Render (Backend API)

### AI Integration
* OpenRouter
* AI Assessment Service
* AI Risk Findings
* AI Recommendations

---

## Features

### Authentication
* User Registration
* Admin Approval Workflow
* OTP-Based Login
* JWT Authentication
* Protected Routes

### Vendor Management
* Create Vendors
* Vendor Details
* Vendor Tracking

### Assessment Templates
* Create Templates
* Edit Templates
* Duplicate Templates
* Delete Templates

### Assessment Sections
* Create Sections
* Edit Sections
* Duplicate Sections
* Delete Sections

### Question Types
* Yes/No
* Text
* Dropdown
* Multi Select
* Number

### Questionnaire Workflow
* Send Assessment Requests
* Public Vendor Assessment Link
* Assessment Submission
* Assessment History

### AI Features
* AI Assessment Analysis
* Risk Findings Generation
* Risk Recommendations
* Risk Insights

### Reporting
* Scorecards
* Assessment History
* Dashboard Analytics
* Vendor Risk Overview

### Administration
* User Management
* Vendor Management
* AI Monitoring
* Audit Logs

---

## Database Migration Journey
Project Evolution:
1. EF Core InMemory Database
2. SQL Server
3. PostgreSQL (Supabase)

Current Database: PostgreSQL hosted on Supabase

---

## Deployment Architecture
Frontend: React + Vite >>> Vercel

Backend: ASP.NET Core 8 API >>> Render

Database: PostgreSQL >>> Supabase

AI: OpenRouter

---

## Email Service
Current Provider: Resend

Reason: Render environment was unable to establish SMTP connectivity with Gmail SMTP servers.

Resend was integrated to support OTP delivery and platform notifications.

### Current Limitation
The project currently uses Resend's testing environment.

Because of Resend sandbox restrictions, OTP emails can only be delivered to the verified email address associated with the Resend account.

Current verified email: [krishna.lidolearning.02@gmail.com]

Attempting to send OTPs to other email addresses will fail unless a custom domain is verified within Resend.

### Demo Credentials

For project demonstration and evaluation, use:

Admin Email: [krishna.lidolearning.02@gmail.com]

OTPs will be delivered to this address.

---

## Project Status
### Completed
* Frontend Deployment
* Backend Deployment
* PostgreSQL Migration
* Supabase Integration
* JWT Authentication
* OTP Login
* Admin Approval Workflow
* Questionnaire Workflow
* AI Integration
* Dashboard
* Scorecards
* Findings
* Recommendations

---

## Future Improvements
* Custom Email Domain Integration
* Production Email Delivery
* Advanced Reporting
* Multi-Tenant Support
* Enhanced AI Risk Analysis
* Vendor Collaboration Portal

---

## Author: Krishna Parekh
MSc ICT, JP Dawer Institute of Information and Communication Technology

Email: [krishna.lidolearning.02@gmail.com]

GitHub: 

---

## License
Academic Project / Educational Use

Kyara Infotech, Surat

Visit: kyarainfotech.com
