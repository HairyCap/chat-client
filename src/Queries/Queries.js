import { gql } from "apollo-boost";

const getMsgsQuery = gql`
  {
    msgs {
      content
      userId
      id
    }
  }
`;

const addMsgMutation = gql`
  mutation($userId: ID!, $content: String!) {
    addMsg(userId: $userId, content: $content) {
      userId
      content
    }
  }
`;

export { getMsgsQuery, addMsgMutation };
