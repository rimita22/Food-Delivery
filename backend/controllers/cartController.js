// import userModel from "../models/userModel.js";



// //add items to the cart
// const addToCart = async (req,res) => {
//     try {
//         const itemId = req.body.itemId;
//         if (!itemId) {
//             return res.json({ success:false, message:"No itemId provided"});
//         }

//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;

//         if(!cartData[itemId]){
//             cartData[itemId] = 1;
//         } else {
//             cartData[itemId] += 1;
//         }

//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//         res.json({ success:true, message:"Added To Cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success:false, message:"Error" });
//     }
// }


// // remove items from user cart
// const removeFromCart = async (req,res) => {
//     const itemId = req.body.itemId;
//     if (!itemId) {
//     return res.json({ success:false, message:"No itemId provided"});
// }


//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
        
//         if (cartData[itemId] > 0) {
//             cartData[itemId] -= 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//         res.json({success:true, message:"Removed From Cart"});
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:"Error"});
//     }
// }



// //fetch user cart data
// const getCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         res.json({success:true,cartData})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// export {addToCart,removeFromCart,getCart}


// new from chatgptt what i got 

import userModel from "../models/userModel.js";

// Add items to the cart
const addToCart = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    if (!itemId) {
      return res.json({ success: false, message: "No itemId provided" });
    }

    const userId = req.userId; // 👈 coming from decoded token via authMiddleware
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.json({ success: false, message: "Error" });
  }
};


// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        if (!itemId) {
            return res.json({ success: false, message: "No itemId provided" });
        }

        const userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData;
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
