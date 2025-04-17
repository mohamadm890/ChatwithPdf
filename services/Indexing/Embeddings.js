 

// Adjust the path to where your embeddings.js is located
const flattenObject = (obj) => {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
          const flattened = flattenObject(value); // Recursively flatten nested objects
          for (const [nestedKey, nestedValue] of Object.entries(flattened)) {
              result[`${key}.${nestedKey}`] = nestedValue; // Prefix nested keys with parent key
          }
      } else {
          result[key] = value;
      }
  }
  return result;
};



async function Embeddings(doc) {
   
    const { HuggingFaceTransformersEmbeddings  } = await import("@langchain/community/embeddings/huggingface_transformers");
    const { MemoryVectorStore } = await import("langchain/vectorstores/memory");

      
    const model = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
     console.log(typeof doc);
      
     const question = await model.embedQuery("قانون الحقوق المدنیة لعام");
     console.log("This code u looking for", question);
    
      
     const embeddings = [];
     let counter = 1;
     for (const document of doc) {
         // Get the page content, metadata, and id, with a default value for id
         const { pageContent, metadata } = document;
     
         // Use the counter to generate the ID
         const id = counter;  // Use counter as the ID
     
         
     
         try {
             // Generate the embedding for the page content
             const values = await model.embedQuery(pageContent);
             const cleanedMetadata = flattenObject(metadata);  // Flatten metadata here
     
             // Create an object with embedding, metadata, and id
             const embeddingWithMeta = {
                 values,  // The embedding generated
                 metadata: cleanedMetadata,   // The metadata for the document
                 id      // The incremented id of the document
             };
     
             embeddings.push(embeddingWithMeta);
             counter++; // Increment the counter for the next document
         } catch (error) {
             console.error("Error embedding page content:", error);
         }
     }
     
     return embeddings;
     
}
module.exports = {
    Embeddings,
}