import { expect, assert, use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);

export const updateTestCases = (server: any) => {
  it("Testcase 1", async () => {
    const response: any = await request(server).patch("/api/notes/delete");

    expect(response).to.have.status(404);
  });

  it("Testcase 2", async () => {
    const response: any = await request(server)
      .patch("/api/notes/update/2")
      .send({});

    expect(response).to.have.status(400);
    expect(response.body.error).to.be.an("boolean");
    expect(response.body.error).equal(true);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.message)
      .to.be.an("string")
      .equals("Body can not be empty");

    expect(response.body.data).to.be.an.empty;
  });

  it("Testcase 3", async () => {
    const response: any = await request(server)
      .patch("/api/notes/update/2")
      .send({ note: "This is an updated note" });

    expect(response).to.have.status(200);
    expect(response.body.error).to.be.an("boolean");
    expect(response.body.error).equal(false);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.message).to.be.an("string");
    expect(response.body.data).keys(["note"]);
  });

  it("Testcase 4", async () => {
    const response: any = await request(server)
      .patch('/api/notes/update/-2')
      .send({note: "This a new updated note"});

    expect(response).to.have.status(400);
    expect(response.body.error).to.be.an("boolean");
    expect(response.body.error).equal(true);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.data).to.be.an.empty;
    expect(response.body.message).to.be.an("string").equals("Invalid Id");
  });
};
