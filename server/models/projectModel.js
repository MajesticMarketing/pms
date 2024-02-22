import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the project"],
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  members: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  discussion: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      time: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
        require: true,
        default: "null",
      },
    },
  ],
  tasks: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      time: {
        type: Date,
        default: Date.now(),
      },
      doneAt: {
        type: Date,
        default: null,
      },
      text: {
        type: String,
        require: true,
      },
      done: {
        type: Boolean,
        default: false,
        require: true,
      },
      subTasks: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          time: {
            type: Date,
            default: Date.now(),
          },
          doneAt: {
            type: Date,
            default: null,
          },
          text: {
            type: String,
            require: true,
          },
          done: {
            type: Boolean,
            default: false,
            require: true,
          },
        },
      ],
    },
  ],
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  deadline: {
    type: String,
    require: true,
  },
});
export const Project = mongoose.model("Project", projectSchema);
