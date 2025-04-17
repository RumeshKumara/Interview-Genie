import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./util/schema.js",
    out: "./drizzle",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_RLsgtceH12UI@ep-polished-hat-a4isnvpq-pooler.us-east-1.aws.neon.tech/AI-Interview-Mocker?sslmode=require',
    }
});