import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "https://selfgram-backend.herokuapp.com/"
      : "https://selfgram-backend.herokuapp.com/",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
