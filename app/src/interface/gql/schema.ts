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

  type BBSResult {
    code: String
  }

  input BBSData {
    member_id: String
    title: String
    body: String
  }

  type Mutation {
    setMessage(message: String): String
    createBBS(payload: BBSData): BBSResult
    mutationExample: Example
  }
`;

export default typeDefs;
