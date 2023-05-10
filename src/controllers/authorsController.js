import authors from "../models/Author.js";

class AuthorController {
  // list authors
  static getAuthors = async (req, res) => {
    try {
      const authorsResponse = await authors.find();
      res.status(200).json(authorsResponse);
    } catch (err) {
      res.status(500).json({ message: `${err} Server Error` });
    }
  };

  // list author by ID
  static getAuthorkById = async (req, res) => {
    try {
      const id = req.params.id;
      const searchedAuthor = await authors.findById(id);
      res.status(200).send(searchedAuthor);
    } catch (err) {
      res.status(400).send({
        message: `${err} Author identifier failed. Please check for valid id.`,
      });
    }
  };

  // register new author
  static createNewAuthor = async (req, res) => {
    try {
      let author = new authors(req.body);
      const newAuthor = await author.save();
      res.status(201).send(newAuthor.toJSON());
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
      res.status(201).send({ message: `Author ${id} updated.` });
    } catch (err) {
      res.status(500).send({
        message: `${err} Author validation failed. Please check the required params.`,
      });
    }
  };

  // delete author
  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(201).send({ message: `Author deleted.` });
    } catch (err) {
      res.status(500).send({
        message: `${err} Author destruction failed. Please check the required params.`,
      });
    }
  };
}

export default AuthorController;
