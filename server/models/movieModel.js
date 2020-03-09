//Select one db to work with:

//For SQL
const db = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb')

module.exports = {

  //mysql
  db: {
    create: (data, done) => {
      const params = [data.id,data.vote_average,data.title,data.release_date,data.poster_path]
      const queryStr =`INSERT INTO MovieInfo (id,vote_average,title,release_date,poster_path)
      VALUES (?,?,?,?,?);`
      db.query(queryStr,params,done)

    },
    delete: (params, done) => {
      const queryStr = `DELETE FROM MovieInfo WHERE id=?`;
      db.query(queryStr,params,done)
    },
    get: (done) => {

      const queryStr = `SELECT * FROM MovieInfo`;
      db.query(queryStr,done)
    }
  },


  //mongooss
  mongoDb: {
      create: (video) => {
        return db.findOneAndUpdate(
        { id: video.id },
              {
                title: video.title,
                id: video.id,
                poster_path: video.poster_path,
                vote_average: video.vote_average,
                release_date: video.release_date
              },
              {
                new: true,
                upsert: true
              })
            .exec()
      },


      delete: (video) => {
        return db
          .deleteOne({id:video})
        .exec()
      },
      find: () => {
        return db.find({}).exec()
      }
    }
}