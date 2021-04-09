import { connect } from 'mongoose'

// const MongoClient = require('mongodb').MongoClient;
export const MongoConnect = () => {
  const uri = process.env.MONGO_URL ?? ''
  connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo Connection Established'))
  .catch(err => console.error(err))
}
