const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin, validateGetItem } = require("../validators/usersValidator");
const { registerUser, loginUser, updateUser, deleteUser, getUsersEmails } = require("../controllers/usersController");
const { authMiddleware, comercioMiddleware } = require("../middleware/session");

/**
 * @openapi
 * /api/users/emails:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get users emails
 *      description: Get the emails of the users that can receive offers and are interested in the commerce's activity
 *      responses:
 *          '200':
 *              description: Returns the updated user
 *          '404':
 *              description: The commerce doesn't have a web error
 *          '500':
 *              description: Get users emails error
 *      security:
 *          - bearerAuth: []
 */
router.get("/emails", comercioMiddleware, getUsersEmails);

/**
 * @openapi
 * /api/users/register:
 *  post:
 *      tags:
 *      - Users
 *      summary: "User register"
 *      description: Register a new user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the newly registered user
 *          '500':
 *              description: Register error
 */
router.post("/register", validateRegister, registerUser);

/**
 * @openapi
 * /api/users/login:
 *  post:
 *      tags:
 *      - Users
 *      summary: Login user
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns information of the logged user
 *          '403':
 *              description: Incorrect password error
 *          '404':
 *              description: User not found error
 *          '500':
 *              description: Login error
 */
router.post("/login", validateLogin, loginUser);

/**
 * @openapi
 * /api/users/{id}:
 *  patch:
 *      tags:
 *      - Users
 *      summary: Update user
 *      description: Update a user by themselves
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the user to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the updated user
 *          '403':
 *              description: Authorization error
 *          '500':
 *              description: Update user error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id", authMiddleware, validateGetItem, updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags:
 *      - Users
 *      summary: Delete user
 *      description: Delete a user by themselves
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the user to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns a confirmation
 *          '403':
 *              description: Authorizarion error
 *          '500': 
 *              description: Delete user error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authMiddleware, validateGetItem, deleteUser);

module.exports = router;