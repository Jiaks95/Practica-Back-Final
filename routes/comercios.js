const express = require("express");
const router = express.Router();
// Importacion de los controladores usados para la obtencion, creacion, actualizacion y eliminacion de comercios
const {getComercios, getComercio, createComercio, updateComercio, deleteComercio} = require("../controllers/comerciosController");
const { validatorCreateComercio, validatorGetComercio } = require("../validators/comerciosValidators");
const { authMiddleware } = require("../middleware/session");
const checkRol = require("../middleware/rol");

// Definimos las rutas del enrutador para los metodos HTTP que correspondan y la funcion que se debe de ejecutar en cada caso

/**
 * @openapi
 * /api/comercios:
 *  get:
 *      tags:
 *      - Comercios
 *      summary: Get commerces
 *      description: Get all commerces by an admin
 *      parameters:
 *          -   name: ordenar
 *              in: query
 *              description: parameter query to get the commerces ordered by their cif
 *              required: false
 *              schema:
 *                  type: string
 *                  enum: ["cif"]
 *      responses:
 *          '200':
 *              description: Returns the commerces
 *          '500': 
 *              description: Get commerces error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", authMiddleware, checkRol(["admin"]), getComercios);

/**
 * @openapi
 * /api/comercios/{cif}:
 *  get:
 *      tags:
 *      - Comercios
 *      summary: Get commerce by it's cif
 *      description: Get a commerce by it's cif by an admin
 *      parameters:
 *          -   name: cif
 *              in: path
 *              description: parameter to get the commerce
 *              required: true
 *              schema: 
 *                  type: string
 * 
 *      responses:
 *          '200':
 *              description: Returns the commerce
 *          '404':
 *              description: Commerce not found error
 *          '500': 
 *              description: Get commerce error
 *      security:
 *          - bearerAuth: []
 */
router.get("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComercio, getComercio);

/**
 * @openapi
 * /api/comercios:
 *  post:
 *      tags:
 *      - Comercios
 *      summary: Create commerce
 *      description: Create a new commerce by an admin
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comercio"
 *      responses:
 *          '200':
 *              description: Returns the newly created commerce
 *          '500':
 *              description: Commerce creation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateComercio, createComercio);

/**
 * @openapi
 * /api/comercios/{cif}:
 *  put:
 *      tags:
 *      - Comercios
 *      summary: Update a commerce by it's cif
 *      description: Update a commerce by it's cif by an admin
 *      parameters:
 *          -   name: cif
 *              in: path
 *              description: parameter to get the commerce to be updated
 *              required: true
 *              schema: 
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comercio"
 * 
 *      responses:
 *          '200':
 *              description: Returns the commerce
 *          '404':
 *              description: Commerce not found error
 *          '500': 
 *              description: Update commerce error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComercio, validatorCreateComercio, updateComercio);

/**
 * @openapi
 * /api/comercios/{cif}:
 *  delete:
 *      tags:
 *      - Comercios
 *      summary: Delete a commerce by it's cif
 *      description: Delete a commerce by it's cif by an admin
 *      parameters:
 *          -   name: cif
 *              in: path
 *              description: parameter to get the commerce to be deleted
 *              required: true
 *              schema: 
 *                  type: string
 * 
 *      responses:
 *          '200':
 *              description: Returns a confirmation
 *          '404':
 *              description: Commerce not found error
 *          '500': 
 *              description: Delete commerce error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComercio, deleteComercio);

module.exports = router;