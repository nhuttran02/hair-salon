const express = require("express");
const hairstyleController = require("../controllers/hairstyle.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const hairstyleUpload = require("../middlewares/hairstyle-upload.middleware");
const {
  getMaleHairstyles,
  getFemaleHairstyles,
} = require("../controllers/hairstyle.controller");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/hairstyles", router);

  /**
   * @swagger
   * /api/v1/hairstyles:
   *  get:
   *    summary: Get hairstyles by filter
   *    description: Get hairstyles by filter
   *    parameters:
   *      - in: query
   *        name: hs_name
   *        schema:
   *          type: string
   *        description: Filter by hairstyle name
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: A list of hairstyles
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
   *                    hairstyles:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Hairstyle'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/", hairstyleController.getHairstylesByFilter);

  // Route cho danh sách kiểu tóc Nam
  /**
   * @swagger
   * /api/v1/hairstyles/male:
   *  get:
   *    summary: Get male hairstyles
   *    description: Retrieve list of hairstyles for males
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: List of male hairstyles
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    hairstyles:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Hairstyle'
   *                    total:
   *                      type: integer
   */
  router.get("/male", getMaleHairstyles);

  // Route cho danh sách kiểu tóc Nữ
  /**
   * @swagger
   * /api/v1/hairstyles/female:
   *  get:
   *    summary: Get female hairstyles
   *    description: Retrieve list of hairstyles for females
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: List of female hairstyles
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  enum: [success]
   *                data:
   *                  type: object
   *                  properties:
   *                    hairstyles:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Hairstyle'
   *                    total:
   *                      type: integer
   */
  router.get("/female", getFemaleHairstyles);

  /**
   * @swagger
   * /api/v1/hairstyles:
   *  post:
   *    summary: Create a new hairstyle
   *    description: Create a new hairstyle
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              hs_name:
   *                type: string
   *                description: Hairstyle name
   *              hs_des:
   *                type: string
   *                description: Hairstyle description
   *              hairstyleFile:
   *                type: string
   *                format: binary
   *                description: Image of the hairstyle
   *    tags:
   *      - hairstyles
   *    responses:
   *      201:
   *        description: A new hairstyle has been created
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
   *                    hairstyle:
   *                      $ref: '#/components/schemas/Hairstyle'
   */
  router.post("/", hairstyleUpload, hairstyleController.createHairstyle);

  /**
   * @swagger
   * /api/v1/hairstyles:
   *  delete:
   *    summary: Delete all hairstyles
   *    description: Delete all hairstyles
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: All hairstyles deleted
   *        $ref: '#/components/responses/200NoData'
   */
  router.delete("/", hairstyleController.deleteAllHairstyles);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/hairstyles/{hs_id}:
   *  get:
   *    summary: Get hairstyle by ID
   *    description: Get hairstyle by ID
   *    parameters:
   *      - name: hs_id
   *        in: path
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the hairstyle
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: A hairstyle
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
   *                    hairstyle:
   *                      $ref: '#/components/schemas/Hairstyle'
   */
  router.get("/:hs_id", hairstyleController.getHairstyle);

  /**
   * @swagger
   * /api/v1/hairstyles/{hs_id}:
   *  put:
   *    summary: Update hairstyle by ID
   *    description: Update hairstyle by ID
   *    parameters:
   *      - in: path
   *        name: hs_id
   *        required: true
   *        schema:
   *          type: integer
   *        description: ID of the hairstyle to update
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              hs_name:
   *                type: string
   *                description: Name of the hairstyle
   *              hs_des:
   *                type: string
   *                description: Description of the hairstyle
   *              hairstyleFile:
   *                type: string
   *                format: binary
   *                description: Image of the hairstyle
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: The updated hairstyle
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Hairstyle'
   */
  router.put("/:hs_id", hairstyleUpload, hairstyleController.updateHairstyle);

  /**
   * @swagger
   * /api/v1/hairstyles/{hs_id}:
   *  delete:
   *    summary: Delete hairstyle by ID
   *    description: Delete hairstyle by ID
   *    parameters:
   *      - in: path
   *        name: hs_id
   *        required: true
   *        schema:
   *          type: integer
   *        description: The ID of the hairstyle to delete
   *    tags:
   *      - hairstyles
   *    responses:
   *      200:
   *        description: Hairstyle deleted
   *        $ref: '#/components/responses/200NoData'
   */
  router.delete("/:hs_id", hairstyleController.deleteHairstyle);
  router.all("/:hs_id", methodNotAllowed);
};