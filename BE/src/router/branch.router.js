// const express = require("express");
// const branchController = require("../controllers/branch.controller");
// const { methodNotAllowed } = require("../controllers/errors.controller");

// const router = express.Router();

// module.exports.setup = (app) => {
//   app.use("/api/v1/branch", router);

//   /**
//    * @swagger
//    * /api/v1/branch:
//    *  get:
//    *    summary: Get branch by filter
//    *    description: Get branch by filter
//    *    parameters:
//    *      - in: query
//    *        name: branch_name
//    *        schema:
//    *          type: string
//    *        description: Filter by branch name
//    *      - in: query
//    *        name: branch_address
//    *        schema:
//    *          type: string
//    *        description: Filter by branch address
//    *      - $ref: '#/components/parameters/limitParam'
//    *      - $ref: '#/components/parameters/pageParam'
//    *    tags:
//    *      - branch
//    *    responses:
//    *      200:
//    *        description: A list of branch
//    *        content:
//    *          application/json:
//    *            schema:
//    *              type: object
//    *              properties:
//    *                status:
//    *                  type: string
//    *                  description: The response status
//    *                  enum: [success]
//    *                data:
//    *                  type: object
//    *                  properties:
//    *                    branch:
//    *                      type: array
//    *                      items:
//    *                        $ref: '#/components/schemas/Branch'
//    *                    metadata:
//    *                      $ref: '#/components/schemas/PaginationMetadata'
//    */
//   router.get("/", branchController.getBranchesByFilter);

//   /**
//    * @swagger
//    * /api/v1/branch:
//    *  post:
//    *    summary: Create a new branch
//    *    description: Create a new branch
//    *    requestBody:
//    *      required: true
//    *      content:
//    *        application/json:
//    *          schema:
//    *            type: object
//    *            properties:
//    *              branch_name:
//    *                type: string
//    *                description: Branch name
//    *              branch_address:
//    *                type: string
//    *                description: Branch address
//    *    tags:
//    *      - branch
//    *    responses:
//    *      201:
//    *        description: A new branch has been created
//    *        content:
//    *          application/json:
//    *            schema:
//    *              type: object
//    *              properties:
//    *                status:
//    *                  type: string
//    *                  description: The response status
//    *                  enum: [success]
//    *                data:
//    *                  type: object
//    *                  properties:
//    *                    branch:
//    *                      $ref: '#/components/schemas/Branch'  # Schema for branch response
//    */
//   router.post("/", branchController.createBranch);

//   /**
//    * @swagger
//    *  /api/v1/branch:
//    *    delete:
//    *      summary: Delete all branch
//    *      description: Delete all branch
//    *      tags:
//    *        - branch
//    *      responses:
//    *        200:
//    *          description: All branch deleted
//    *          $ref: '#/components/responses/200NoData'
//    */
//   router.delete("/", branchController.deleteAllBranches);
//   router.all("/", methodNotAllowed);

//   /**
//    * @swagger
//    *  /api/v1/branch/{branch_id}:
//    *    get:
//    *      summary: Get branch by branch_id
//    *      description: Get branch by branch_id
//    *      parameters:
//    *        - name: branch_id
//    *          in: path
//    *          required: true
//    *          schema:
//    *            type: integer
//    *          description: The ID of the branch
//    *      tags:
//    *        - branch
//    *      responses:
//    *        200:
//    *          description: A branch
//    *          content:
//    *            application/json:
//    *              schema:
//    *                type: object
//    *                properties:
//    *                  status:
//    *                    type: string
//    *                    description: The response status
//    *                    enum: [success]
//    *                  data:
//    *                    type: object
//    *                    properties:
//    *                      branch:
//    *                        $ref: '#/components/schemas/Branch'
//    */
//   router.get("/:branch_id", branchController.getBranch);

