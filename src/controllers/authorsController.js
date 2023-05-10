import authors from "../models/Author.js";

class AuthorController {
  // list authors
  static getAuthors = async (req, res) => {
    try {
      const authorsResponse = await authors.find();
      res.status(200).json(authorsResponse);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // list author by ID
  static getAuthorkById = async (req, res) => {
    const id = req.params.id;
    try {
      let searchedAuthor = await authors.findById(id);
      res.status(201).send(searchedAuthor.toJSON());
    } catch (err) {
      res.status(400).send({
        message: `${err} Author identifier failed. Please check for valid id.`,
      });
    }
  };

  // register new author
  static createNewAuthor = async (req, res) => {
    try {
      let author = await new authors(req.body);
      author.save();
      res.status(201).send(author.toJSON());
    } catch (err) {
      res.status(500).send({
        message: `${err} Something went wrong. Author validation failed. Please check the required params.`,
      });
    }
  };

  // update author
  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, { $set: req.body });
      res.status(201).send({ message: `author ${id} updated.` });
    } catch (err) {
      res.status(500).send({
        message: `${err} author validation failed. Please check the required params.`,
      });
    }
  };

  // delete author
  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(201).send({ message: `author deleted.` });
    } catch (err) {
      res.status(500).send({
        message: `${err} author destruction failed. Please check the required params.`,
      });
    }
  };
}

export default AuthorController;
