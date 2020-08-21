const { db } = require("../util/admin");

exports.getAllBlogs = (req, res) => {
  db.collection("blogs")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let blogs = [];
      data.forEach((doc) => {
        blogs.push({
          title:doc.data().title,
          blogId: doc.id,
          body: doc.data().body,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
        });
      });
      return res.json(blogs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.createBlog = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "must not be empty" });
  }

  const newBlog = {
    title:req.body.title,
    body: req.body.body,
    userName: req.user.userNameC,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("blogs")
    .add(newBlog)
    .then((doc) => {
      const resBlog = newBlog;
      resBlog.blogId = doc.id;
      res.json(resBlog);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
// Fetch one scream
exports.getBlog = (req, res) => {
  let blogData = {};
  db.doc(`/blogs/${req.params.blogId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Blog not found" });
      }
      blogData = doc.data();
      blogData.blogId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("blogId", "==", req.params.blogId)
        .get();
    })
    .then((data) => {
      blogData.comments = [];
      data.forEach((doc) => {
        blogData.comments.push(doc.data());
      });
      return res.json(blogData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
// Comment on a comment
exports.commentOnBlog = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Must not be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    blogId: req.params.blogId,
    userName: req.user.userNameC,
    userImage: req.user.imageUrl,
  };
  console.log(newComment);

  db.doc(`/blogs/${req.params.blogId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};
// Like a scream
exports.likeBlog = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userNameC)
    .where("blogId", "==", req.params.blogId)
    .limit(1);

  const blogDocument = db.doc(`/blogs/${req.params.blogId}`);

  let blogData;

  blogDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        blogData = doc.data();
        blogData.blogId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Blog not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            blogId: req.params.blogId,
            userName: req.user.userNameC,
          })
          .then(() => {
            blogData.likeCount++;
            return blogDocument.update({ likeCount: blogData.likeCount });
          })
          .then(() => {
            return res.json(blogData);
          });
      } else {
        return res.status(400).json({ error: "Blog already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikeBlog = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userNameC)
    .where("blogId", "==", req.params.blogId)
    .limit(1);

  const blogDocument = db.doc(`/blogs/${req.params.blogId}`);

  let blogData;

  blogDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        blogData = doc.data();
        blogData.blogId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Blog not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Blog not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            blogData.likeCount--;
            return blogDocument.update({ likeCount: blogData.likeCount });
          })
          .then(() => {
            res.json(blogData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
// Delete a scream
exports.deleteBlog = (req, res) => {
  const document = db.doc(`/blogs/${req.params.blogId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Blog not found" });
      }
      if (doc.data().userName !== req.user.userNameC) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Blog deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
