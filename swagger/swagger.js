const swaggerUi = require('swagger-ui-express'); // swagger-ui와 express를 연결하기 위해 사용
const swaggerJsdoc = require('swagger-jsdoc'); // jsdoc 주석으로 Swagger API 문서를 표현하기 위해 사용

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Giho's 인프라 구축 예제",
        description:
          "Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
      },
      servers: [
        {
          url: "http://localhost:8080", // 요청 URL
        },
      ],
    },
    apis: ["./frontend/router/*.js"], //Swagger 파일 연동
  }

  const specs = swaggerJsdoc(options)

module.exports = { swaggerUi, specs }