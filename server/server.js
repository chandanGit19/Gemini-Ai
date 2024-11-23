const express =require("express");
const app = express();
const cors =require("cors")
const axios =require("axios")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { run, test, generateImage } = require("./gemine/gemine-pro");
require("dotenv").config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*"
}))

app.post("/tt",async(req,res)=>{

    // console.log(req.body)


    res.status(200).json({
        success:true,
        data:
[{"expr": "4 + 4", "result": 8}]
,
        message:"Tumko kya laga tha nahi chalenge, le chal gai hai hummmm"
    })

})
app.get("/test",test
)


// async(req,res)=>{


    // Make sure to include these imports:


// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Write a story about a magic backpack. with in 100 work it can be incomplet";

// const result = await model.generateContent(prompt);
// console.log(result.response.text()); 


// const response = await axios.post(
//     'https://generative-api.google.com/v1beta/generative/models/gemini-1.5-flash/generateContent',
//     {
//         prompt: prompt,
//         // image: imgBuffer.toString('base64'), // Convert image to base64 string
//     },
//     {
//         headers: {
//             'Authorization': `Bearer ${GEMINI_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//     }
// );

// const responseText = response.data.text;

// console.log(responseText)


    // res.status(200).json({
    //     success:true,
    //     message:"ok"
    // })

app.get("/run",run)
app.post('/process-image',generateImage)


const Port =process.env.PORT || 5000 

app.listen(Port,()=>{
    console.log("app is listing on port nahi batunga")
})