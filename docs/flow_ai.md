Here's a **complete project folder structure** for a **Next.js frontend** and a **Node.js backend**, with a professional architecture that supports:

* Decoupled microservices
* Multiple queues (Kafka, RabbitMQ)
* Payment gateways (Stripe, Razorpay)
* Docker support
* `.env` configs
* Proper `lib`, `services`, `validators`, and `schemas`
* Modern practices for maintainability and scalability

---

## ✅ Final Project Layout

```
job-portal/
├── frontend/                # Next.js app (job portal UI)
│   └── [Next.js structure - shown below]
├── backend/                 # Node.js app (Express or NestJS)
│   └── [Node.js structure - shown below]
├── docker/                  # Docker related files
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   ├── nginx.conf
│   └── docker-compose.yml
├── .env                    # Root env file (optional)
└── README.md
```

---

## 🎯 1. `frontend/` – Next.js Project Structure

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx             # Landing Page
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── job-seeker/
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Job Seeker Dashboard
│   │   ├── recommended-jobs/page.tsx
│   │   ├── inbox/page.tsx
│   │   ├── saved-jobs/page.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── [section]/page.tsx
│   │   ├── applications/history/page.tsx
│   │   ├── search/[query]/page.tsx
│   │   └── job/[jobId]/page.tsx
│   ├── recruiter/
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Recruiter Dashboard
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── post-job/page.tsx
│   │   ├── search-resume/page.tsx
│   │   └── buy-database/page.tsx
│
├── components/              # Shared React components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── JobCard.tsx
│   ├── ProfileForm.tsx
│   └── PaymentForm.tsx
│
├── lib/
│   ├── api/
│   │   ├── jobSeeker/
│   │   ├── recruiter/
│   │   └── auth.ts
│   └── utils/
│       ├── fetcher.ts
│       ├── constants.ts
│       └── validator.ts
│
├── services/
│   ├── jobSeeker/
│   ├── recruiter/
│   └── payment/
│       └── stripe.ts
│
├── styles/
│   └── globals.css
├── public/
│   └── assets/
│       ├── images/
│       └── icons/
├── middleware.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 2. `backend/` – Node.js API Structure (Microservice Ready)

**Framework:** Express (you can replace with NestJS if preferred)

```
backend/
├── src/
│   ├── app.ts                # Express entry point
│   ├── server.ts             # HTTP Server + Queue Consumers
│
│   ├── config/               # Env, DB, Stripe config, etc
│   │   ├── index.ts
│   │   ├── kafka.ts
│   │   ├── rabbitmq.ts
│   │   └── stripe.ts
│
│   ├── routes/               # All Express routes
│   │   ├── jobSeeker/
│   │   ├── recruiter/
│   │   ├── payments/
│   │   └── auth/
│
│   ├── controllers/          # Business logic
│   │   ├── jobSeeker/
│   │   ├── recruiter/
│   │   ├── payments/
│   │   └── auth/
│
│   ├── services/             # Core services (DB + 3rd party)
│   │   ├── kafka/
│   │   ├── rabbitmq/
│   │   ├── stripe.ts
│   │   ├── userService.ts
│   │   └── jobService.ts
│
│   ├── producers/            # Queue producers
│   │   ├── kafka/
│   │   └── rabbitmq/
│
│   ├── consumers/            # Queue consumers
│   │   ├── kafka/
│   │   └── rabbitmq/
│
│   ├── models/               # DB Models
│   │   ├── User.ts
│   │   ├── Job.ts
│   │   └── Application.ts
│
│   ├── middlewares/          # Auth, errors, validators
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── validateRequest.ts
│
│   ├── schemas/              # Zod / Joi validation schemas
│   │   ├── jobSchema.ts
│   │   ├── authSchema.ts
│   │   └── paymentSchema.ts
│
│   ├── utils/                # Utility helpers
│   │   ├── logger.ts
│   │   ├── asyncHandler.ts
│   │   └── constants.ts
│
│   └── types/                # Global TS types
│       ├── index.d.ts
│       └── job.d.ts
│
├── tests/                    # Unit & integration tests
│   ├── job.test.ts
│   └── auth.test.ts
│
├── prisma/                   # If using Prisma ORM
│   ├── schema.prisma
│   └── seed.ts
├── .env
├── package.json
├── tsconfig.json
└── nodemon.json
```

---

## 🐳 Docker + Compose Example

**docker/docker-compose.yml**

```yaml
version: "3.8"
services:
  frontend:
    build:
      context: ../frontend
      dockerfile: ../docker/frontend.Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000

  backend:
    build:
      context: ../backend
      dockerfile: ../docker/backend.Dockerfile
    ports:
      - "4000:4000"
    env_file:
      - ../backend/.env

  kafka:
    image: bitnami/kafka:latest
    ports:
      - "9092:9092"

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```

---

## 📦 Environment Variable Samples

**frontend/.env**

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**backend/.env**

```
PORT=4000
DATABASE_URL=postgres://user:pass@db:5432/jobportal
KAFKA_BROKER=localhost:9092
RABBITMQ_URL=amqp://localhost
STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxxx
```

---

## 📘 Tech Stack Summary

| Layer      | Tech                                 |
| ---------- | ------------------------------------ |
| Frontend   | Next.js (App Router), Tailwind (opt) |
| Backend    | Express (or NestJS), TypeScript      |
| ORM        | Prisma / Sequelize / Mongoose        |
| Validation | Zod / Joi                            |
| Messaging  | Kafka + RabbitMQ                     |
| Payments   | Stripe + Razorpay                    |
| Auth       | JWT / OAuth                          |
| Infra      | Docker + Docker Compose              |
| CI/CD      | GitHub Actions / GitLab / Vercel     |

---

If you want, I can:

* Generate example files (e.g., Stripe integration, Kafka consumer)
* Help you with Dockerfiles or CI setup
* Convert backend to NestJS architecture

Would you like any of those next?
