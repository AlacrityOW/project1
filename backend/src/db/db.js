import {MongoClient} from 'mongodb'

const connect = async () =>{
	const uri = 'mongodb://localhost:27017'
	const client = new MongoClient(uri,{serverSelectionTimeoutMS:2000})
	try {
		await client.connect()
		await client.db("admin").command({ping:1})
		console.log("pinged DB")
	} catch (error) {
		console.log(error)
	}
}

export default connect