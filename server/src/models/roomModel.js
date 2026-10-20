import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    /*
     * Public room identifier
     *
     * Example:
     * presidential-ocean-suite
     */
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 150,

      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    /*
     * MANY ROOMS -> ONE HOTEL
     */
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    maxOccupancy: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },

    beds: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    bedType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    highlights: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: 150,
        },
      ],

      validate: {
        validator: function (highlights) {
          return highlights.length <= 20;
        },

        message: "A room can have a maximum of 20 highlights.",
      },
    },

    /*
     * Useful for booking logic
     */
    totalRooms: {
      type: Number,
      default: 1,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

// A room slug only needs to be unique inside a hotel
roomSchema.index(
  {
    hotel: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);

// Useful when searching rooms for a hotel
roomSchema.index({
  hotel: 1,
  isActive: 1,
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
