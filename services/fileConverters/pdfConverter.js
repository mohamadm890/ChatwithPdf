const path = require('path'); 
const fs = require('fs'); 

async function pdf_txt(pdf_file) {
    try {
        const { add_pinecone } = require('./pinecone'); // Adjust path if needed
        const { PDFLoader } = await import("@langchain/community/document_loaders/fs/pdf");
        const { RecursiveCharacterTextSplitter } = await import("@langchain/textsplitters");
        const { v4: uuidv4 } = require('uuid');

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000, chunkOverlap: 200
          });
    
               
 
        console.log(typeof pdf_file);
        const filePath = path.resolve(pdf_file);
        console.log("Resolved path:", filePath);

        const loader = new PDFLoader(filePath);
        const docs = await loader.load(); 
        const splitDoc = await splitter.splitDocuments(docs);
        console.log(splitDoc);
        const user_id = uuidv4();

        console.log("waitting");
        const add_data = await add_pinecone(splitDoc, user_id);
        console.log("here");


        console.log(add_data, "this is add data");
        return user_id; 
    } catch(error) {
        console.error("Failed to fetch PDF:", error);
    }
}

module.exports = {pdf_txt};
