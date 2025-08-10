import mongoose from "mongoose";
const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    battalionCouncil: {
      type: String,
      required: true,
    },
    divisionalCouncil: {
      type: String,
      required: true,
    },
    regionalCouncil: {
      type: String,
      required: true,
    },
    idcard: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    yearjoinRs: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    basic1: {
      type: Boolean,
      required: true,
      default: false,
    },
    basic1year: {
      type: String,
    },
    basic2: {
      type: Boolean,
      required: true,
      default: false,
    },
    basic2year: {
      type: String,
    },
    basic3: {
      type: Boolean,
      required: true,
      default: false,
    },
    basic3year: {
      type: String,
    },
    advance: {
      type: Boolean,
      required: true,
      default: false,
    },
    advanceyear: {
      type: String,
    },
    leadership: {
      type: Boolean,
      required: true,
      default: false,
    },
    leadershipyear: {
      type: String,
    },
    nationalProvost: {
      type: Boolean,
      required: true,
      default: false,
    },
    nationalProvostyear: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const IssueDetails =
  mongoose.models.issues || mongoose.model("issues", issueSchema);

export default IssueDetails;
