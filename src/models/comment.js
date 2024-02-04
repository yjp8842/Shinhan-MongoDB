import mongoose from "mongoose";

const schema = {
  code: String,
  user: {
    code: String,
    name: String,
    photo: {
      original: String,
      large: String,
      small: String,
    },
    watcha_play_user: Boolean,
    official_user: Boolean,
  },
  text: String,
  likes_count: Number,
  replies_count: Number,
  content_code: String,
  user_code: String,
  watched_at: String,
  spoiler: Boolean,
  improper: Boolean,
  replyable: Boolean,
  created_at: String,
  user_content_action: {
    rating: Number,
    status: String,
    mehed: Boolean,
    watched_at: String,
    user_code: String,
    content_code: String,
  },
};

const CommentSchema = new mongoose.Schema(schema, {});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
