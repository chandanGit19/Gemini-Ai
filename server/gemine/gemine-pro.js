require("dotenv").config()
const fs = require('fs');
const path = require('path');
const axios = require("axios")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

exports.run = async(req,res)=>{

    const model = genAI.getGenerativeModel({model:"gemini-pro"});

    const prompt ="write a sonnet about a programmer life , maek it small"

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    console.log(text);

}


exports.test = async(req,res)=>{

    console.log(req.body)


    const model = genAI.getGenerativeModel({ model:  "gemini-1.5-pro" });

    // can't use this model in this model  "gemini-1.5-flash"

    const prompt = "Write a story about a magic backpack. with in 100 work it can be incomplet";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text()); 

}


//     exports.generateImage = async (req, res) => {
//     try {
//         let {image,  dict_of_vars } = req.body;

//         // Decode the base64 image data (strip out the metadata prefix)
//         const base64Data = image.split(",")[1];
//         const imageBuffer = Buffer.from(base64Data, 'base64');

//         // Process the image (using sharp here)
//          image = await sharp(imageBuffer)
//             .resize(300, 300)  // Example image processing, adjust as needed
//             .toBuffer(); // Process the image and get the buffer back

//         // Call analyzeImage function (replace with actual implementation)
//         const responses = analyzeImage(image, dict_of_vars);

//         // Prepare response data
//         const data = responses.map(response => response); // Modify based on actual response format

//         console.log('Response in route: ', data);

//         // Send the response back to the client
//         res.json({
//             message: 'Image processed',
//             data: data,
//             status: 'success'
//         });
//     } catch (error) {
//         console.error('Error processing image:', error);
//         res.status(500).json({
//             message: 'An error occurred while processing the image',
//             error: error.message,
//             status: 'failure'
//         });
//     }
// };




















// const axios = require('axios');
const sharp = require('sharp');

// const ast = require('ast');


// Function to analyze image
// async function analyzeImage(imagePath, dictOfVars) {
//     try {
//         // Prepare the request headers and API configuration
//         const headers = {
//             'Authorization': `Bearer ${GEMINI_API_KEY}`,
//             'Content-Type': 'application/json',
//         };

//         // Convert dictOfVars to a string for the prompt
//         const dictOfVarsStr = JSON.stringify(dictOfVars, null, 2);

//         // Prepare the prompt as per the original Python code
        // const prompt = `You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. 
        // Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). 
        // For example: 
        // Q. 2 + 3 * 4 
        // (3 * 4) => 12, 2 + 12 = 14. 
        // Q. 2 + 3 + 5 * 4 - 8 / 2 
        // 5 * 4 => 20, 8 / 2 => 4, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21. 
        // YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME: 
        // Following are the cases: 
        // 1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: In this case, solve and return the answer in the format of a LIST OF ONE DICT [{'expr': given expression, 'result': calculated answer}]. 
        // 2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: In this case, solve for the given variable, and the format should be a COMMA SEPARATED LIST OF DICTS, with dict 1 as {'expr': 'x', 'result': 2, 'assign': true} and dict 2 as {'expr': 'y', 'result': 5, 'assign': true}. This example assumes x was calculated as 2, and y as 5. Include as many dicts as there are variables. 
        // 3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: In this case, assign values to variables and return another key in the dict called {'assign': true}, keeping the variable as 'expr' and the value as 'result' in the original dictionary. RETURN AS A LIST OF DICTS. 
        // 4. Analyzing Graphical Math problems, which are word problems represented in drawing form, such as cars colliding, trigonometric problems, problems on the Pythagorean theorem, adding runs from a cricket wagon wheel, etc. These will have a drawing representing some scenario and accompanying information with the image. PAY CLOSE ATTENTION TO DIFFERENT COLORS FOR THESE PROBLEMS. You need to return the answer in the format of a LIST OF ONE DICT [{'expr': given expression, 'result': calculated answer}]. 
        // 5. Detecting Abstract Concepts that a drawing might show, such as love, hate, jealousy, patriotism, or a historic reference to war, invention, discovery, quote, etc. USE THE SAME FORMAT AS OTHERS TO RETURN THE ANSWER, where 'expr' will be the explanation of the drawing, and 'result' will be the abstract concept. 
        // Analyze the equation or expression in this image and return the answer according to the given rules: 
        // Make sure to use extra backslashes for escape characters like \\f -> \\\\f, \\n -> \\\\n, etc. 
        // Here is a dictionary of user-assigned variables. If the given expression has any of these variables, use its actual value from this dictionary accordingly: ${dictOfVarsStr}. 
        // DO NOT USE BACKTICKS OR MARKDOWN FORMATTING. 
        // PROPERLY QUOTE THE KEYS AND VALUES IN THE DICTIONARY FOR EASIER PARSING WITH Python's ast.literal_eval.`;

//         // Load and process the image using sharp
//         const imageBuffer = await sharp(imagePath).toBuffer();  // Read the image and convert it to a buffer
        
//         // Send the request to Gemini API
//         const response = await axios.post(
//             'https://api.google.com/generativeai/v1alpha1/models/gemini-1.5-pro:generate', 
//             {
//                 prompt: prompt,
//                 image: imageBuffer.toString('base64'),  // Convert image to base64 string
//             },
//             { headers: headers }
//         );

//         // Extract and process the response
//         const responseText = response.data.text;
//         console.log(responseText);

