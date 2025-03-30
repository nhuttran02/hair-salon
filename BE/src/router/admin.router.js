const express = require("express");
const adminController = require("../controllers/admin.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/admins", router);

  /**
   * @swagger
   * /api/v1/admins:
   *  get:
   *    summary: Get admins by filter
   *    description: Get admins by filter
   *    parameters:
   *      - in: query
   *        name: ad_username
   *        schema:
   *          type: string
   *        description: Filter by admin username
   *      - in: query
   *        name: ad_name
   *        schema:
   *          type: string
   *        description: Filter by admin name
   *      - in: query
   *        name: ad_gender
   *        schema:
   *          type: string
   *          enum: [male, female]
   *        description: Filter by gender
   *      - in: query
   *        name: ad_phone
   *        schema:
   *          type: string
   *        description: Filter by phone number
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - admins
   *    responses:
   *      200:
   *        description: A list of admins
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
   *                    admins:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Admin'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/", adminController.getAdminsByFilter);

  /**
   * @swagger
   * /api/v1/admins:
   *  post:
   *    summary: Create a new admin
   *    description: Create a new admin
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              ad_username:
   *                type: string
   *                description: Admin username
   *              ad_password:
   *                type: string
   *                description: Admin password
   *              ad_name:
   *                type: string
   *                description: Admin name
   *              ad_gender:
   *                type: string
   *                enum: [male, female]
   *                description: Admin gender
   *              ad_phone:
   *                type: string
   *                description: Admin phone number
   *              ad_address:
   *                type: string
   *                description: Admin address
   *    tags:
   *      - admins
   *    responses:
   *      201:
   *        description: A new admin has been created
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
   *                    admin:
   *                      $ref: '#/components/schemas/Admin'
   */
  router.post("/", adminController.createAdmin);

  /**
   * @swagger
   *  /api/v1/admins:
   *    delete:
   *      summary: Delete all admins
   *      description: Delete all admins
   *      tags:
   *        - admins
   *      responses:
   *        200:
   *          description: All admins deleted
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
   *                    example: All admins have been deleted
   */
  router.delete("/", adminController.deleteAllAdmins);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/admins/{ad_id}:
   *    get:
   *      summary: Get admin by ad_id
   *      description: Get admin by ad_id
   *      parameters:
   *        - name: ad_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the admin
   *      tags:
   *        - admins
   *      responses:
   *        200:
   *          description: An admin
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
   *                      admin:
   *                        $ref: '#/components/schemas/Admin'
   */
  router.get("/:ad_id", adminController.getAdmin);

  /**
   * @swagger
   * /api/v1/admins/{ad_id}:
   *   put:
   *     summary: Update admin by ID
   *     description: Update an admin by ID
   *     parameters:
   *       - in: path
   *         name: ad_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the admin to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               ad_username:
   *                 type: string
   *                 description: Admin username
   *               ad_name:
   *                 type: string
   *                 description: Admin name
   *               ad_gender:
   *                 type: string
   *                 enum: [male, female]
   *                 description: Admin gender
   *               ad_phone:
   *                 type: string
   *                 description: Admin phone number
   *               ad_address:
   *                 type: string
   *                 description: Admin address
   *     tags:
   *       - admins
   *     responses:
   *       200:
   *         description: The updated admin
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
   *                     admin:
   *                       $ref: '#/components/schemas/Admin'
   */
  router.put("/:ad_id", adminController.updateAdmin);

  /**
   * @swagger
   *   /api/v1/admins/{ad_id}:
   *     delete:
   *       summary: Delete admin by ID
   *       description: Delete admin by ID
   *       parameters:
   *         - in: path
   *           name: ad_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the admin to delete
   *       tags:
   *         - admins
   *       responses:
   *         200:
   *           description: Admin deleted
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
   *                     example: Admin has been deleted
   */
  router.delete("/:ad_id", adminController.deleteAdmin);
  router.all("/:ad_id", methodNotAllowed);
};
