module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      type: String,
      team: String,
      runs: Number,
      wickets: Number,
      catches: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const player = mongoose.model("player", schema);
  return player;
};
