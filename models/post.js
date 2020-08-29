const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachment: {
    attachmentType: {
      type: String,
      enum: [
        "image",
        "post",
        "doc",
        "link",
        "video",
        "pdf",
        "markup",
        "streamable",
      ],
    },
    content: {
      type: String,
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
