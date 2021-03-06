const router = require('express').Router();
const { User, Blog, Tag, BlogTag } = require('../../models');

// create a blog post
router.post('/createcomment', async (req, res) => {
  const body = req.body

  let username = req.session.username

  User.findOne({ where: { username: username } })
    .then(user => {
      console.log(user.id)
      body.userId = user.id
    })
    .then(async () => {
      // Create Tag
      await Tag.create(
        {
          tag: body.comment,
          userId: body.userId
        }
      ).then(
        createdTag => {
          var tagId = createdTag.id;
          var blogId = body.blogId;
          // Create BlogTag
          BlogTag.create(
            {
              tagId: tagId,
              blogId: blogId,
            }
          )
        }
      )
    })
    .then(
      res.status(200)
        .json(
          {
            message: 'Tag and BlogTag created successfully'
          }
        )
    );

})

// create a blog post
router.post('/create', (req, res) => {
  const body = req.body
  let username = req.session.username
  // either find a tag with name or create a new one
  // const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.tag }, defaults: { name: tag.tag } })
  //   .spread((tag, created) => tag))
  User.findOne({ where: { username: username } })
    .then(user => {
      // get user's id with username
      // console.log(user.id)
      body.userId = user.id
      // console.log(body)
    })
    .then(async () => {
      await Blog.create(
        {
          // Create a Blog(title, content) with user's id
          title: body.title,
          content: body.content,
          userId: body.userId
        }
      )
      res.send(
        "<script>alert('Created Successfully'); window.location.href='/home';</script>"
      );
    })
    // .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
    // .then(blog => Blog.findOne({ where: { id: blog.id }, include: [User, Tag] }))
    // .then(blogWithAssociations => res.json(blogWithAssociations))
    .catch(err => res.status(400).json({ err: `User with username = [${username}] doesn\'t exist.` }))
})

router.delete('/delete', (req, res) => {
  console.log(req.body)
  Blog.destroy({ where: {} })
    .then(blog => res.json(blog))
    .catch(err => console.log(err))
})

router.get('/all', (req, res) => {
  Blog.findAll().then(blogs => res.json(blogs))
})

module.exports = router;
