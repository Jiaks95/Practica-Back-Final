const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Oscar Jia", 
            email: "@gmail.com", 
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
        schemas: {
          comercio: {
            type: "object",
            required: ["nombreComercio", "CIF", "direccion", "email", "telefonoDeContacto"],
            properties: {
              nombreComercio: {
                type: "string",
                description: "Nombre del comercio",
                example: "Comercio Ejemplo"
              },
              CIF: {
                type: "string",
                description: "CIF del comercio",
                example: "MWL654321X"
              },
              direccion: {
                type: "string",
                description: "Dirección del comercio",
                example: "Calle Ejemplar 19"
              },
              email: {
                type: "string",
                description: "Correo electrónico del comercio",
                example: "comercio@email.com"
              },
              telefonoDeContacto: {
                type: "string",
                description: "Teléfono de contacto del comercio",
                example: "47920163"
              },
              idPagina: {
                type: "string",
                format: "objectId",
                description: "ID de la página asociada",
                nullable: true,
                default: null
              },
            },
          },
          user: {
            type: "object",
            required: ["nombre", "email", "password", "edad", "ciudad", "intereses"],
            properties: {
              nombre: {
                type: "string",
                description: "Nombre del usuario de 4 a 99 caracteres",
                example: "Juanito"
              },
              email: {
                type: "string",
                description: "Correo electrónico del usuario",
                uniqueItems: true,
                example: "juanito@email.com"
              },
              password: {
                type: "string",
                description: "Contraseña del usuario de 8 a 20 caracteres",
                example: "password12"
              },
              edad: {
                type: "integer",
                description: "Edad del usuario",
                example: 38
              },
              ciudad: {
                type: "string",
                description: "Ciudad de residencia del usuario",
                example: "Sevilla"
              },
              intereses: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "Intereses del usuario",
                example: ["Turismo", "Gastronomia"]
              },
              permiteRecibirOfertas: {
                type: "boolean",
                description: "Permiso para recibir ofertas",
                default: false,
                example: true
              },
              rol: {
                type: "string",
                enum: ["user", "admin"],
                description: "Rol del usuario",
                default: "user",
              },
            },
          },
          login: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
                example: "juanito@email.com",
              },
              password: {
                type: "string",
                example: "password12"
              },
            },
          },
          web: {
            type: "object",
            required: ["ciudad", "actividad", "titulo", "resumen", "textos", "imagenes", "reviews"],
            properties: {
              ciudad: {
                type: "string",
                description: "Ciudad de la web",
                example: "Sevilla"
              },
              actividad: {
                type: "string",
                description: "Actividad de la web",
                example: "Turismo"
              },
              titulo: {
                type: "string",
                description: "Título de la web",
                example: "Tour por los puntos de interes en Sevilla"
              },
              resumen: {
                type: "string",
                description: "Resumen de la web",
                example: "Explora los lugares mas bonitos de Sevilla y descubre su encanto"
              },
              textos: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "Textos de la web",
                example: ["Inicio", "Ofertas"]
              },
              imagenes: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "URLs de las imágenes de la web",
                example: ["url-imagen-1", "url-imagen-2"]
              },
              reviews: {
                type: "object",
                required: ["scoring", "totalReviews", "reviewBody"],
                properties: {
                  scoring: {
                    type: "number",
                    description: "Puntuación de la web",
                    example: 4.2
                  },
                  totalReviews: {
                    type: "number",
                    description: "Número total de reseñas",
                    example: 283
                  },
                  reviewBody: {
                    type: "string",
                    description: "Cuerpo de la reseña",
                    example: "Excelente servicio y gran seleccion de destinos"
                  },
                },
              },
            },
          },
        },
      },
    },
    apis: ["./routes/*.js"],
  };

module.exports = swaggerJsdoc(options);
