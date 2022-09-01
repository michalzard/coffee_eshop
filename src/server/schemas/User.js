const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Email is invalid",
      },
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Username needs to be atleast 3 characters"],
      maxLength: [30, "Username cannot exceed 30 characters"],
    },
    tag: {
      type: String,
      trim: true,
      unique: true,
    },
    //no need for validators since password is encrypted into long hash before its inputted to this doc
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      photoURL: {
        type: String,
        trim: true,
        default: "",
      },
      bio: {
        type: String,
        trim: true,
        minLength:[1,"Bio needs to be between 1-200"],
        maxLength:[200,"Bio needs to be between 1-200"],
      },
      location: {
        type: String,
        trim: true,
        default: "",
      },
      web: {
        type: String,
        trim: true,
        default: "",
      },
      birthday: {
        type: Date,
        default: Date.now(),
      },
      followers: {
        followedBy: [
          { type: mongoose.Types.ObjectId, ref: "User", default: [] },
        ],
        followedByCount: {
          type: Number,
          default: 0,
        },
        following: [
          { type: mongoose.Types.ObjectId, ref: "User", default: [] },
        ],
        followingCount: {
          type: Number,
          default: 0,
        },
      },
      blockedBy: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
      bookmarks: [
        { type: mongoose.Types.ObjectId, ref: "Bookmark", default: [] },
      ],

      recentSearches: [
        { type: mongoose.Types.ObjectId, ref: "User", default: [] },
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.block = function (requesterId) {
  if (
    mongoose.isValidObjectId(requesterId) &&
    !this.profile.blockedBy.includes(requesterId)
  ) {
    this.profile.blockedBy.push(requesterId);
    this.save();
    return this.profile.blockedBy;
  } else return this.profile.blockedBy;
};
userSchema.methods.unBlock = function (requesterId) {
  if (
    mongoose.isValidObjectId(requesterId) &&
    this.profile.blockedBy.includes(requesterId)
  ) {
    if (this.profile.blockedBy.includes(requesterId)) {
      const unblockIndex = this.profile.blockedBy.indexOf(requesterId);
      this.profile.blockedBy.splice(unblockIndex, 1);
    }
    this.save();
    return this.profile.blockedBy;
  } else return this.profile.blockedBy;
};

userSchema.methods.follow = function (userId) {
  const { followers } = this.profile;
  if (
    mongoose.isValidObjectId(userId) &&
    !followers.following.includes(userId)
  ) {
    followers.following.push(userId);
    followers.followingCount++;
    this.save();
    return followers;
  } else return followers;
};

userSchema.methods.unfollow = function (userId) {
  const { followers } = this.profile;
  if (
    mongoose.isValidObjectId(userId) &&
    followers.following.includes(userId)
  ) {
    const fIndex = followers.following.indexOf(userId);
    followers.following.splice(fIndex, 1);
    followers.followingCount--;
    this.save();
    return followers;
  } else return followers;
};

userSchema.methods.addFollowedBy = function (userId) {
  const { followers } = this.profile;
  if (
    mongoose.isValidObjectId(userId) &&
    !followers.followedBy.includes(userId)
  ) {
    followers.followedBy.push(userId);
    followers.followedByCount++;
    this.save();
    return followers;
  } else return followers;
};

userSchema.methods.removeFollowedBy = function (userId) {
  const { followers } = this.profile;
  if (
    mongoose.isValidObjectId(userId) &&
    followers.followedBy.includes(userId)
  ) {
    const index = followers.followedBy.indexOf(userId);
    followers.followedBy.splice(index, 1);
    followers.followedByCount--;
    this.save();
    return followers;
  } else return followers;
};

userSchema.methods.addRecentSearch = function (userId) {
  if (
    mongoose.isValidObjectId(userId) &&
    !this.profile.recentSearches.includes(userId)
  ) {
    this.profile.recentSearches.push(userId);
    this.save();
    return this.profile.recentSearches;
  } else return this.profile.recentSearches;
};
userSchema.methods.clearRecentSearchList = function () {
  this.profile.recentSearches = [];
  this.save();
  return this.profile.recentSearches;
};

module.exports = mongoose.model("User", userSchema);
