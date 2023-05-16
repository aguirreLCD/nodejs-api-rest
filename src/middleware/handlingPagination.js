import InvalidRequest from "../errors/InvalidRequest.js";

async function handlingPagination(req, res, next) {
  try {
    let { limit = 5, page = 1, arrangement = "_id:-1" } = req.query;

    let [sortedBy, order] = arrangement.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const results = req.results;

    if (limit > 0 && page > 0) {
      const paginatedResults = await results
        .find()
        .sort({ [sortedBy]: order })
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(paginatedResults);
    } else {
      next(new InvalidRequest());
    }
  } catch (err) {
    next(err);
  }
}

export default handlingPagination;
