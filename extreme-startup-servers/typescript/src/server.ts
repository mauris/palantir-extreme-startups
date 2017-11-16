import * as express from "express";

import {respondTo} from "./respondTo";

const app = express();

app.get("/", (request: any, response: any) => {
  const query = request.query["q"];
  console.log("A request has arrived:");
  console.log(query);

  const answer = respondTo(query);
  console.log('Our answer is: ' + answer);
  response.end(answer);
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Typescript Extreme Startup Server running on port ${PORT}`);
});
