/**
 * @swagger
 * tags:
 *   - name: User
 *   - name: Sound
 *   - name: Like
 *   - name: Email
 *   - name: Token
 */
/**
 * @swagger
 *  paths:
 *    /api/user:
 *      post:
 *        tags:
 *        - "User"
 *        summary: "User registration"
 *        description: "The user registration API requires input for three parameters: user ID (email), password, and nickname."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        requestBody:
 *          description: "User data for registration"
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                required:
 *                  - accountEmail
 *                  - accountPw
 *                  - accountName
 *                properties:
 *                  accountEmail:
 *                    type: string
 *                    format: email
 *                  accountPw:
 *                    type: string
 *                  accountName:
 *                    type: string
 *        responses:
 *          200:
 *            description: "[Success]SignUp has been successfully completed"
 *          409:
 *            description: "[Error]User ID already exists, registration failed."
 *          500:
 *            description: "[Error]There is an issue with the server, registration failed."
 */
/**
 * @swagger
 *  paths:
 *    /api/user/login:
 *      post:
 *        tags:
 *        - "User"
 *        summary: "Login and receive a token"
 *        description: "Login API requires user's Email ID and password input."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        requestBody:
 *          description: "User data for login"
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                required:
 *                  - accountEmail
 *                  - accountPw
 *                properties:
 *                  accountEmail:
 *                    type: string
 *                    format: email
 *                  accountPw:
 *                    type: string
 *        responses:
 *          200:
 *            description: "[Complete] Login has been successfully completed."
 *          409:
 *            description: "[Error] Incorrect password, login failed."
 *          500:
 *            description: "[Error] There is an issue with the server, unable to login."
 */
/**
 * @swagger
 *  paths:
 *    /api/email/confirm:
 *      get:
 *        tags:
 *        - "Email"
 *        summary: "Can Confirm Email without email"
 *        description: "Confirm email without verifying Email."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "query"
 *          name: "email" 
 *          description: "Account email"
 *          required: true
 *          schema:
 *            type: string
 *            format: email
 *        responses:
 *          200:
 *            description: "[Complete] Confirm has been successfully completed."
 *          409:
 *            description: "[Error] Incorrect Email, Confirm failed."
 *          500:
 *            description: "[Error] There is an issue with the server, unable to Confirm."
 */
/**
 * @swagger
 *  paths:
 *    /api/token/test:
 *      get:
 *        tags:
 *        - "Token"
 *        summary: "Token Decode"
 *        description: "Token Decode API"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          required: true
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[완료]가입이 정상적으로 완료되었습니다."
 *          409:
 *            description: "[에러]사용자 아이디가 이미 존재하여 회원 가입이 실패하였습니다."
 *          500:
 *            description: "[에러]서버에 문제가 있어 회원 가입에 실패하였습니다."
 */
/**
 * @swagger
 *  paths:
 *    /api/user/profile:
 *      get:
 *        tags:
 *        - "User"
 *        summary: "Get User Profile by Token"
 *        description: "Get User Profile by Token API"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: header
 *          name: token
 *          description: "JWT Token"
 *          required: true
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[Success] User profile retrieved successfully."
 *          409:
 *            description: "[Error] Invalid or expired token, unable to retrieve user profile."
 *          500:
 *            description: "[Error] Internal server error while retrieving user profile."
 */
