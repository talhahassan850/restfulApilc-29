const express = require("express");
var router = express.Router();
const validateProduct = require("../../midlewares/validation");
const auth = require("../../midlewares/auth");
const admin = require("../../midlewares/admin");
var {ProductModel} = require("../../models/schema") ;

/* GET users listing. */
//http://localhost:3000/api/product?page=1&perPage=2
router.get("/",  async (req, res) => {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = perPage * (page - 1);
    let products = await ProductModel.find().skip(skipRecords).limit(perPage);
    let total = await ProductModel.countDocuments();
    return res.send({total,products});
    //return res.send(products);
  });


router.get('/', async (req, res)=>
 {
    let product =await ProductModel.find();
    //console.log(product);
    //console.log(req.query);
    return res.send(product);
});

router.get('/:id', async (req, res)=>
 {
    try {
        let product = await ProductModel.findById(req.params.id);
        if (!product)
          return res.status(400).send("Product With given ID is not present"); //when id is not present id db
        return res.send(product); //everything is ok
      } catch (err) {
        return res.status(400).send("Invalid ID"); // format of id is not correct
      }
});
// validateProduct,
//update a record //auth, admin,
router.put("/:id",validateProduct, async (req, res) => {
    let product = await ProductModel.findById(req.params.id);
    product.code = req.body.code;
    product.price = req.body.price;
    product.size = req.body.size;
    await product.save();
    return res.send(product);
  });

//delete a record //auth, admin,
router.delete("/:id", async (req, res) => {
    let product = await ProductModel.findByIdAndDelete(req.params.id);
    return res.send(product);
  });

  //Insert a record  validateProduct, //auth,
router.post("/",validateProduct,  async (req, res) => {
    /*let {error} = validate(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }*/
    //hr route pr validation lgani paray gi  
    //is k liye middleware hotay hn declare only once
    let product = new ProductModel();
    product.code = req.body.code;
    product.price = req.body.price;
    product.size = req.body.size;
    await product.save();
    return res.send(product);
  });
module.exports = router;