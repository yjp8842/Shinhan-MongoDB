import mongoose, { Schema } from "mongoose";

const MONGO_HOST = 'mongodb+srv://admin:admin1234@cluster0.6xo1zdz.mongodb.net/'
mongoose.connect(MONGO_HOST, {
  retryWrites: true,
  w: 'majority'
})
  .then((res) => {
    console.log(res);
    console.log("DB 연결 성공");
  })

// const Cat = mongoose.model('Cat', {
//   name: String
// })

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save()
//   .then((data) => {
//     console.log("저장된 데이터");
//     console.log(data);
//   })

// Cat.create({ name: '야옹이' })
//   .then((data) => {
//     console.log("저장된 데이터");
//     console.log(data);
//   })

// Cat.insertMany([
//   {
//     name: '고양이1',
//   }, {
//     name: '고양이2'
//   }
// ])
//   .then((data) => {
//     console.log(data);
//   })

// Cat.find({ name: "야옹이" })
//   .then((data) => {
//     console.log(data);
//   })

// Cat.findById('65bb2098bccd35af0725212c')
//   .then((data) => {
//     console.log(data);
//   })

// Cat.findOne({ name: '야옹이' })
//   .then((data) => {
//     console.log(data);
//   })

// Cat.find({})
//   .then((data) => {
//     console.log(data);
//     console.log('---'.repeat(10));

//     Cat.deleteOne({ name: 'Zildjian' })
//       .then((data) => {
//         console.log(data);
//       })
//   })

// Cat.insertMany({ name: '야옹이' }, { name: '야옹이' }, { name: '야옹이' });

// Cat.updateOne({ name: '야옹이' }, { name: '부엉이' })
//   .then((data) => {
//   console.log(data);
// })

// Cat.updateMany({ name: '부엉이' }, { name: 'meow' })
//   .then((data) => {
//     console.log(data);
//   })

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date
  },
  thumbnail: {
    type: String,
    unique: true,
  },
  story: {
    type: String,
  },
  tags: {
    type: [String],
  }
}, {
  timestamps: true
})

MovieSchema.virtual("reviews", {
  ref: 'Review',
  localField: '_id',
  foreignField: 'movie',
})

const Movie = mongoose.model('Movie', MovieSchema);

// Movie.create({
//   title: '라라랜드',
//   director: '데이미언 셔젤',
//   startDate: '2016-12-07',
//   thumbnail: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTdfMTc2%2FMDAxNzA1NDg5MTk0ODc1.5BQ3f7oOchD3ifogx7XK3pmbE-uJt5FohQEJrel1pHQg.jDVwL-6p9PCAROz5EkhY6iWR2TQ1GzfT1Ja97oqXqcgg.PNG.comjrabbit%2Fimage.png&type=a340",
//   story: "꿈을 꾸는 사람들을 위한 별들의 도시 ‘라라랜드’. 재즈 피아니스트 ‘세바스찬’(라이언 고슬링)과 배우 지망생 ‘미아’(엠마 스톤), 인생에서 가장 빛나는 순간 만난 두 사람은 미완성인 서로의 무대를 만들어가기 시작",
//   tags: [2016, "드라마", "미국"]
// })
//   .then((data) => {
//     console.log(data);
//   })

// Movie.find({ director: '데이미언 셔젤' }).populate('reviews')
//   .then((data) => {
//     console.log(data);
//     console.log(data[0].reviews);
//   })

// const ReviewSchema = new mongoose.Schema({ 
//   writer: {
//     type: String,
//     required: true,
//   },
//   movie: {
//     type: mongoose.Types.ObjectId,
//     required: true,
//     ref: "Movie",
//   },
//   title: {
//     type: String,
//     required: true,
//     validate: function(val){
//       return val.trim() !== "" && val.length > 1;
//     }
//   },
//   content: {
//     type: String,
//     default: ''
//   }
// })

// const Review = mongoose.model('Review', ReviewSchema);

// Review.create({
//   writer: '박유진',
//   movie: '65bb35b92af7a71b16791beb',
//   title: '최고의 영화에요',
//   content: '너무 재미있었고, ...'
// })
//   .then((data) => {
//     console.log(data);
//   })

// Review.find({ writer: "박유진" })
//   .then((review) => {
//     console.log(review);
//   })

// Review.find({ writer: "박유진" }).populate('movie')
//   .then((review) => {
//     console.log(review);
//   })

// Movie.findOne({ title: "라라랜드" })
//   .then((data) => {
//     Review.create({
//       writer: '박유진',
//       movie: data.id,
//       title: '두번째 리뷰',
//     })
//       .then((result) => {
//         console.log(result);
//       })
//   })

const personSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  age: Number,
});

const Person = mongoose.model('Person', personSchema);

Person.insertMany([
  {
    name: {
      first: '유진',
      last: '박',
    },
    age: 26
  },
  {
    name: {
      first: '지민',
      last: '박'
    },
    age: 24
  }
])

Person.find({
  age: { $gt: 17, $lt: 25 },
}).limit(10).sort({ age: -1 }).select({ name: 1, age: 1 })
  .then((data) => {
    console.log(data);
  })