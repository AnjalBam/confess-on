import { Schema, model, Document} from "mongoose";

export interface PostDocument extends Document {
    description: string;
    visibility: string;
    user: string;
    likes: [string];
    createdAt: string;
    modifiedAt: string;
}

const Post = new Schema<PostDocument>({
    description: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'anonymous'],
        default: 'public',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

}, { timestamps: true });


export default model("Post", Post);