//         // Try to parse the response (which is expected to be in a Python-style list/dict format)
//         let answers = [];
//         try {
//             answers = JSON.parse(responseText);  // Parsing the response assuming it's a JSON
//         } catch (error) {
//             console.error(`Error parsing response: ${error}`);
//         }

//         console.log('Returned answer:', answers);

//         // Process the answers and set 'assign' field accordingly
//         answers.forEach(answer => {
//             if ('assign' in answer) {
//                 answer.assign = true;
//             } else {
//                 answer.assign = false;
//             }
//         });

//         return answers;
//     } catch (error) {
//         console.error('Error analyzing image:', error);
//         throw error;
//     }
// }

// // Example usage
// const dictOfVars = {
//     x: 5,
//     y: 10
// };

// analyzeImage('path_to_your_image.jpg', dictOfVars)
//     .then(result => console.log('Analysis Result:', result))
//     .catch(err => console.error('Error:', err));




    const decodeBase64Image = (base64Data) => {
        const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,([^\"]+)$/);
        if (matches && matches.length === 3) {
            return Buffer.from(matches[2], 'base64');
        }
        return null;
    };
    
    // POST endpoint to handle image and variable data
    exports.generateImage = async (req, res) => {
        const { image, dict_of_vars } = req.body; // Expecting base64 image and dictionary of variables
    
        if (!image) {
            return res.status(400).json({ message: 'No image provided' });
        }
    
        try {
            // Decode the image from base64
            const imageBuffer = decodeBase64Image(image);
            if (!imageBuffer) {
                return res.status(400).json({ message: 'Invalid base64 image data' });
            }
    
            // Optionally, you can save the image to a file if needed
            const tempFilePath = path.join(__dirname, 'temp_image.png');
            await sharp(imageBuffer).toFile(tempFilePath);
    
            // Generate the prompt using dict_of_vars
            const dictOfVarsStr = JSON.stringify(dict_of_vars);
            const prompt = `
             You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. 
            Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). 
            For example: 
            Q. 2 + 3 * 4 
            (3 * 4) => 12, 2 + 12 = 14. 
            Q. 2 + 3 + 5 * 4 - 8 / 2 
            5 * 4 => 20, 8 / 2 => 4, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21. 
            YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME: 
            Following are the cases: 
            1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: In this case, solve and return the answer in the format of a LIST OF ONE DICT [{'expr': given expression, 'result': calculated answer}] in the form of array. 
            2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: In this case, solve for the given variable, and the format should be a COMMA SEPARATED LIST OF DICTS, with dict 1 as {'expr': 'x', 'result': 2, 'assign': true} and dict 2 as {'expr': 'y', 'result': 5, 'assign': true} data shound be in the form of array. 
            3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: In this case, assign values to variables and return another key in the dict called {'assign': true}, keeping the variable as 'expr' and the value as 'result' in the original dictionary. RETURN AS A LIST OF DICTS. 
            4. Analyzing Graphical Math problems, which are word problems represented in drawing form, such as cars colliding, trigonometric problems, problems on the Pythagorean theorem, adding runs from a cricket wagon wheel, etc. These will have a drawing representing some scenario and accompanying information with the image. PAY CLOSE ATTENTION TO DIFFERENT COLORS FOR THESE PROBLEMS. You need to return the answer in the format of a LIST OF ONE DICT [{'expr': given expression, 'result': calculated answer}]. 
            5. Detecting Abstract Concepts that a drawing might show, such as love, hate, jealousy, patriotism, or a historic reference to war, invention, discovery, quote, etc. USE THE SAME FORMAT AS OTHERS TO RETURN THE ANSWER, where 'expr' will be the explanation of the drawing, and 'result' will be the abstract concept. 
            Analyze the equation or expression in this image and return the answer according to the given rules: 
            Make sure to use extra backslashes for escape characters like \\f -> \\\\f, \\n -> \\\\n, etc. 
            Here is a dictionary of user-assigned variables. If the given expression has any of these variables, use its actual value from this dictionary accordingly: ${dictOfVarsStr}. 
            DO NOT USE BACKTICKS OR MARKDOWN FORMATTING THIS IS THE MOST IMPORTANT POINT PLEASE REMEMBER THIS. 
            PROPERLY QUOTE THE KEYS AND VALUES IN THE DICTIONARY FOR EASIER PARSING WITH JavaScript's JSON.parse.
         `;
    
            // Call Gemini API with the image and prompt
            const model = genAI.getGenerativeModel({ model:  "gemini-1.5-pro" });

            // can't use this model in this model  "gemini-1.5-flash"
        
            // const prompt = "Write a story about a magic backpack. with in 100 work it can be incomplet";

            
                const imageParts = { inlineData:{
                    data:Buffer.from(fs.readFileSync(tempFilePath)).toString("base64"),
                    mimeType:"image/png"
                }}
            
            const result = await model.generateContent([prompt,imageParts]);
           const data = result.response.text()
           
            // Process response
            // const dataa = JSON.parse(data);
            console.log(result.response.text() );
    
            // Clean up the temporary image file
            fs.unlinkSync(tempFilePath);  
    
            // Return the analyzed result to the client
            res.status(200).json({
                success: true,
                data: data,
                message: 'Image processed successfully',
            });
        } catch (error) {
            console.error('Error processing image:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to process the image',
            });
        }
    };
       
