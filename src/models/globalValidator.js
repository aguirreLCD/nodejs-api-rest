import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (inputValue) => inputValue.trim() !== "",
  message: ({ path }) => `Empty field = ${path} is required.`,
});
