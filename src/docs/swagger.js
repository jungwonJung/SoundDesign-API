/**
 * @swagger
 * tags:
 *   - name: Account
 *   - name: Sound
 *   - name: Like
 */
/**
 * @swagger
 *  paths:
 *    /api/user:
 *      post:
 *        tags:
 *        - "Account"
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
 *        - "Account"
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
