import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js" ;
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";



export const getProducts = catchAsyncErrors (async (req, res) => {

  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;
               
  res.status(200).json({
    filteredProductsCount,
       products,
    });
  });


//I can add the product only for the admin
export const newProduct = catchAsyncErrors( async (req, res) => {
    const product= await Product.create(req.body)
    res.status(200).json({
        product,
    });
  });

export const getProductDetails = catchAsyncErrors( async(req, res, next) => {
    const product= await Product.findById(req?.params?.id);

    if (!product) {
      return next(new ErrorHandler('Product is not Found', 404));
    }
    res.status(200).json({
        product,
    });
  
  });


  export const updateProduct = catchAsyncErrors(async (req, res) => {
    let product= await Product.findById(req?.params?.id);

    if (!product) {
      return next(new ErrorHandler('Product is not Found', 404));
    }
    
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new:true })

    res.status(200).json({
        product,
    });
  
  });

  export const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product= await Product.findById(req?.params?.id);

    if (!product) {
      return next(new ErrorHandler('Product is not Found', 404));
    }
    await product.deleteOne();
    res.status(200).json({
        message: "Product Deleted",
    });
  
  });
