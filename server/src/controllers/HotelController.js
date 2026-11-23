import mongoose from "mongoose";
import Hotel from "../models/HotleModel.js";
import Room from "../models/roomModel.js";
import RoomReservation from "../models/roomReservationModel.js";
import { withRoomAvailability } from "../utils/roomAvailability.js";

const oneDayMs = 86_400_000;

function parseDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value
    ? null
    : date;
}

function getAvailabilityRange(query) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (!query.checkInDate && !query.checkOutDate) {
    return {
      checkInDate: today,
      checkOutDate: new Date(today.getTime() + oneDayMs),
    };
  }
  if (!query.checkInDate || !query.checkOutDate) return null;

  const checkInDate = parseDate(query.checkInDate);
  const checkOutDate = parseDate(query.checkOutDate);
  const nights =
    checkInDate && checkOutDate
      ? (checkOutDate.getTime() - checkInDate.getTime()) / oneDayMs
      : 0;
  if (
    !checkInDate ||
    !checkOutDate ||
    checkInDate < today ||
    nights < 1 ||
    nights > 365
  ) {
    return null;
  }

  return { checkInDate, checkOutDate };
}

function getStayDates({ checkInDate, checkOutDate }) {
  const nights = (checkOutDate.getTime() - checkInDate.getTime()) / oneDayMs;
  return Array.from(
    { length: nights },
    (_, index) => new Date(checkInDate.getTime() + index * oneDayMs),
  );
}

const normalizeStatus = (value) => {
  if (!value) return "available";
  const normalized = String(value).trim().toLowerCase();

  if (["available", "vacant", "open"].includes(normalized)) {
    return "available";
  }

  if (["unavailable", "booked", "occupied", "reserved"].includes(normalized)) {
    return "unavailable";
  }

  if (["maintenance", "cleaning", "repair"].includes(normalized)) {
    return "maintenance";
  }

  return normalized;
};

export const createHotel = async function (req, res) {
  try {
    const {
      slug,
      name,
      tagline,
      location,
      priceFrom,
      images,
      description,
      amenities,
      owner,
    } = req.body;

    if (
      !slug ||
      !name ||
      !tagline ||
      !location ||
      priceFrom == null ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required hotel details.",
      });
    }

    const hotel = await Hotel.create({
      slug,
      name,
      tagline,
      location,
      priceFrom,
      images: images || [],
      description,
      amenities: amenities || [],
      owner: req.user.role === "hotel" ? req.user._id : owner,
    });

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    console.error("Create hotel error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create hotel",
      error: error.message,
    });
  }
};

export async function getAllHotels(req, res) {
  try {
    const hotels = await Hotel.find({ isActive: true }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error("Get hotels error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: error.message,
    });
  }
}

export async function getHotelById(req, res) {
  try {
    const { hotelId } = req.params;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("Get hotel by id error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel",
      error: error.message,
    });
  }
}

