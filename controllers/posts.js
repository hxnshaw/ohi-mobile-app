const Post = require("../models/posts");
const Comment = require("../models/comments");

exports.createPost = async (req, res, next) => {
  const post = new Post({ ...req.body, author: req.user._id });
  try {
    await post.save();
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate("comments")
      .exec();

    if (!post) {
      res.status(404).json({
        success: false,
        message: `Not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// exports.createComment = async (req, res, next) => {
//   try {
//     const comment = new Comment({
//       comment: req.body.comment,
//       name: req.body.name,
//     });
//     await comment.save();
//     await Post.findOneAndUpdate({ _id: req.body._id }, { $push: { comment } });

//     res.status(200).json({
//       success: true,
//       data: comment,
//     });
//     console.log(comment);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//     console.log(error);
//   }
// };

exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      name: req.body.name,
    });
    await comment.save();
    const post = await Post.findById(req.params.id);
    post.comments.push(comment);

    await post.save();

    res.status(200).json({
      success: true,
      data: comment,
    });
    console.log(comment);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
    console.log(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.find({});
  try {
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res, next) => {
  //   const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "body"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(404).json({
      success: false,
      error: "Invalid Update.",
    });
  }
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: "Post Not Found",
      });
    }

    updates.forEach((update) => (post[update] = req.body[update]));

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
