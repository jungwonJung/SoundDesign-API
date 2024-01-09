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
 *    /api/create/account:
 *      post:
 *        tags:
 *        - "Account"
 *        summary: ""
 *        description: "The user registration API requires input for three parameters: user ID (email), password, and nickname."
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "data"
 *          description: ""
 *          properties:
 *              accountEmail:
 *                  type: string
 *                  required: true
 *              accountPw:
 *                  type: string
 *                  required: true
 *              accountName:
 *                  type: string
 *                  required: true
 *        responses:
 *          200:
 *            description: "[Success]SignUp has been successfully completed"
 *          409:
 *            description: "[Error]User ID already exists, registration failed."
 *          500:
 *            description: "[Error]There is an issue with the server, registration failed."
 */
