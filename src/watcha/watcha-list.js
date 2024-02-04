import dotenv from "dotenv";

import service from "../watcha/watcha-service.js";
import MovieFS from "../watcha/movie-fs.js";

import mongoose from "mongoose";
import Movie from "../models/movie.js";

dotenv.config({ path: "../../.env" });

const MONGO_HOST = MONGO_HOST_URL;
mongoose
  .connect(MONGO_HOST, {
    retryWrites: true,
    w: "majority",
  })
  .then((res) => {
    console.log("연결 성공");
  });

const WATCHA_POPULAR = "api/staffmades/278/contents";

const MAX_MOVIE_SIZE = 30;

async function fetchWatchaMovieListingPage(page, size = MAX_MOVIE_SIZE) {
  try {
    const response = await service.get(WATCHA_POPULAR, {
      params: {
        page: page,
        size: size,
      },
    });
    const data = response.data;
    return data.result.result;
  } catch {
    return [];
  }
}

async function delay(ms) {
  return await setTimeout(() => {}, ms);
}

async function fetchWatchaMovieListing(movieNum) {
  const pageMax = Math.ceil(movieNum / MAX_MOVIE_SIZE);
  const result = [];
  let curPage = 1;

  while (curPage <= pageMax) {
    console.log(`${curPage}페이지 시도`);
    const data = await fetchWatchaMovieListingPage(curPage, MAX_MOVIE_SIZE);
    if (data.length === 0) {
      await delay(3000);
      continue;
    }
    console.log(`성공`);
    result.push(...data);
    // mongoDB에 영화 데이터 저장
    Movie.create(data);
    curPage++;
  }
  return result;
}
const DEFAULT_MOVIENUM = 50;

const maxNum = process.argv[2] ? parseInt(process.argv[2]) : DEFAULT_MOVIENUM;

fetchWatchaMovieListing(maxNum).then((result) => {
  MovieFS.saveList(result);
});
