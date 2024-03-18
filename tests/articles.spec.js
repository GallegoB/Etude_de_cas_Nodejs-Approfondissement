const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");
const articlesService = require("../api/articles/articles.service");

describe("Test API article", () => {
  let token;
  const USER_ID = "fake";
  const ARTICLE_ID = "fake";
  const MOCK_DATA = [
    {
      _id: USER_ID,
      name: "ana",
      email: "nfegeg@gmail.com",
      password: "azertyuiop",
    },
  ];
  const MOCK_DATA_CREATED = {
    title: "titre Test",
    content: "sdjqcsqjdhqdhj",
  };
  const MOCK_DATA_UPDATE = {
    _id: ARTICLE_ID,
    title: "titre Test Update",
    content: "Update test",
  };

  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
    mockingoose(Article).toReturn(MOCK_DATA, "find");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "insertMany");
  });

  test("Create article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED)
      .set("x-access-token", token);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
  });

  test("Update article", async () => {
    const res = await request(app)
      .put(`/api/articles/${ARTICLE_ID}`)
      .send(MOCK_DATA_UPDATE)
      .set("x-access-token", token);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(MOCK_DATA.title);
  });

  test("Delete article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token);
    expect(res.status).toBe(204);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
