
import { model,Schema } from "mongoose";

const blackListSchema = new Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in the blacklist"],
    }
}, {
    timestamps: true
});

export const tokenBlackListModel = model("BlackList", blackListSchema);