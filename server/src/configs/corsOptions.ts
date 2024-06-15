import cors from "cors";

const corsOptions: cors.CorsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

export default corsOptions;
