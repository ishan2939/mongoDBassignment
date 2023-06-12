//mongoDB queries (just for practice)

//get catalog sorted
db.products.aggregate([{ $project: { _id: 0, productName: 1, image: 1, price: 1, category: 1 } },
{ $group: { _id: "$category", products: { $push: { image: "$image", name: "$productName", price: "$price" } } } },
{ $project: { category: "$_id", _id: 0, products: 1 } },
{ $sort: { category: 1 } }
]);

//get all nutrients your products provide sorted
db.products.aggregate([{ $project: { _id: 0, nutrients: { $split: ["$nutrients", ", "] } } },
{ $unwind: "$nutrients" },
{ $sort: { nutrients: 1 } },
{ $group: { _id: null, allnutrients: { $addToSet: "$nutrients" } } },
{ $project: { _id: 0, allnutrients: 1 } },
{ $unwind: "$allnutrients" },
{ $sort: { allnutrients: 1 } },
{ $group: { _id: null, allnutrients: { $push: "$allnutrients" } } },
{ $project: { _id: 0, allnutrients: 1, total: { $size: "$allnutrients" } } }
]);

//get all the categories sorted
db.products.aggregate([{ $project: { _id: 0, category: 1 } },
{ $group: { _id: "$category" } }, { $sort: { _id: 1 } },
{ $group: { _id: null, categories: { $push: "$_id" } } },
{ $project: { _id: 0, categories: 1, total: { $size: "$categories" } } }
]);

//get searched products
db.products.aggregate([{ $match: { productName: { $regex: /c/ } } },
{ $project: { _id: 0, productName: 1, image: 1, price: 1 } }
]);

//get all the categories with it's icons
db.products.aggregate([{ $project: { image: 1, category: 1, _id: 0 } },
{ $group: { _id: "$category", image: { $addToSet: "$image" } } },
{ $project: { category: "$_id", _id: 0, icon: { $arrayElemAt: ["$image", 0] } } },
{ $sort: { category: 1 } }
]);

//get product details

db.products.aggregate([{$match: {productName : "wheat"}} , 
{$project: {
    _id: 0, 
    name: "$productName", 
    icon: 1, 
    price: {$concat: [{ $convert: { input: "$price", to: "string", onError: 0, onNull: 0}}, " $ for ", "$quantity"]}, 
    location: { $concat: ["From ", "$from"]}, 
    nutrients: {$split: ["$nutrients", ", "]},
    organic: 1,
    desc: "$description",
    type: 1,
    category: 1
}}]);