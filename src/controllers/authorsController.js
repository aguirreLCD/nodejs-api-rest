import NotFound from "../errors/NotFound.js";
import authors from "../models/Author.js";

class AuthorController {
  // list authors
  static getAuthors = async (req, res, next) => {
    try {
      const authorsResponse = await authors.find();
      res.status(200).json(authorsResponse);
    } catch (err) {
      next(err);
      // console.log("getAuthors catch err: ", err);
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
        next(new NotFound("Author id not found"));
        // console.log("getAuthorById else err: ", err);
      }
    } catch (err) {
      next(err);
      // console.log("getAuthorById catch err: ", err);
    }
  };

  // register new author
  static createNewAuthor = async (req, res, next) => {
    try {
      let author = new authors(req.body);
      const newAuthor = await author.save();
      res.status(201).send(newAuthor.toJSON());
    } catch (err) {
      next(err);
      // console.log("createNewAuthor catch err: ", err);
    }
  };

  // update author
  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorToUpdate = await authors.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (authorToUpdate !== null) {
        res.status(201).send({ message: `Author ${id} updated.` });
      } else {
        next(new NotFound("Author to update not found"));
      }
    } catch (err) {
      next(err);
      // console.log("updateAuthor catch err: ", err);
    }
  };

  // delete author
  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorToDelete = await authors.findByIdAndDelete(id);

      if (authorToDelete !== null) {
        res.status(201).send({ message: `Author deleted.` });
      } else {
        next(new NotFound("Author to delete not found."));
      }
    } catch (err) {
      next(err);
      // console.log("deleteAuthor catch err: ", err);
    }
  };
}

export default AuthorController;
