import CustomErrorHandler from "../service/CustomErrorHandler";
import { Product, TVProduct } from "../Models";

const productController = {
  //insert tv/movie
  async store(req, res, next) {
    const {
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      vote_average,
      status,
      tagline,
      runtime,
      director,
      writer,
      genres,
    } = req.body;
    let document;
    try {
      document = await Product.create({
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average,
        status,
        tagline,
        runtime,
        director,
        writer,
        genres,
      });
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },

  async TVstore(req, res, next) {
    const {
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_name,
      overview,
      poster_path,
      vote_average,
      status,
      tagline,
      runtime,
      director,
      writer,
      genres,
    } = req.body;
    let document;
    try {
      document = await TVProduct.create({
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_name,
        overview,
        poster_path,
        vote_average,
        status,
        tagline,
        runtime,
        director,
        genres,
        writer,
      });
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },

  //update tv /movie
  async update(req, res, next) {
    const {
      backdrop_path,
      genre_ids,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      vote_average,
      status,
      tagline,
      runtime,
      director,
      writer,
      genres,
    } = req.body;

    try {
      let updatedMovie = await Product.findOneAndUpdate(
        { id: req.params.id },
        {
          backdrop_path,
          genre_ids,
          original_language,
          original_title,
          overview,
          poster_path,
          release_date,
          vote_average,
          status,
          tagline,
          runtime,
          director,
          writer,
          genres,
        },
        { new: true }
      );

      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      res.status(200).json(updatedMovie);
    } catch (err) {
      return next(err);
    }
  },
  async TVupdate(req, res, next) {
    const {
      backdrop_path,
      genre_ids,
      original_language,
      original_name,
      overview,
      poster_path,
      vote_average,
      status,
      tagline,
      runtime,
      director,
      genres,
      writer,
    } = req.body;
    let document;
    try {
      document = await TVProduct.findOneAndUpdate(
        { id: req.params.id },
        {
          backdrop_path,
          genre_ids,
          original_language,
          original_name,
          overview,
          poster_path,
          vote_average,
          status,
          tagline,
          runtime,
          director,
          genres,
          writer
        },
        { new: true }
      );
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },

  //delete tv/movie
  async destroy(req, res, next) {
    const document = await Product.findOneAndRemove({ id: req.params.id });
    if (!document) {
      return next(new Error("Nothing to delete"));
    }
    return res.json(document);
  },
  async TVdestroy(req, res, next) {
    const document = await TVProduct.findOneAndRemove({ id: req.params.id });
    if (!document) {
      return next(new Error("Nothing to delete"));
    }
    return res.json(document);
  },

  //get all movie/tv
  async index(req, res, next) {
    let documents;
    // pagination mongoose-pagination
    try {
      documents = await Product.find()
        .select("-updatedAt -__v -createdAt")
        .sort({ id: -1 });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
  async indexTV(req, res, next) {
    let documents;
    // pagination mongoose-pagination
    try {
      documents = await TVProduct.find()
        .select("-updatedAt -__v -createdAt")
        .sort({ id: -1 });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  //perticular movie/tv
  async show(req, res, next) {
    let document;
    try {
      document = await Product.findOne({ id: +req.params.id }).select(
        "-updatedAt -__v -createdAt"
      );
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(document);
  },
  async TVshow(req, res, next) {
    let document;
    try {
      document = await TVProduct.findOne({ id: +req.params.id }).select(
        "-updatedAt -__v -createdAt"
      );
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(document);
  },
};

export default productController;
