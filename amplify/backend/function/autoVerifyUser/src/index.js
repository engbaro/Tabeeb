

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    // Confirm the user
    event.response.autoConfirmUser = true;

    // If desired, auto-verify the user's email and/or phone
    if (event.request.userAttributes.hasOwnProperty('email')) {
        event.response.autoVerifyEmail = true;
    }
    if (event.request.userAttributes.hasOwnProperty('phone_number')) {
        event.response.autoVerifyPhone = true;
    }

    // Return to Amazon Cognito
    return event;
};