export async function getHotelDashboard(req, res) {
  try {
    const { hotelId, slug } = req.query;
    const availability = getAvailabilityRange(req.query);
    if (!availability) {
      return res.status(400).json({
        success: false,
        message:
          "Provide a valid future check-in and check-out date range of up to 365 nights.",
      });
    }

    const hotelQuery = {};

    if (hotelId) hotelQuery._id = hotelId;
    if (slug) hotelQuery.slug = slug;
    if (req.user.role === "hotel") hotelQuery.owner = req.user._id;

    const hotel = await Hotel.findOne(hotelQuery).sort({ createdAt: -1 });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const roomDocuments = await Room.find({ hotel: hotel._id }).sort({
      pricePerNight: 1,
    });
    const rooms = await withRoomAvailability(
      roomDocuments,
      getStayDates(availability),
    );

    const totalRoomCount = rooms.reduce((sum, room) => sum + Number(room.totalRooms || 1), 0);
    const availableRoomCount = rooms.reduce(
      (sum, room) => sum + room.availableRooms,
      0,
    );
    const maintenanceRoomCount = rooms.filter(
      (room) => String(room.status).toLowerCase() === "maintenance",
    ).length;
    const averagePrice =
      rooms.length > 0
        ? rooms.reduce((sum, room) => sum + Number(room.pricePerNight || 0), 0) / rooms.length
        : 0;

    return res.status(200).json({
      success: true,
      hotel,
      stats: {
        totalRooms: totalRoomCount,
        availableRooms: availableRoomCount,
        maintenanceRooms: maintenanceRoomCount,
        averagePricePerNight: Number(averagePrice.toFixed(2)),
      },
      availability: {
        checkInDate: availability.checkInDate,
        checkOutDate: availability.checkOutDate,
      },
      rooms,
    });
  } catch (error) {
    console.error("Get hotel dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
}

export async function createRoom(req, res) {
  try {
    const {
      name,
      roomTypeCode,
      hotelId,
      description,
      maxOccupancy,
      beds,
      bedType,
      pricePerNight,
      image,
      totalRooms,
      hasAC,
      size,
      hasBalcony,
      smokingAllowed,
      photos,
      status,
    } = req.body;
    const inventoryCount =
      totalRooms === undefined
        ? 1
        : typeof totalRooms === "number" || typeof totalRooms === "string"
          ? Number(totalRooms)
          : Number.NaN;

    if (
      !hotelId ||
      !name ||
      !roomTypeCode ||
      !description ||
      maxOccupancy == null ||
      pricePerNight == null ||
      !Number.isInteger(inventoryCount) ||
      inventoryCount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required room details and a positive whole-number room count.",
      });
    }

    const hotelQuery = { _id: hotelId };
    if (req.user.role === "hotel") hotelQuery.owner = req.user._id;

    const hotel = await Hotel.findOne(hotelQuery);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const room = await Room.create({
      hotel: hotel._id,
      name,
      roomTypeCode,
      description,
      maxOccupancy,
      bedType,
      beds: beds || 1,
      pricePerNight,
      size,
      hasAC,
      hasBalcony,
      smokingAllowed,
      image,
      photos: photos || [],
      totalRooms: inventoryCount,
      status: normalizeStatus(status),
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Create room error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create room",
      error: error.message,
    });
  }
}

