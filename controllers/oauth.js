const router = require('express').Router();

// router.use(someMiddleware);

router.get('/', function(req,res){
  res.status(200).json({ message: 'OAuth get placeholder!' })
});

router.get('/:id',function(req,res){
  const itemId = req.params.id
  res.status(200).json({itemId:itemId});
});

module.exports = router;