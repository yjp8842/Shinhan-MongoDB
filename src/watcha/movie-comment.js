import dotenv from "dotenv";

import service from "../watcha/watcha-service.js";
import MovieFS from "../watcha/movie-fs.js";

import mongoose from "mongoose";
import Comment from "../models/comment.js";

dotenv.config({ path: "../../.env" });

const MONGO_HOST = process.env.MONGO_URL;
mongoose
  .connect(MONGO_HOST, {
    retryWrites: true,
    w: "majority",
  })
  .then((res) => {
    console.log("연결 성공");
  });

//pedia.watcha.com/
const MAX_COMMENT_SIZE = 9;

async function fetchWatchaMovieComment(movie, page, size = MAX_COMMENT_SIZE) {
  try {
    const response = await service.get(`api/contents/${movie.code}/comments`, {
      params: {
        filter: "all",
        order: "popular",
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

const MAX_COMMENT_NUM = 30;

async function fetchWatchaCommentListing(movieNum, movies) {
  const pageMax = Math.ceil(movieNum / MAX_COMMENT_NUM);
  const result = [];
  let curPage = 1;
  // console.log(`${movies.code} 영화`);

  while (curPage <= pageMax) {
    // console.log(`${curPage}페이지 시도`);
    const data = await fetchWatchaMovieComment(
      movies,
      curPage,
      MAX_COMMENT_SIZE
    );

    if (data.length === 0) {
      await delay(3000);
      continue;
    }
    console.log(`성공`);
    result.push(...data);
    curPage++;
  }
  Comment.create(result);
  return result;
}

const DEFAULT_COMMENT_NUM = 50;

const maxNum = process.argv[2]
  ? parseInt(process.argv[2])
  : DEFAULT_COMMENT_NUM;

const movieArray = MovieFS.loadList();

async function fetchAndSaveComments(movieArray, maxNum) {
  for (let i = 0; i < movieArray.length; i++) {
    try {
      const movie = movieArray[i];
      const movieCommentArray = await fetchWatchaCommentListing(
        maxNum,
        movieArray[i]
      );
      await MovieFS.saveComments(movie.code, movieCommentArray);
      console.log(`${movie.code}-comments 저장 완료`);
    } catch (error) {
      console.error(`댓글 저장 중 오류 발생: ${error.message}`);
    }
  }
}

await fetchAndSaveComments(movieArray, maxNum);
