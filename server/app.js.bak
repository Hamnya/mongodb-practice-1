const Express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");

const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql");

var app = Express();
var cors = require("cors");
const uri = "mongodb+srv://hannalee:Kyunghee11!@cluster0.l6rac1d.mongodb.net/sample_supplies?retryWrites=true&w=majority";

app.use(cors());
 

mongoose
    .connect(uri)
    .then(() => console.log("Connected to database..."))
    .catch(err => console.error(err));

const SupplyModel = mongoose.model("sales", { // collections 명이랑 똑같아야함 
    storeLocation: String,
    purchaseMethod: String
})

const SupplyType = new GraphQLObjectType({
    name: "Supply",
    fields: {
        id: { type: GraphQLID},
        storeLocation : { type: GraphQLString },
        purchaseMethod : { type: GraphQLString }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query", 
            fields: {
                // query 1
                supply : {
                    type: GraphQLList(SupplyType),
                    resolve: (root, args, context, info) => {
                        return SupplyModel.find().exec();
                    }
                }, 
                // query 2
                supplyByID : {
                    type: SupplyType,
                    args: {
                        id: { type: GraphQLNonNull(GraphQLID)}
                    },
                    resolve: (root, args, context, info) => {
                        return SupplyModel.findById(args.id).exec();
                    }
                },
                // query3
                supplyByLocation: {
                    type: GraphQLList(SupplyType),
                    args: {
                            storeLocation: { type: GraphQLString }
                    },
                    resolve: (root, args, context, info) => {
                        return SupplyModel.find({'storeLocation': args.storeLocation}).exec();
                    } 
                } 
                 
        }
    })
});

app.use("/supply", ExpressGraphQL({schema, graphiql: true}));

app.listen(3001, () => {
    console.log ("sever running at 3001");
});