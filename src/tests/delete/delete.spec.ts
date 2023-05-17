import { expect, assert, use, request } from "chai";
import chaiHttp from "chai-http";
use(chaiHttp);

export const deleteTestCases = (server: any) => {
  it("Testcase 1", async () => {
    const response: any = await request(server).delete("/api/notes/delete");

    expect(response).to.have.status(404);

  });

  it("Testcase 2", async () => {
    const response: any = await request(server).delete("/api/notes/delete/2");

    expect(response).to.have.status(200);
    expect(response.body.error).to.be.an("boolean");
    expect(response.body.error).equal(false);
    expect(response.body).to.have.keys(["error", "message", "data"]);
  });

  it("Testcase 3", async () => {
    const response: any = await request(server).delete("/api/notes/delete/-1");

    expect(response).to.have.status(400);
    expect(response.body.error).to.be.an("boolean");
    expect(response.body.error).equal(true);
    expect(response.body).to.have.keys(["error", "message", "data"]);
    expect(response.body.data).to.be.an.empty;
    expect(response.body.message).to.be.an("string").equals("Invalid Id");
  });
};