export async function updateRoom(req, res) {
  const { roomId } = req.params;
  if (!mongoose.isValidObjectId(roomId)) {
    return res.status(400).json({ success: false, message: "Invalid room ID" });
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ success: false, message: "Room updates are required" });
  }

  const allowedFields = [
    "name",
    "roomTypeCode",
    "description",
    "maxOccupancy",
    "beds",
    "bedType",
    "pricePerNight",
    "size",
    "hasAC",
    "hasBalcony",
    "smokingAllowed",
    "image",
    "photos",
    "totalRooms",
    "status",
  ];
  const unsupportedFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field),
  );
  if (unsupportedFields.length) {
    return res.status(400).json({
      success: false,
      message: `Unsupported room field: ${unsupportedFields.join(", ")}`,
    });
  }
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one room field is required",
    });
  }

  const updates = { ...body };
  const numericFields = [
    "maxOccupancy",
    "beds",
    "pricePerNight",
    "size",
    "totalRooms",
  ];
  for (const field of numericFields) {
    if (!Object.hasOwn(updates, field)) continue;
    if (
      !["number", "string"].includes(typeof updates[field]) ||
      (typeof updates[field] === "string" && !updates[field].trim())
    ) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a valid number`,
      });
    }
    const value = Number(updates[field]);
    if (!Number.isFinite(value)) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a valid number`,
      });
    }
    if (field === "totalRooms" && (!Number.isInteger(value) || value < 1)) {
      return res.status(400).json({
        success: false,
        message: "totalRooms must be a positive whole number",
      });
    }
    updates[field] = value;
  }
  for (const field of ["name", "roomTypeCode", "description", "bedType"]) {
    if (!Object.hasOwn(updates, field)) continue;
    if (typeof updates[field] !== "string" || !updates[field].trim()) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a non-empty string`,
      });
    }
    updates[field] = updates[field].trim();
  }
  if (Object.hasOwn(updates, "image") && typeof updates.image !== "string") {
    return res.status(400).json({
      success: false,
      message: "image must be a string",
    });
  }
  for (const field of ["hasAC", "hasBalcony", "smokingAllowed"]) {
    if (Object.hasOwn(updates, field) && typeof updates[field] !== "boolean") {
      return res.status(400).json({
        success: false,
        message: `${field} must be a boolean`,
      });
    }
  }
  if (
    Object.hasOwn(updates, "photos") &&
    (!Array.isArray(updates.photos) ||
      !updates.photos.every((photo) => typeof photo === "string"))
  ) {
    return res.status(400).json({
      success: false,
      message: "photos must be an array of strings",
    });
  }
  if (Object.hasOwn(updates, "status")) {
    if (typeof updates.status !== "string") {
      return res.status(400).json({
        success: false,
        message: "status must be a string",
      });
    }
    updates.status = normalizeStatus(updates.status);
  }

  try {
    const existingRoom = await Room.findById(roomId);
    if (!existingRoom) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const hotelQuery = { _id: existingRoom.hotel };
    if (req.user.role === "hotel") hotelQuery.owner = req.user._id;
    const hotel = await Hotel.findOne(hotelQuery).select("_id");
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (
      Object.hasOwn(updates, "totalRooms") &&
      updates.totalRooms < existingRoom.totalRooms
    ) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const reservedInventory = await RoomReservation.exists({
        room: existingRoom._id,
        roomIndex: { $gte: updates.totalRooms },
        date: { $gte: today },
      });
      if (reservedInventory) {
        return res.status(409).json({
          success: false,
          message:
            "Room count cannot be reduced below inventory reserved for future stays.",
        });
      }
    }

    const room = await Room.findByIdAndUpdate(roomId, updates, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    const defaultAvailability = getAvailabilityRange({});
    const [roomWithAvailability] = await withRoomAvailability(
      [room],
      getStayDates(defaultAvailability),
    );
    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: roomWithAvailability,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Invalid room data",
        errors: Object.values(error.errors).map(({ message }) => message),
      });
    }

    console.error("Update room error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update room",
    });
  }
}

export async function getAllRooms(req, res) {
  try {
    const { hotelId, status } = req.query;
    const availability = getAvailabilityRange(req.query);
    if (!availability) {
      return res.status(400).json({
        success: false,
        message:
          "Provide a valid future check-in and check-out date range of up to 365 nights.",
      });
    }
    const query = {};

    if (hotelId) query.hotel = hotelId;
    if (status) query.status = normalizeStatus(status);

    const roomDocuments = await Room.find(query)
      .populate("hotel", "_id name slug location")
      .sort({ createdAt: -1 });
    const rooms = await withRoomAvailability(
      roomDocuments,
      getStayDates(availability),
    );

    return res.status(200).json({
      success: true,
      count: rooms.length,
      availability: {
        checkInDate: availability.checkInDate,
        checkOutDate: availability.checkOutDate,
      },
      rooms,
    });
  } catch (error) {
    console.error("Get rooms error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
}

export async function getRoomById(req, res) {
  try {
    const { roomId } = req.params;
    const availability = getAvailabilityRange(req.query);
    if (!availability) {
      return res.status(400).json({
        success: false,
        message:
          "Provide a valid future check-in and check-out date range of up to 365 nights.",
      });
    }

    const roomDocument = await Room.findById(roomId).populate(
      "hotel",
      "_id name slug location",
    );

    if (!roomDocument) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const [room] = await withRoomAvailability(
      [roomDocument],
      getStayDates(availability),
    );
    return res.status(200).json({
      success: true,
      room,
      availability: {
        checkInDate: availability.checkInDate,
        checkOutDate: availability.checkOutDate,
      },
    });
  } catch (error) {
    console.error("Get room by id error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch room",
      error: error.message,
    });
  }
}
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
