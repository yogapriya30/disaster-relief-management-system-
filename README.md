
# Disaster Management & Relief Coordination System

> A full-stack platform to coordinate disasters, volunteers, relief camps, and resources in real time.

---

## 🔗 Live Demo & Video

- **Live Demo:** _Coming at Review-II (Day 41)_
- **Video Demo:** _Coming at Review-III (Day 60)_

---

## 📖 Overview

During a disaster, coordinating volunteers, relief camps, and resources across multiple agencies is often chaotic and manual. This system gives administrators and volunteers a single platform to register disasters, assign volunteers and resources to relief camps, track relief tasks, and send notifications — so that response efforts are faster and better organized.

---

## 🏗️ Architecture Diagram

![Architecture Diagram](docs/diagrams/architecture-diagram.png)

_See `/docs/diagrams/` for the full-resolution source file._

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (JavaScript) + Tailwind CSS + Axios |
| Backend Framework | FastAPI (Python 3.10+) |
| Auth | FastAPIUsers / python-jose (JWT) |
| ORM | SQLAlchemy |
| Database | PostgreSQL 15 |
| Testing | Pytest |
| API Docs | FastAPI built-in Swagger UI |
| CI/CD | GitHub Actions |
| Backend Hosting | Render / Railway |
| Frontend Hosting | Vercel / Netlify |
| DB Hosting | Railway / Clever Cloud / Aiven |

---

## ✨ Features

**Auth**
- User signup & login with JWT-based authentication
- Passwords hashed with bcrypt

**Disaster Management**
- Create, view, edit, delete disasters
- Filter disasters and view live metrics on the dashboard

**Volunteer Management**
- Register and manage volunteers _(backend ready, frontend UI in progress)_

**Relief Camp Management**
- Manage relief camps and their capacity _(backend ready, frontend UI in progress)_

**Resource Management**
- Track resource inventory across camps _(backend ready, frontend UI in progress)_

**Task Management**
- Assign and track relief tasks _(backend ready, frontend UI in progress)_

**Notifications**
- Notify volunteers/admins of key updates _(backend ready, frontend UI in progress)_

---

## 📸 Screenshots

| Login | Dashboard | Disasters |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 15

### Clone the repository
```bash
git clone https://github.com/yogapriya30/disaster-relief-management-system-.git
cd disaster-relief-management-system-
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # fill in your own values
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The backend runs at `http://localhost:8000` and the frontend at `http://localhost:5173` (adjust if different).

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Y |
| `SECRET_KEY` | JWT signing secret | Y |
| `ALGORITHM` | JWT algorithm (e.g. `HS256`) | Y |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | JWT expiry time | Y |
| `CORS_ORIGINS` | Allowed frontend origin(s) | Y |
| `VITE_API_BASE_URL` | Backend API URL (frontend) | Y |

---

## 📑 API Documentation

Interactive Swagger docs available at:
```
http://localhost:8000/docs
```
_(Live link will be added after Day 41 deployment.)_

---

## ✅ Running Tests

```bash
cd backend
pytest
```
_(Test suite is being built in Weeks 4–5 of the project.)_

---

## ☁️ Deployment

_To be completed by Day 41 (Review-II):_
- Backend → Render/Railway
- Frontend → Vercel/Netlify
- Database → Railway/Clever Cloud/Aiven
- CI/CD → GitHub Actions (auto build, test, deploy on push to `main`)

---

## 📁 Folder Structure

```
app/
 ├─ api/          # routers — thin, no business logic
 ├─ core/         # settings, security helpers
 ├─ models/       # SQLAlchemy models
 ├─ schemas/      # Pydantic schemas
 └─ services/     # business logic
tests/            # unit tests
docs/diagrams/    # architecture, ER, class diagrams
frontend/         # React app
.env.example
README.md
requirements.txt
```

---

## 🔮 Future Enhancements

- AI-based disaster severity prediction / resource-allocation recommendation (planned enhancement feature, Day 42–60)
- Role-based access control (Admin vs Volunteer)
- Real-time notifications via WebSockets

---

## 📄 License

MIT License

---

## 👤 Author

**Yogapriya B**
Semester 5 Capstone Project — 2025
GitHub: [yogapriya30](https://github.com/yogapriya30)