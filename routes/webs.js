const express = require("express");
const router = express.Router();
const { checkWebProperty, getWeb, createWeb, updateWeb, uploadImageToWeb, uploadTextToWeb, deleteWeb, getWebs, uploadImageMemoryToWeb, reviewWeb } = require("../controllers/websController.js");
const {uploadMiddleware, uploadMiddlewareMemory} = require("../utils/storageHandle");
const { validatorCreateWeb, validatorGetWeb, validatorUploadTextToWeb, validatorReview } = require("../validators/websValidators");
const { comercioMiddleware, authMiddleware } = require("../middleware/session");

/**
 * @openapi
 * /api/webs:
 *  get:
 *      tags:
 *      - Webs
 *      summary: Get all webs
 *      description: Get all webs or get them by city and/or activity, can get them ordered by score
 *      parameters:
 *          -   name: ciudad
 *              in: query
 *              description: query used to get webs located in the specified city
 *              required: false
 *              schema:
 *                  type: string
 *          -   name: actividad
 *              in: query
 *              description: query used to get webs with the specified activity
 *              required: false
 *              schema:
 *                  type: string
 *          -   name: scoring
 *              in: query
 *              description: query used to order the webs
 *              required: false
 *              schema: 
 *                  type: string
 *                  enum: ["true"]
 *      responses:
 *          '200':
 *              description: Returns the webs
 *          '500':
 *              description: Get webs
 */
router.get("/", getWebs);

/**
 * @openapi
 * /api/webs/{id}:
 *  get:
 *      tags:
 *      - Webs
 *      summary: Get web by it's id
 *      description: Get a web by it's id by a commerce
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the web to be searched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the web
 *          '403':
 *              description: Authorization error
 *          '404':
 *              description: The web doesn't exists or the commerce doesn't have a web error
 *          '500':
 *              description: Get web or check web property error
 */
router.get("/:id", validatorGetWeb, getWeb);

/**
 * @openapi
 * /api/webs:
 *  post:
 *      tags:
 *      - Webs
 *      summary: Create a web
 *      description: Create a web by a commerce
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the newly created web
 *          '409':
 *              description: The commerce already has a web error
 *          '500':
 *              description: Create web error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", comercioMiddleware, validatorCreateWeb, createWeb);

/**
 * @openapi
 * /api/webs/{id}:
 *  put:
 *      tags:
 *      - Webs
 *      summary: Update a web
 *      description: Update a web by it's commerce
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of web to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the updated web
 *          '403':
 *              description: Authorization error
 *          '404':
 *              description: The web doesn't exists or the commerce doesn't have a web error
 *          '500':
 *              description: Get web or check web property error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", comercioMiddleware, validatorGetWeb, validatorCreateWeb, checkWebProperty, updateWeb);

/**
 * @openapi
 * /api/webs/{id}/images:
 *  patch:
 *      tags:
 *      - Webs
 *      summary: Save image url in web
 *      description: Upload image url in the web by it's commerce
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of web in where the image url will be saved
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the updated web
 *          '403':
 *              description: Authorization error
 *          '404':
 *              description: The web doesn't exists or the commerce doesn't have a web error
 *          '500':
 *              description: Update web or check web property error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id/images", comercioMiddleware, validatorGetWeb, checkWebProperty, uploadMiddleware.single("image"), uploadImageToWeb); 

/**
 * @openapi
 * /api/webs/{id}/texts:
 *  patch:
 *      tags:
 *      - Webs
 *      summary: Save text in web
 *      description: Upload text in the web by it's commerce
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of web in where the text will be saved
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  example: {"textos": ["Construccion", "Investigacion"]}
 *      responses:
 *          '200':
 *              description: Returns the updated web
 *          '403':
 *              description: Authorization error
 *          '404':
 *              description: The web doesn't exists or the commerce doesn't have a web error
 *          '500':
 *              description: Update web or check web property error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id/texts", comercioMiddleware, validatorGetWeb, validatorUploadTextToWeb, checkWebProperty, uploadTextToWeb);

/**
 * @openapi
 * /api/webs/{id}:
 *  delete:
 *      tags:
 *      - Webs
 *      summary: Delete web
 *      description:  Delete a web by it's commerce
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the web to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the status
 *          '403':
 *              description: Authorization error
 *          '404':
 *              description: The web doesn't exists or the commerce doesn't have a web error
 *          '500':
 *              description: Delete web or check web property error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", comercioMiddleware, validatorGetWeb, checkWebProperty, deleteWeb);

/**
 * @openapi
 * /api/webs/{id}/images_memory:
 *  patch:
 *      tags:
 *      - Webs
 *      summary: Save image url in web
 *      description: Upload image url in the web by it's commerce
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of web in where the image url will be saved
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the updated web
 *          '403':
 *              description: Authorization error
 *          '404':
 *              description: The web doesn't exists or the commerce doesn't have a web error
 *          '500':
 *              description: Update web or check web property error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id/images_memory", comercioMiddleware, validatorGetWeb, checkWebProperty, uploadMiddlewareMemory.single("image"), uploadImageMemoryToWeb);

/**
 * @openapi
 * /api/webs/{id}/review:
 *  patch:
 *      tags:
 *      - Webs
 *      summary: Save review in web
 *      description: Upload a review to a web, updating it's score and total reviews
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of web to be reviewed
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody: 
 *          content:
 *              application/json:
 *                      example: {"score": 4, "review": "Esta bien"}
 *      responses:
 *          '200':
 *              description: Returns the reviewed web
 *          '401':
 *              description: Token error
 *          '403':
 *              description: Validator get web error
 *          '404':
 *              description: The web doesn't exists error
 *          '500':
 *              description: Review web error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id/review", authMiddleware, validatorGetWeb, validatorReview, reviewWeb);

module.exports = router;