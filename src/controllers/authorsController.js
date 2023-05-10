import authors from "../models/Author.js";

class AuthorController {
  // list authors
  static getAuthors = async (req, res, next) => {
    try {
      const authorsResponse = await authors.find();
      res.status(200).json(authorsResponse);
    } catch (err) {
      console.log("getAuthors catch err: ", err);
      next(err);
    }
  };

  // list author by ID
  static getAuthorkById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const searchedAuthor = await authors.findById(id);

      if (searchedAuthor !== null) {
        res.status(200).send(searchedAuthor);
      } else {
        console.log("getAuthorById else err: ", err);
        res.status(404).send({ message: "Author not founded." });
      }
    } catch (err) {
      console.log("getAuthorById catch err: ", err);
      next(err);
    }
  };

  // register new author
  static createNewAuthor = async (req, res, next) => {
    try {
      let author = new authors(req.body);
      const newAuthor = await author.save();
      res.status(201).send(newAuthor.toJSON());
    } catch (err) {
      console.log("createNewAuthor catch err: ", err);
      next(err);
    }
  };

  // update author
  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, { $set: req.body });
      res.status(201).send({ message: `Author ${id} updated.` });
    } catch (err) {
      console.log("updateAuthor catch err: ", err);
      next(err);
    }
  };

  // delete author
  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(201).send({ message: `Author deleted.` });
    } catch (err) {
      console.log("deleteAuthor catch err: ", err);
      next(err);
    }
  };
}

export default AuthorController;
