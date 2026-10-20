import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    _id: false,
  },
);

const hotelSchema = new mongoose.Schema(
  {
    /*
     * Public identifier / slug
     * Example:
     * obsidian-sanctum
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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

    tagline: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    priceFrom: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],

      validate: {
        validator: function (images) {
          return images.length <= 20;
        },

        message: "A hotel can have a maximum of 20 images.",
      },
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 5000,
    },

    amenities: {
      type: [amenitySchema],
      default: [],
    },

    /*
     * Optional:
     * useful if you have hotel owners/admins
     */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
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

// Indexes
hotelSchema.index({
  name: "text",
  location: "text",
});

hotelSchema.index({
  slug: 1,
});

hotelSchema.index({
  location: 1,
  isActive: 1,
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