//   /**
//    * @swagger
//    * /api/v1/branch/{branch_id}:
//    *   put:
//    *     summary: Update branch by ID
//    *     description: Update a branch by ID
//    *     parameters:
//    *       - in: path
//    *         name: branch_id
//    *         required: true
//    *         schema:
//    *           type: integer
//    *         description: ID of the branch to update
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             type: object
//    *             properties:
//    *               branch_name:
//    *                 type: string
//    *                 description: Name of the branch
//    *               branch_address:
//    *                 type: string
//    *                 description: Address of the branch
//    *     tags:
//    *       - branch
//    *     responses:
//    *       200:
//    *         description: The updated branch
//    *         content:
//    *           application/json:
//    *             schema:
//    *               $ref: '#/components/schemas/Branch'
//    */
//   router.put("/:branch_id", branchController.updateBranch);

//   /**
//    * @swagger
//    *   /api/v1/branch/{branch_id}:
//    *     delete:
//    *       summary: Delete branch by ID
//    *       description: Delete branch by ID
//    *       parameters:
//    *         - in: path
//    *           name: branch_id
//    *           required: true
//    *           schema:
//    *             type: integer
//    *           description: The ID of the branch to delete
//    *       tags:
//    *         - branch
//    *       responses:
//    *         200:
//    *           description: Branch deleted
//    *           $ref: '#/components/responses/200NoData'
//    */
//   router.delete("/:branch_id", branchController.deleteBranch);
//   router.all("/:branch_id", methodNotAllowed);
// };



const express = require("express");
const branchController = require("../controllers/branch.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/branch", router);

  /**
   * @swagger
   * /api/v1/branch:
   *  get:
   *    summary: Get branches by filter
   *    description: Get branches by filter
   *    parameters:
   *      - in: query
   *        name: branch_name
   *        schema:
   *          type: string
   *        description: Filter by branch name
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - branch
   *    responses:
   *      200:
   *        description: A list of branches
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
   *                    branches:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Branch'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/", branchController.getBranchesByFilter);

  /**
   * @swagger
   * /api/v1/branch:
   *  post:
   *    summary: Create a new branch
   *    description: Create a new branch
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              branch_name:
   *                type: string
   *                description: Branch name
   *              branch_address_id:
   *                type: integer
   *                description: ID of the address linked to the branch
   *    tags:
   *      - branch
   *    responses:
   *      201:
   *        description: A new branch has been created
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
   *                    branch:
   *                      $ref: '#/components/schemas/Branch'
   */
  router.post("/", branchController.createBranch);

  /**
   * @swagger
   *  /api/v1/branch:
   *    delete:
   *      summary: Delete all branches
   *      description: Delete all branches
   *      tags:
   *        - branch
   *      responses:
   *        200:
   *          description: All branches deleted
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
   *                    example: "All branches have been deleted"
   */
  router.delete("/", branchController.deleteAllBranches);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/branch/{branch_id}:
   *    get:
   *      summary: Get branch by branch_id
   *      description: Get branch by branch_id
   *      parameters:
   *        - name: branch_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the branch
   *      tags:
   *        - branch
   *      responses:
   *        200:
   *          description: A branch
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
   *                      branch:
   *                        $ref: '#/components/schemas/Branch'
   */
  router.get("/:branch_id", branchController.getBranch);

  /**
   * @swagger
   * /api/v1/branch/{branch_id}:
   *   put:
   *     summary: Update branch by ID
   *     description: Update a branch by ID
   *     parameters:
   *       - in: path
   *         name: branch_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the branch to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               branch_name:
   *                 type: string
   *                 description: Name of the branch
   *               branch_address_id:
   *                 type: integer
   *                 description: ID of the address linked to the branch
   *     tags:
   *       - branch
   *     responses:
   *       200:
   *         description: The updated branch
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
   *                     branch:
   *                       $ref: '#/components/schemas/Branch'
   */
  router.put("/:branch_id", branchController.updateBranch);

  /**
   * @swagger
   *   /api/v1/branch/{branch_id}:
   *     delete:
   *       summary: Delete branch by ID
   *       description: Delete branch by ID
   *       parameters:
   *         - in: path
   *           name: branch_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the branch to delete
   *       tags:
   *         - branch
   *       responses:
   *         200:
   *           description: Branch deleted
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
   *                     example: "Branch has been deleted"
   */
  router.delete("/:branch_id", branchController.deleteBranch);
  router.all("/:branch_id", methodNotAllowed);
};