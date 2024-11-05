const express = require("express");
const router = express.Router();
const { checkWebProperty, getWeb, createWeb, updateWeb, uploadImageToWeb, uploadTextToWeb, deleteWeb, getWebs, patchWeb } = require("../controllers/websController.js");
const uploadMiddleware = require("../utils/storageHandle");
const { validatorCreateWeb, validatorGetWeb, validatorUploadTextToWeb, validatorPatchWeb } = require("../validators/websValidators");
const { comercioMiddleware, authMiddleware } = require("../middleware/session");

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
 *      security:
 *          - bearerAuth: []
 */
router.get("/:id", comercioMiddleware, validatorGetWeb, checkWebProperty, getWeb);

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

router.patch("/:id", comercioMiddleware, validatorGetWeb, validatorPatchWeb, checkWebProperty, patchWeb);

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

router.patch("/:id/review", authMiddleware, validatorGetWeb);

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
router.delete("/:id", comercioMiddleware, validatorGetWeb, checkWebProperty, deleteWeb)

module.exports = router;