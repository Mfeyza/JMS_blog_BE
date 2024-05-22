"use strict";

const Comment = require("../models/comment");
const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(Comment, {}, "userId");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Comment),
      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Create Comment"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
        }
    */
    const userId = req.user.id;
    req.body.userId = userId;

    const comment = await Comment.create(req.body);
    await Blog.findByIdAndUpdate(req.body.blogId, {
      $push: { comments: comment._id }
    });

    res.status(201).send({
      error: false,
      data: comment,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */
    const comment = await Comment.findOne({ _id: req.params.id }).populate([{ path: "userId", select: "firstName,lastName,image" }]);

    if (!comment) {
      return res.status(404).send({
        error: true,
        message: "Comment not found",
      });
    }

    res.status(200).send({
      error: false,
      data: comment,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
            }
        */
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!comment) {
      return res.status(404).send({
        error: true,
        message: "Comment not found",
      });
    }

    res.status(202).send({
      error: false,
      data: comment,
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).send({
        error: true,
        message: "Comment not found",
      });
    }

    await Blog.findByIdAndUpdate(comment.blogId, {
      $pull: { comments: req.params.id }
    });

    res.status(204).send({
      error: false,
      message: "Comment deleted successfully",
    });
  },
};
