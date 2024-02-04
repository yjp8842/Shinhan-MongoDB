import mongoose from "mongoose";

const schema = {
  code: String,
  content_type: String,
  title: String,
  year: Number,
  poster: {
    hd: String,
    xlarge: String,
    large: String,
    medium: String,
    small: String,
  },
  badges: [{ service: String, name: String, image: String }],
  on_watchaplay: Boolean,
  ratings_avg: Number,
  director_names: [String],
  stillcut: {
    original: String,
    fullhd: String,
    xlarge: String,
    large: String,
    medium: String,
    small: String,
  },
  nations: [{ name: String }],
  genres: [String],
  // description: String,
  // ratings_count: Number,
  // videos: [
  //   { id: String, title: String, image: String, url: String, duration: Number },
  // ],
  // credits: {
  //   next_uri: String,
  //   result: [
  //     {
  //       type: String,
  //       department: String,
  //       job: String,
  //       person: {
  //         id: Number,
  //         code: String,
  //         name: String,
  //         photo: { medium: String, small: String },
  //       },
  //       is_clickable: Boolean,
  //     },
  //   ],
  // },
  // external_services: [
  //   {
  //     id: String,
  //     name: String,
  //     icon: String,
  //     action: String,
  //     action_label: String,
  //     href: String,
  //     main_action_label: String,
  //     main_action_href: String,
  //     is_collaborate: Boolean,
  //     is_outlink: Boolean,
  //   },
  // ],
  // comments: {
  //   next_uri: String,
  //   result: [
  //     {
  //       code: String,
  //       user: {
  //         code: String,
  //         name: String,
  //         photo: { original: String, large: String, small: String },
  //         watcha_play_user: Boolean,
  //         official_user: Boolean,
  //       },
  //       text: String,
  //       likes_count: Number,
  //       replies_count: Number,
  //       content_code: String,
  //       user_code: String,
  //       spoiler: Boolean,
  //       improper: Boolean,
  //       replyable: Boolean,
  //       created_at: String,
  //       user_content_action: {
  //         rating: Number,
  //         mehed: Boolean,
  //         user_code: String,
  //         content_code: String,
  //       },
  //     },
  //   ],
  // },
  // comments_count: Number,
  // display_comments_count: String,
  // ratings_distribution: {
  //   1: Number,
  //   2: Number,
  //   3: Number,
  //   4: Number,
  //   5: Number,
  //   6: Number,
  //   7: Number,
  //   8: Number,
  //   9: Number,
  //   10: Number,
  // },
  // gallery: [
  //   {
  //     original: String,
  //     fullhd: String,
  //     xlarge: String,
  //     large: String,
  //     medium: String,
  //     small: String,
  //   },
  // ],
  // decks: {
  //   next_uri: String,
  //   result: [
  //     {
  //       code: String,
  //       title: String,
  //       description: String,
  //       contents_count: Number,
  //       likes_count: Number,
  //       replies_count: Number,
  //       created_at: String,
  //       updated_at: String,
  //       user: {
  //         code: String,
  //         name: String,
  //         photo: { original: String, large: String, small: String },
  //         watcha_play_user: Boolean,
  //         official_user: Boolean,
  //       },
  //       poster_images: [{ content_type: String, url: String }],
  //     },
  //   ],
  // },
  // decks_count: Number,
  // similars: { next_uri: String },
  // original_title: String,
  // duration: Number,
  // age_rating_short: String,
  // age_rating_long: String,
  // tod_info: {
  //   href: String,
  //   possession_price: {
  //     base: { cents: Number, currency: String, format: String },
  //     event_min: { cents: Number, currency: String, format: String },
  //   },
  //   rental_price: {
  //     base: { cents: Number, currency: String, format: String },
  //     event_min: { cents: Number, currency: String, format: String },
  //   },
  // },
};
const MovieSchema = new mongoose.Schema(schema, {});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
