# Microservices mit Docker Compose

Dieses Projekt enthält:
- Product Service (Port 3001)
- User Service (Port 3002)
- Order Service (Port 3003)
- API Gateway (Port 3000)

Jeder Service läuft in einem eigenen Container – mit Health-Checks.

**Starten:**
```bash
docker-compose up --build
```

**Prüfen:**
- API Gateway: http://localhost:3000
- Product Service: http://localhost:3001
- User Service: http://localhost:3002
- Order Service: http://localhost:3003
