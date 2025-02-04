const config = {
    genAIApiKey:String(process.env.REMIX_GEN_AI_API_KEY),
    appWriteURL:String(process.env.APPWRITE_ENDPOINT_URL),
    appWriteProjectId:String(process.env.APPWRITE_PROJECT_ID),
    appWriteApiKEY:String(process.env.APPWRITE_API_KEY),
    appURL:String(process.env.APP_URL),
    sessionSecret:String(process.env.SESSION_SECRET)
}

export default config;