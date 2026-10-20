import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async function (req, res) {
  try {
    const hotel = await Hotel.create({
      slug: req.body.slug,
      name: req.body.name,
      tagline: req.body.tagline,
      location: req.body.location,
      priceFrom: req.body.priceFrom,
      images: req.body.images,
      description: req.body.description,
      amenities: req.body.amenities,
      owner: req.user._id,
    });

    return res.status(201).json({
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create hotel",
    });
  }
};

export const createRoom = async (req, res) => {
  try {
    const {
      hotelId,
      slug,
      name,
      size,
      maxOccupancy,
      beds,
      bedType,
      pricePerNight,
      image,
      highlights,
      totalRooms,
    } = req.body;

    // Check hotel exists
    const hotel = await Hotel.findOne({
      _id: hotelId,
      owner: req.user._id,
      isActive: true,
    });

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    const room = await Room.create({
      hotel: hotel._id,

      slug,
      name,
      size,
      maxOccupancy,
      beds,
      bedType,
      pricePerNight,
      image,
      highlights,
      totalRooms,
    });

    return res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create room",
    });
  }
};
// {
//     slug: "obsidian-sanctum",

//     name: "The Obsidian Sanctum",

//     tagline: "Ultra-luxury overwater villas nestled in private coral reefs.",

//     location: "Baa Atoll, Maldives",

//     rating: 4.98,

//     reviewsCount: 142,

//     priceFrom: 850,

//     images: [
//         "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200",
//         "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
//         "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
//     ],

//     description:
//         "Architecturally designed to blend into the surrounding marine biosystem...",

//     amenities: [
//         {
//             icon: "🏊",
//             title: "Private Infinity Pools"
//         },
//         {
//             icon: "🛥️",
//             title: "Yacht Airport Transfers"
//         },
//         {
//             icon: "🍷",
//             title: "Undersea Wine Cellar"
//         }
//     ]
// }

// ROOM

// {
//     slug: "presidential-ocean-suite",

//     name: "Presidential Overwater Villa",

//     hotel: ObjectId("68c...")

//     size: "240 m² / 2,580 ft²",

//     maxOccupancy: 2,

//     beds: 1,

//     bedType: "King Bed",

//     pricePerNight: 1250,

//     image: "https://images.unsplash.com/...",

//     highlights: [
//         "360° Ocean Horizon",
//         "Private Glass Floor",
//         "Plunge Pool & Deck"
//     ],

//     totalRooms: 3
// }
