import * as dotenv from "dotenv";

dotenv.config();
    const path = `../../.env`;

dotenv.config({ path: path });

export const ATLAS_URI = process.env.ATLAS_URI || ""
export const APP_SECRET = process.env.APP_SECRET || ""
