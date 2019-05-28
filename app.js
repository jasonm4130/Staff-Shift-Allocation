const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
    '/api',
    graphqlHttp({

        schema: buildSchema(`
            type RootQuery {
                shifts: [String!]!
            }

            type RootMutation {
                createShift(day: String): String
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),

        rootValue: {
            shifts: () => {
                return [
                    'SAT',
                    'SUN',
                ]
            },
            createShift: (args) => {
                const shiftDay = args.day;
                return shiftDay;
            }
        },

        graphiql: true,
    })
);

app.listen(3000);