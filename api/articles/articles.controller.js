const articlesService = require("./articles.service");

class ArticleController {
  async create(req, res, next) {
    try {
      const article = await articlesService.create(req.body);
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const articleModified = await articlesService.update(id, data);
      res.json(articleModified);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;

      await articlesService.delete(id);
      res.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();
