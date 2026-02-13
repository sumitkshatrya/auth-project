🔐 Node.js Auth Flow — Session + OTP + JWT

A secure authentication backend built with Node.js, Express.js, express-session, OTP verification, and JWT.

This project demonstrates a real-world hybrid auth flow:

✅ Login → Session Created
✅ OTP Verification → Session Validated
✅ Exchange Session → JWT Access Token
✅ Access Protected Routes with Token

🚀 Tech Stack

Node.js

Express.js

express-session

JSON Web Token (JWT)

Nodemon

dotenv

📁 Project Structure
auth-project/
│
├── server.js
├── routes/
│   └── auth.routes.js
├── middleware/
│   └── auth.middleware.js
├── utils/
│   └── generateOTP.js
├── .env
└── package.json

⚙️ Installation & Setup
1️⃣ Clone Project
git clone <repo-url>
cd auth-project

2️⃣ Install Dependencies
npm install

3️⃣ Create .env
PORT=5000
SESSION_SECRET=mysessionsecret
JWT_SECRET=myjwtsecret

4️⃣ Run Server
npm run dev


Server will start on:

http://localhost:5000

🔄 Authentication Flow
1️⃣ Login (Create Session + OTP)
POST /auth/login


Body:

{
  "email": "test@test.com",
  "password": "123456"
}


Response:

{
  "message": "OTP sent",
  "sessionId": "..."
}


Server Console:

Generated OTP: 839201

2️⃣ Verify OTP
POST /auth/verify-otp


Body:

{
  "otp": "839201"
}


Response:

OTP verified successfully


⚠️ Session cookie must be sent automatically by browser/Postman.

3️⃣ Exchange Session for JWT
POST /auth/token


Response:

{
  "accessToken": "JWT_TOKEN"
}

4️⃣ Access Protected Route
GET /auth/protected


Headers:

Authorization: Bearer JWT_TOKEN


Response:

{
  "message": "Protected route accessed"
}

🧪 Testing with Postman / Thunder Client
Endpoint	Method
/auth/login	POST
/auth/verify-otp	POST
/auth/token	POST
/auth/protected	GET

⚠️ Using GET instead of POST will return 404 Not Found.

🧠 Debugging Guide (Senior Developer Tips)
🔍 Check DevTools → Network Tab

Verify:

Request Method (POST vs GET)

Cookies present

Authorization header

🖥 Check Server Logs

Add logs:

console.log(req.session);


If session is missing:

Cookie not sent

Wrong client request

❌ Common Issues
404 on /auth/login

Cause:

GET request sent instead of POST


Fix:

Use POST method

OTP Always Invalid

Cause:

Session lost between requests


Fix:

Enable cookies

Use same client session

Protected Route 403

Cause:

Missing Bearer token


Fix:

Authorization: Bearer TOKEN

🔐 Security Notes

Production improvements:

Use HTTPS (secure: true)

Store sessions in Redis

Hash passwords (bcrypt)

Rate limit login attempts

Add refresh tokens

📌 Learning Goals

This project teaches:

Session-based authentication

OTP verification flow

JWT authorization

Middleware protection

Real backend debugging
