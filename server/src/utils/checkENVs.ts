import logger from "./logger.ts";

const checkEnvVariables = () => {
    const requiredEnvVariables = [
        "PORT",
        "DB_CONNECTION_STRING",
        "CORS_ORIGIN",
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
