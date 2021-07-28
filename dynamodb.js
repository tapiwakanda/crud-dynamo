const AWS = require('aws-sdk')
require('dotenv').config()

// please use your own IAM access credentials you would have created.
// remember to store the actual values in a .env file
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const TABLE_MEMBERS = "crud-api-members"


// this function is for adding/updating an entry/member in the table
// make sure you add the item being added and the table name in the params const
const addMember = async (member) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Item: member
    }

    return await dynamoClient.put(params).promise()
}

// this function is retrieving a table entry by its id.
// make sure you include the id key in the params const
const getMemberById = async (id) => {
    const params = {
        TableName: TABLE_MEMBERS,
        Key: {
            id
        }
    }
    return await dynamoClient.get(params).promise()
}

// this function is retrieving all entries in the table
const getMembers = async () => {
    const params = {
        TableName: TABLE_MEMBERS
    }

    const members = await dynamoClient.scan(params).promise()
    console.log(members)
    return members
}

// this function is deleting a table entry by its id.
// make sure you include the id key in the params const
const deleteMember = async (id) => {
    const  params = {
        TableName: TABLE_MEMBERS,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise()
}

// sample table entry
const member = 
    {
        id: "6",
        Name: 'Rainn',
        Surname: 'Scott',
        Gender: 'Male',
        Age: 24
    }

//export our functions to be used for our api
module.exports = {
    dynamoClient,
    getMembers,
    addMember,
    getMemberById,
    deleteMember
}
