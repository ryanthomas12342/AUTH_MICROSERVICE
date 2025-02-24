This is the Authentication Microservice using AWS Cognito and DynamoDB for user login and session management.

🚀 Features
User registration and login via AWS Cognito
JWT token generation and verification
Session storage and expiration management via AWS DynamoDB
🛠 Setup Instructions
1️⃣ Clone the repository

sh
Copy
Edit
git clone <repo-url>
cd auth
2️⃣ Install dependencies

sh
Copy
Edit
npm install
3️⃣ Set up environment variables (.env)

env
Copy
Edit
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_CLIENT_ID=your_client_id
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
DYNAMODB_SESSION_TABLE=UserSessions
4️⃣ Run the service

sh
Copy
Edit
npm start
📡 API Endpoints
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Login and get JWT token
POST	/verify	Verify JWT token
