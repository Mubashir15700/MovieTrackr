import logger from "./logger.js";

const checkEnvVariables = () => {
    const requiredEnvVariables = [
        "NODE_ENV",
        "PORT",
        "DB_CONNECTION_STRING",
        "CORS_ORIGIN",
        "JWT_SECRET_KEY",
    ];

    const missingVariables = requiredEnvVariables.filter(
        (variable) => !process.env[variable],
    );

    if (missingVariables.length > 0) {
        logger.error(
            `Missing environment variables: ${missingVariables.join(", ")}`,
        );
        process.exit(1);
    }
};

export default checkEnvVariables;
