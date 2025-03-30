const express = require("express");
const userController = require("../controllers/users.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const auth = require("../middlewares/authMiddleware");
const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/users", router);

  // /**
  //  * @swagger
  //  * /api/v1/users:
  //  *  get:
  //  *    summary: Get users by filter
  //  *    description: Get users by filter
  //  *    parameters:
  //  *      - in: query
  //  *        name: user_username
  //  *        schema:
  //  *          type: string
  //  *        description: Filter by username
  //  *      - in: query
  //  *        name: user_email
  //  *        schema:
  //  *          type: string
  //  *        description: Filter by email
  //  *      - in: query
  //  *        name: user_phone
  //  *        schema:
  //  *          type: string
  //  *        description: Filter by phone number
  //  *      - $ref: '#/components/parameters/limitParam'
  //  *      - $ref: '#/components/parameters/pageParam'
  //  *    tags:
  //  *      - users
  //  *    responses:
  //  *      200:
  //  *        description: A list of users
  //  *        content:
  //  *          application/json:
  //  *            schema:
  //  *              type: object
  //  *              properties:
  //  *                status:
  //  *                  type: string
  //  *                  description: The response status
  //  *                  enum: [success]
  //  *                data:
  //  *                  type: object
  //  *                  properties:
  //  *                    users:
  //  *                      type: array
  //  *                      items:
  //  *                        $ref: '#/components/schemas/User'
  //  *                    metadata:
  //  *                      $ref: '#/components/schemas/PaginationMetadata'
  //  */
  /**
   * @swagger
   * /api/v1/users:
   *  get:
   *    summary: Get users by filter
   *    description: Get users by filter
   *    parameters:
   *      - in: query
   *        name: user_username
   *        schema:
   *          type: string
   *        description: Filter by username
   *      - in: query
   *        name: user_email
   *        schema:
   *          type: string
   *        description: Filter by email
   *      - in: query
   *        name: user_phone
   *        schema:
   *          type: string
   *        description: Filter by phone number
   *      - in: query
   *        name: user_role
   *        schema:
   *          type: integer
   *          enum: [1, 2]
   *        description: Filter by user role (1 for admin, 2 for regular user)
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - users
   *    responses:
   *      200:
   *        description: A list of users
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    users:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/User'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/", auth, userController.getUsersByFilter);

  /**
   * @swagger
   * /api/v1/users:
   *  post:
   *    summary: Create a new user
   *    description: Create a new user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              user_username:
   *                type: string
   *                description: User username
   *              user_password:
   *                type: string
   *                description: User password
   *              user_email:
   *                type: string
   *                description: User email
   *              user_name:
   *                type: string
   *                description: User name
   *              gender_id:
   *                type: integer
   *                description: Gender ID
   *              user_phone:
   *                type: string
   *                description: User phone number
   *              user_address_id:
   *                type: integer
   *                description: Address ID
   *              user_role:
   *                type: integer
   *                description: User role
   *    tags:
   *      - users
   *    responses:
   *      201:
   *        description: A new user has been created
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    user:
   *                      $ref: '#/components/schemas/User'
   */
  router.post("/", userController.createUser);

  /**
   * @swagger
   *  /api/v1/users:
   *    delete:
   *      summary: Delete all users
   *      description: Delete all users
   *      tags:
   *        - users
   *      responses:
   *        200:
   *          description: All users deleted
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  message:
   *                    type: string
   *                    description: Confirmation message
   *                    example: All users have been deleted
   */
  router.delete("/", auth, userController.deleteAllUsers);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/users/{user_id}:
   *    get:
   *      summary: Get user by user_id
   *      description: Get user by user_id
   *      parameters:
   *        - name: user_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the user
   *      tags:
   *        - users
   *      responses:
   *        200:
   *          description: A user
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                    description: The response status
   *                    enum: [success]
   *                  data:
   *                    type: object
   *                    properties:
   *                      user:
   *                        $ref: '#/components/schemas/User'
   */
  router.get("/:user_id", auth, userController.getUser);

  /**
   * @swagger
   * /api/v1/users/{user_id}:
   *   put:
   *     summary: Update user by ID
   *     description: Update a user by ID
   *     parameters:
   *       - in: path
   *         name: user_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user_username:
   *                 type: string
   *                 description: User username
   *               user_email:
   *                 type: string
   *                 description: User email
   *               user_name:
   *                 type: string
   *                 description: User name
   *               gender_id:
   *                 type: integer
   *                 description: Gender ID
   *               user_phone:
   *                 type: string
   *                 description: User phone number
   *               user_address_id:
   *                 type: integer
   *                 description: Address ID
   *               user_role:
   *                 type: integer
   *                 description: User role
   *     tags:
   *       - users
   *     responses:
   *       200:
   *         description: The updated user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       $ref: '#/components/schemas/User'
   */
  router.put("/:user_id", auth, userController.updateUser);

  /**
   * @swagger
   *   /api/v1/users/{user_id}:
   *     delete:
   *       summary: Delete user by ID
   *       description: Delete user by ID
   *       parameters:
   *         - in: path
   *           name: user_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the user to delete
   *       tags:
   *         - users
   *       responses:
   *         200:
   *           description: User deleted
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   status:
   *                     type: string
   *                     description: The response status
   *                     enum: [success]
   *                   message:
   *                     type: string
   *                     description: Confirmation message
   *                     example: User has been deleted
   */
  router.delete("/:user_id", auth, userController.deleteUser);
  // router.all("/:user_id", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/users/login:
   *  post:
   *    summary: Login a user
   *    description: Authenticate user credentials
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              user_username:
   *                type: string
   *                description: User's username
   *              user_password:
   *                type: string
   *                description: User's password
   *    tags:
   *      - users
   *    responses:
   *      200:
   *        description: Login successful
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  description: The response status
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    message:
   *                      type: string
   *                    user:
   *                      $ref: '#/components/schemas/User'
   */
  router.post("/login", userController.loginUser);
};