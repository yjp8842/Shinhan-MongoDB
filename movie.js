import mongoose, { Schema } from "mongoose";
import axios from "axios";
import * as cheerio from 'cheerio';

async function getData() {
  try {
    const url = 'https://pedia.watcha.com/ko-KR';
    const response = await axios.get(url, {
      headers: {
        'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      }
    })
    const $ = cheerio.load(response.data);

    $('.w_exposed_cell').map((i, el) => {
      let movieList = $(el).find('li');

      movieList.map((i, el) => {
        const movieLink = $(el).find('a').prop('href');

        async function getDetail() {
          const detail_url = `${movieLink}`;

          try {
            const details = await axios.get(detail_url, {
              headers: {
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
              }
            })
            const $ = cheerio.load(details.data);

            const title = $('.css-1tlhtfm-StyledTitle').text();
            const director = $('.css-16sgdn2').text();
            const thumbnail = $('.css-mkiodl-StyledContentInfoOnWallpaper-createMediaQuery-createMediaQuery-createMediaQuery-createMediaQuery-pageMarginStyle > div')

          } catch(err) {
            console.log(err);
          }
        }

      })
    })

    const MONGO_HOST = 'mongodb+srv://admin:admin1234@cluster0.6xo1zdz.mongodb.net/movie'
    mongoose.connect(MONGO_HOST, {
      retryWrites: true,
      w: 'majority'
    })
      .then((res) => {
        console.log(res);
        console.log("DB 연결 성공");
      })
    
    const MovieSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      director: {
        type: String,
        required: true
      },
      thumbnail: {
        type: String,
        unique: true
      },
      tags: {
        type: [String]
      }
    })
    
    const ReviewSchema = new mongoose.Schema({ 
      writer: {
        type: String,
        required: true,
      },
      movie: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Movie",
      },
      content: {
        type: String,
        required: true,
        default: ''
      },
      voting: {
        type: Number,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    })
    
    const Movie = mongoose.model('Movie', MovieSchema);
    const Review = mongoose.model('Review', ReviewSchema);
  } catch (err) {
    console.log(err);
  }
}
