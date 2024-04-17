type CommentType = Document & {
  user_id: string;
  text: string;
  restaurantId: string;
  created_at: Date;
};
type RestaurantType = Document & {
  _id: string;
  place_id: string;
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
  _id: string;
  email: string;
  passwordHash: string;
  name: string;
  image: string;
  verified: boolean;
  comments: string[];
};
