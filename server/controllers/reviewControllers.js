import { Product } from "../models/productModel.js";
import { Review } from "../models/reviewModel.js";
import { catchErrorHandler } from "../utils/catchErrorHandler.js";

// Add rating
export const addReview = async (req, res) => {
  try {
    // Get data from request body
    const { productId, rating, comment } = req.body;

    // Check product exists
    const product = await Product.findById(productId);

    // Handle product not found
    if (!product) {
      return res.status(404).json({ messag: "Prouduct not found" });
    }

    // Check rating
    if (rating > 5 && rating < 1) {
      return res.status(400).json({ message: "Provide a valid proper rating" });
    }

    // Create or update the review
    const review = await Review.findOneAndUpdate(
      { userId, productId },
      { rating, comment },
      { new: true, upsert: true }
    );

    // Send to frontend
    res.status(201).json({ message: "Review created", data: review });
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error);
  }
};

// Display product review
export const getProductReview = async(req, res) => {
  try {

    // Get product id
    const {productId} = req.params

    // Find reviews
    const reviews = await Review.find({productId}).populate('userId', 'name').sort({createdAt: -1})

    // Handle review not found
    if(!reviews){
      return res.status(404).json({message: 'No review found for this product'})
    }

    // Send response to frontend
    res.status(200).json({message: 'Review fetched successfully', data: reviews})

    
  } catch (error) {
    // Handle catch error
    catchErrorHandler(res, error)
  }
}

// Delete review
export const deleteReview = async(req, res) => {
try {
  // Get review id
  const {reviewId} = req.params

  // Get user id
  const {userId} = req.user

  // Find and delete review
  const review = await Review.findOneAndDelete({_id: reviewId, userId })

  // Handle review not found
  if(!review){
    // Send response to frontend
    res.status(404).json({message: 'Review not found or not authorized'})
  }

  // Send response to frontend
  res.status(204).json({message: 'Review deleted successfully'})
  
} catch (error) {

  // Handle catch error
  catchErrorHandler(res, error)
  
}
}
