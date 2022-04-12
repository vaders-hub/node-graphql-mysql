import { gql } from "apollo-server-express";

const typeDefs = gql`
  type BBS {
    title: String
    body: String
  }

  type Example {
    message: String
  }

  type Query {
    queryBBS: BBS
  }

  input BBSData {
    title: String
    body: String
  }

  type Mutation {
    setMessage(message: String): String
    createBBS(payload: BBSData): Boolean
    mutationExample: Example
  }
`;

export default typeDefs;
