const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const movies = require('./src/models/movie');
const users = require('./src/models/user')
const app = express();

app.use(express.json(), cookieParser(), cors())

// const movies = require('./src/models/movie')
// console.log(movies)

// const users = require('./src/models/user')
// console.log(users)

// 영화 제목 리스트
app.get('/movies', (req, res) => {
    const page = req.query.page || 1
    // console.log(page)

    const movieList = movies.map(movie => ({
        ...movie,
        name: users.find(user => user.id === movie.user_id).name
    }))
    movieList.sort((a, b) => {
        const aTime = new Date(a.created_at).getTime()
        const bTime = new Date(b.created_at).getTime()
        return bTime - aTime
    })
    // console.log(movieList)
    const movieCopy = [...movieList]
    const lastPage = Math.ceil(movies.length / 4)
    // console.log(lastPage)
    const startIndex = (page - 1) * 4
    // console.log(startIndex)
    const movieSplice = movieCopy.splice(startIndex, 4)
    // console.log(movieSplice)

    res.send({
        pageInfo: {lastPage},
        movies: movieSplice
    })
})

/* 
1. 영화 전체 목록을 순회한다.
    const map = movies.map(movie => ({...movie}))
2. 순회 하면서 영화 제목 작성자 (user_id) 에 해당하는 user를 users 에서 검색한다
    users.find(user => user.id === movie.user_id)
3. 2번에 일치하는 user 의 name 만 가져온다
    users.find(user => user.id === movie.user_id).name
4. 가져온 name을 순회중 movie 의 name property 에 추가한다.
    movies.map(movie => ({
        ...movie,
        name: users.find(user => user.id === movie.user_id).name
    }))
*/


// 영화 등록하기
app.post('/movies', (req, res) => {
    const newMovie = req.body
    newMovie.id = movies[movies.length -1].id + 1
    newMovie.hit_count = 0
    var d= new Date();
    newMovie.created_at = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString()
    // console.log(newMovie)
    movies.unshift(newMovie)
    // console.log(movies)
    res.send(newMovie)
})

/*
1. 사용자가 등록할 영화의 정보를 주면 받아온다 from 요청 (req)
    const newMovie = req.body
2. 가져온 영화정보에 id 를 부여한다.
    newMovie.id = movies[movies.length -1].id + 1
3. 조회수 (hit_count) 는 기본으로 0으로 설정한다.
    newMovie.hit_count = 0
4. 작성일은 현재 시각을 넣는다.
    var d= new Date();
    newMovie.created_at = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString()
5. 2~4 전부 부여된 영화정보를 movies 추가한다.
    movies.push(newMovie)
*/


// 영화 상세보기
app.get('/movies/:id', (req, res) => {
    const {id}   = req.params
    // console.log(id)
    const movieId = movies.find(movie => movie.id === Number(id))
    // console.log(movieId)
    const plusHitcount = {
        ...movieId,
        hit_count: movieId.hit_count + 1
    }
    // console.log(plusHitcount)
    const findIndex = movies.findIndex(movie => movie.id === movieId.id)
    // console.log(findIndex)
    movies.splice(findIndex, 1, plusHitcount)
    // console.log(movies)
    res.send(movieId)
})

/*
1. 사용자가 보내준 id 를 가져온다
    const {id}   = req.params
2. id 에 해당하는 movie 를 가져온다
    const movieId = movies.find(movie => movie.id === Number(id))
3. 가져온 movie 에서 hit_count 1을 더한 객체를 만든다
    const plusHitcount = {
        ...movieId,
        hit_count: movieId.hit_count + 1
    }
4. hit_count 1을 더한 객체를 movies 내에서 기존 객체에 치환한다. (findIndex, splice 사용)
    const findIndex = movies.findIndex(movie => movie.id === movieId.id)
    movies.splice(findIndex, 1, plusHitcount)
5. hit_count 1을 더한 객체를 반환한다.
    res.send(movies)
*/

app.listen(3100, () => {
    console.log(3100, "번으로 서버 연결")
})