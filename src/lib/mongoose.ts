import mongoose, { Schema, Model, Document } from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL || "");
}

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  stars: { type: Number, default: 0 },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  created_at: { type: Date, default: Date.now },
});

const restaurantSchema = new mongoose.Schema({
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
  student_reduction: Boolean,
  delivery_service: Boolean,
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

type CommentType = Document & {
  user_id: string;
  text: string;
  stars: number;
  restaurantId: string;
  created_at: Date;
};
type RestaurantType = Document & {
  lat: number;
  lng: number;
  name: string;
  address: string;
  image: string;
  price: string;
  quality: string;
  seating_option: boolean;
  indoor_seating: boolean;
  outdoor_seating: boolean;
  take_away: boolean;
  student_reduction: boolean;
  delivery_service: boolean;
  ambience: {
    style: string;
    space: string;
    brightness: string;
    loudness: string;
  };
  vegan: boolean;
  website: string;
  opening_hours: {
    periods: {
      day: string;
      open: {
        day: number;
        hours: number;
        minutes: number;
        time: string;
        next_date: number;
      };
      close: {
        day: number;
        hours: number;
        minutes: number;
        time: string;
        next_date: number;
      };
    }[];
    weekday_text: string[];
  };
  category: string[];
  comments: string[];
};
type UserType = Document & {
  email: string;
  passwordHash: string;
  name: string;
  image: string;
  verified: boolean;
  comments: string[];
};

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
