const express = require("express");
const addressController = require("../controllers/address.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/addresses", router);

  /**
   * @swagger
   * /api/v1/addresses:
   *  get:
   *    summary: Get addresses by filter
   *    description: Get addresses by filter
   *    parameters:
   *      - in: query
   *        name: province_code
   *        schema:
   *          type: string
   *        description: Filter by province code
   *      - in: query
   *        name: district_code
   *        schema:
   *          type: string
   *        description: Filter by district code
   *      - in: query
   *        name: ward_code
   *        schema:
   *          type: string
   *        description: Filter by ward code
   *      - $ref: '#/components/parameters/limitParam'
   *      - $ref: '#/components/parameters/pageParam'
   *    tags:
   *      - addresses
   *    responses:
   *      200:
   *        description: A list of addresses
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
   *                    addresses:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Address'
   *                    metadata:
   *                      $ref: '#/components/schemas/PaginationMetadata'
   */
  router.get("/", addressController.getAddressesByFilter);

  /**
   * @swagger
   * /api/v1/addresses:
   *  post:
   *    summary: Create a new address
   *    description: Create a new address
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              user_id:
   *                type: integer
   *                description: User ID
   *              street:
   *                type: string
   *                description: Street address
   *              province_code:
   *                type: string
   *                description: Province code
   *              district_code:
   *                type: string
   *                description: District code
   *              ward_code:
   *                type: string
   *                description: Ward code
   *              administrative_unit_id:
   *                type: integer
   *                description: Administrative unit ID
   *              administrative_region_id:
   *                type: integer
   *                description: Administrative region ID
   *    tags:
   *      - addresses
   *    responses:
   *      201:
   *        description: A new address has been created
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
   *                    address:
   *                      $ref: '#/components/schemas/Address'
   */
  router.post("/", addressController.createAddress);

  /**
   * @swagger
   * /api/v1/addresses/provinces:
   *  get:
   *    summary: Get all provinces
   *    description: Fetch all provinces
   *    tags:
   *      - addresses
   *    responses:
   *      200:
   *        description: A list of provinces
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  enum: [success]
   *                  description: The response status
   *                data:
   *                  type: object
   *                  properties:
   *                    provinces:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          code:
   *                            type: string
   *                            description: Province code
   *                          name:
   *                            type: string
   *                            description: Province name
   */
  router.get("/provinces", addressController.getProvinces);

  /**
   * @swagger
   * /api/v1/addresses/districts:
   *  get:
   *    summary: Get districts by province code
   *    description: Fetch districts filtered by a province code
   *    parameters:
   *      - in: query
   *        name: province_code
   *        schema:
   *          type: string
   *        required: true
   *        description: Province code to filter districts
   *    tags:
   *      - addresses
   *    responses:
   *      200:
   *        description: A list of districts
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  enum: [success]
   *                  description: The response status
   *                data:
   *                  type: object
   *                  properties:
   *                    districts:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          code:
   *                            type: string
   *                            description: District code
   *                          name:
   *                            type: string
   *                            description: District name
   */
  router.get("/districts", addressController.getDistricts);

  /**
   * @swagger
   * /api/v1/addresses/wards:
   *  get:
   *    summary: Get wards by district code
   *    description: Fetch wards filtered by a district code
   *    parameters:
   *      - in: query
   *        name: district_code
   *        schema:
   *          type: string
   *        required: true
   *        description: District code to filter wards
   *    tags:
   *      - addresses
   *    responses:
   *      200:
   *        description: A list of wards
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  enum: [success]
   *                  description: The response status
   *                data:
   *                  type: object
   *                  properties:
   *                    wards:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          code:
   *                            type: string
   *                            description: Ward code
   *                          name:
   *                            type: string
   *                            description: Ward name
   */
  router.get("/wards", addressController.getWards);

  /**
   * @swagger
   *  /api/v1/addresses:
   *    delete:
   *      summary: Delete all addresses
   *      description: Delete all addresses
   *      tags:
   *        - addresses
   *      responses:
   *        200:
   *          description: All addresses deleted
   *          $ref: '#/components/responses/200NoData'
   */
  router.delete("/", addressController.deleteAllAddresses);
  router.all("/", methodNotAllowed);

  /**
   * @swagger
   *  /api/v1/addresses/{address_id}:
   *    get:
   *      summary: Get address by address_id
   *      description: Get address by address_id
   *      parameters:
   *        - name: address_id
   *          in: path
   *          required: true
   *          schema:
   *            type: integer
   *          description: The ID of the address
   *      tags:
   *        - addresses
   *      responses:
   *        200:
   *          description: An address
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
   *                      address:
   *                        $ref: '#/components/schemas/Address'
   */
  router.get("/:address_id", addressController.getAddress);

  /**
   * @swagger
   * /api/v1/addresses/{address_id}:
   *   put:
   *     summary: Update address by ID
   *     description: Update an address by ID
   *     parameters:
   *       - in: path
   *         name: address_id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the address to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user_id:
   *                 type: integer
   *                 description: User ID
   *               street:
   *                 type: string
   *                 description: Street address
   *               province_code:
   *                 type: string
   *                 description: Province code
   *               district_code:
   *                 type: string
   *                 description: District code
   *               ward_code:
   *                 type: string
   *                 description: Ward code
   *               administrative_unit_id:
   *                 type: integer
   *                 description: Administrative unit ID
   *               administrative_region_id:
   *                 type: integer
   *                 description: Administrative region ID
   *     tags:
   *       - addresses
   *     responses:
   *       200:
   *         description: The updated address
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Address'
   */
  router.put("/:address_id", addressController.updateAddress);

  /**
   * @swagger
   *   /api/v1/addresses/{address_id}:
   *     delete:
   *       summary: Delete address by ID
   *       description: Delete address by ID
   *       parameters:
   *         - in: path
   *           name: address_id
   *           required: true
   *           schema:
   *             type: integer
   *           description: The ID of the address to delete
   *       tags:
   *         - addresses
   *       responses:
   *         200:
   *           description: Address deleted
   *           $ref: '#/components/responses/200NoData'
   */
  router.delete("/:address_id", addressController.deleteAddress);
  router.all("/:address_id", methodNotAllowed);
};