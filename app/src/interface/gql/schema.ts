import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Thread {
    title: String
    body: String
  }
  type Res {
    code: String
    data: [Thread]
  }
  type BBS {
    code: String
    data: [Thread]
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
