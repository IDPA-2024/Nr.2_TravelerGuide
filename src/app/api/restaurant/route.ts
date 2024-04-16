import { Restaurant } from "@/lib/mongoose";
import { Resend } from "resend";
import { EmailTemplate } from "@/email/NewRestaurantEmail";

export async function POST(req: Request) {
  const body = await req.json();
  const token = body.token;
  if (token === "" || token === undefined) {
    return Response.json({ message: "No Token", status: 401 });
  }
  const restaurant = body.restaurant;
  const check = await Restaurant.findOne({ name: restaurant.name });
  if (check) {
    return Response.json({ message: "Restaurant already exists", status: 409 });
  }
  const result = await Restaurant.create(restaurant);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const id = await result._id;
  const { error } = await resend.batch.send([
    {
      from: "noreply@lunch-guide.ch",
      to: ["ael.banyard@gmail.com"],
      subject: "Neues Restaurant hinzugefügt",
      react: EmailTemplate({
        name: restaurant.name,
        address: restaurant.address,
        price: restaurant.price,
        quality: restaurant.quality,
        seating_option: restaurant.seating_option,
        indoor_seating: restaurant.indoor_seating,
        outdoor_seating: restaurant.outdoor_seating,
        take_away: restaurant.take_away,
        vegan: restaurant.vegan,
        website: restaurant.website,
      }),
    },
    {
      from: "noreply@lunch-guide.ch",
      to: ["en.lueber@gmail.com"],
      subject: "Neues Restaurant hinzugefügt",
      react: EmailTemplate({
        name: restaurant.name,
        address: restaurant.address,
        price: restaurant.price,
        quality: restaurant.quality,
        seating_option: restaurant.seating_option,
        indoor_seating: restaurant.indoor_seating,
        outdoor_seating: restaurant.outdoor_seating,
        take_away: restaurant.take_away,
        vegan: restaurant.vegan,
        website: restaurant.website,
      }),
    },
    {
      from: "noreply@lunch-guide.ch",
      to: ["yaenschlaepfer@gmail.com"],
      subject: "Neues Restaurant hinzugefügt",
      react: EmailTemplate({
        name: restaurant.name,
        address: restaurant.address,
        price: restaurant.price,
        quality: restaurant.quality,
        seating_option: restaurant.seating_option,
        indoor_seating: restaurant.indoor_seating,
        outdoor_seating: restaurant.outdoor_seating,
        take_away: restaurant.take_away,
        vegan: restaurant.vegan,
        website: restaurant.website,
      }),
    },
  ]);
  if (error) {
    return Response.json({ message: error, status: 500 });
  }

  if (!result) return Response.json({ message: "error", status: 500 });
  return Response.json({ message: "ok", status: 200, data: result });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { filter, search } = body;
  if (filter === undefined || search === undefined) {
    const result = await Restaurant.find();
    if (!result) return Response.json({ message: "error", status: 500 });
    return Response.json({ message: "ok", status: 200, data: result });
  } else {
    if (filter.length > 0 || search.length > 0) {
      console.log(filter);
      if (filter.length > 0 && search.length > 0) {
        const result = await Restaurant.find({
          category: { $in: filter },
          name: { $regex: search, $options: "i" },
        });
        if (!result) return Response.json({ message: "error", status: 500 });
        return Response.json({ message: "ok", status: 200, data: result });
      }
      if (search.length > 0 && filter.length === 0) {
        const result = await Restaurant.find({
          name: { $regex: search, $options: "i" },
        });
        if (!result) return Response.json({ message: "error", status: 500 });
        return Response.json({ message: "ok", status: 200, data: result });
      }
      if (filter.length > 0 && search.length === 0) {
        const result = await Restaurant.find({ category: { $in: filter } });
        if (!result) return Response.json({ message: "error", status: 500 });
        return Response.json({ message: "ok", status: 200, data: result });
      }
    } else {
      const result = await Restaurant.find();
      if (!result) return Response.json({ message: "error", status: 500 });
      return Response.json({ message: "ok", status: 200, data: result });
    }
  }
}
