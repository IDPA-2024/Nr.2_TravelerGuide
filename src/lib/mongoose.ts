import mongoose, { Model, Document } from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL || "");
}

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  created_at: { type: Date, default: Date.now },
});

const restaurantSchema = new mongoose.Schema({
  place_id: String,
  lat: Number,
  lng: Number,
  name: String,
  address: String,
  image: String,
  price: String,
  quality: String,
  seating_option: Boolean,
  indoor_seating: Boolean,
  outdoor_seating: Boolean,
  take_away: Boolean,
  ambience: {
    style: String,
    space: String,
    brightness: String,
    loudness: String,
  },
  vegan: Boolean,
  website: String,
  opening_hours: {
    periods: [
      {
        day: String,
        open: {
          day: Number,
          hours: Number,
          minutes: Number,
          time: String,
          next_date: Number,
        },
        close: {
          day: Number,
          hours: Number,
          minutes: Number,
          time: String,
          next_date: Number,
        },
      },
    ],
    weekday_text: [String],
  },
  category: [{ type: String }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  name: String,
  image: String,
  verified: { type: Boolean, default: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

let Comment: Model<Document & CommentType>;
let Restaurant: Model<Document & RestaurantType>;
let User: Model<Document & UserType>;

try {
  Comment = mongoose.model("Comments") as Model<Document & CommentType>;
} catch (error) {
  Comment = mongoose.model("Comments", commentSchema) as unknown as Model<
    Document & CommentType
  >;
}

try {
  Restaurant = mongoose.model("Restaurant") as Model<Document & RestaurantType>;
} catch (error) {
  Restaurant = mongoose.model(
    "Restaurant",
    restaurantSchema
  ) as unknown as Model<Document & RestaurantType>;
}

try {
  User = mongoose.model("User") as Model<Document & UserType>;
} catch (error) {
  User = mongoose.model("User", userSchema) as unknown as Model<
    Document & UserType
  >;
}

export { Comment, Restaurant, User };
