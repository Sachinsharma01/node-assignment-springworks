import chaiHttp from "chai-http";
import { use } from "chai";
import server from "../index";
import { getTestCases } from "./get/get.spec";
import { postTestCases } from "./post/post.spec";
import { deleteTestCases } from "./delete/delete.spec";
import { updateTestCases } from "./update/update.spec";

use(chaiHttp);

describe("GET Endpoint", () => {
  getTestCases(server);
});

describe("POST Endpoint", () => {
  postTestCases(server);
});

describe("DELETE Endpoint", () => {
  deleteTestCases(server);
});

describe("PATCH Endpoint", () => {
  updateTestCases(server);
});
