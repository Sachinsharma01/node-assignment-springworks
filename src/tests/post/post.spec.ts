import { expect, assert, use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);

export const postTestCases = (server: any) => {
  it("Testcase 1", async () => {
    const response: any = await request(server)
      .post("/api/notes/add")
      .send({ note: "This is a testcase task." })
    expect(response).to.have.status(200);
    expect(response.error).equal(false);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.data).to.have.keys(["noteId", "note"]);
    expect(response.body.error).to.be.an("boolean");
  });

  it("Testcase 2", async () => {
    const response: any = await request(server)
      .post("/api/notes/add")
      .send({})
    expect(response).to.have.status(400);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.error).to.be.an("boolean");
    expect(response.body.error).equal(true);
    expect(response.body.data).to.be.an.empty;
  });
};
