

async function Split(doc) {

    const { RecursiveCharacterTextSplitter } = await import("@langchain/textsplitters");
    const { Document } = await import("@langchain/core/documents");
    
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, chunkOverlap: 200
      });
      const allSplits = await splitter.splitDocuments([
                new Document({ 
                    pageContent: doc,  // Ensure it's a string 
                }),
      ]
      );      

      console.log(doc.metadata);
      return allSplits;
      
}
module.exports = {
    Split,
}
