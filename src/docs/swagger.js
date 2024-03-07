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
 *        summary: "Can Confirm Email without verified email"
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
 *          description: "JWT Token"
 *          required: true
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "[Success] Token decoded successfully."
 *          500:
 *            description: "[Error] There was a problem with the server, and decoding the token failed."
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
/**
 * @swagger
 *  paths:
 *    /api/user/profile:
 *      patch:
 *        tags:
 *        - "User"
 *        summary: "Update Profile Img, name"
 *        description: "Update Profile API, Profile Img, Name"
 *        consumes:
 *        - "multipart/form-data"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "jwt Token"
 *          type: string
 *          required: true
 *          schema:
 *            type: string
 *        requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  userImg:
 *                    type: string
 *                    format: binary
 *                  accountName:
 *                    type: string
 *        responses:
 *          200:
 *            description: "[Success]Profile modification completed successfully."
 */
/**
 * @swagger
 *  paths:
 *    /api/sound:
 *      post:
 *        tags:
 *        - "Sound"
 *        summary: "File Upload API for Sound"
 *        description: "Sound File Upload API"
 *        consumes:
 *        - "multipart/form-data"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "JWT Token"
 *          required: true
 *          schema:
 *            type: string
 *        requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  userFile:
 *                    type: string
 *                    required: true
 *                    format: binary
 *                  soundName:
 *                    type: string
 *                    required: true
 *                  category:
 *                    type: string
 *                  tags:
 *                    type: array
 *                    required: true
 *                    items:
 *                      type: string
 *                    maxItems: 5
 *        responses:
 *          200:
 *            description: "[Success] File uploaded Complete"
 */
/**
 * @swagger
 *  paths:
 *    /api/sound:
 *      delete:
 *        tags:
 *        - "Sound"
 *        summary: "Delete Sound File"
 *        description: "Delete Sound file API"
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
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                required:
 *                  - soundId
 *                properties:
 *                  soundId:
 *                    type: string
 *        responses:
 *          200:
 *            description: "[Success] Delete Sound file is completed."
 */
/**
 * @swagger
 *  paths:
 *    /api/sound:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: "Get Sounds List"
 *        description: "Get Sounds List API"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "query"
 *          name: "page"
 *          schema:
 *            type: string

 *        responses:
 *          200:
 *            description: "result"
 */
/**
 * @swagger
 *  paths:
 *    /api/sound/my:
 *      get:
 *        tags:
 *        - "Sound"
 *        summary: "Get Sounds List"
 *        description: "Get Sounds List API"
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
 *        - in: "query"
 *          name: "page"
 *          schema:
 *            type: string
 *        responses:
 *          200:
 *            description: "result"
 */
/**
 * @swagger
 *  paths:
 *    /api/like:
 *      post:
 *        tags:
 *        - "Like"
 *        summary: "Like a sound"
 *        description: "Like a sound API"
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "header"
 *          name: "token"
 *          description: "JWT Token"
 *          required: true
 *          schema:
 *            type: string
 *        - in: "body"
 *          name: "soundId"
 *          description: "ID of the sound to like"
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              soundId:
 *                type: string
 *        responses:
 *          200:
 *            description: "[Success] Like action completed successfully"
 *          400:
 *            description: "[Error] Bad request"
 *          401:
 *            description: "[Error] Unauthorized, token not provided"
 *          500:
 *            description: "[Error] Internal server error"
 */