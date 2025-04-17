

async function splitYou(docs) {
    const { RecursiveCharacterTextSplitter } = await import("@langchain/textsplitters");
    const { Document } = await import("@langchain/core/documents");
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, chunkOverlap: 200
      });
      const allSplits = await splitter.splitDocuments([
        new Document({ 
            pageContent: docs[0].pageContent,  // Ensure it's a string 
        }),]); 
        console.log("split text");

        const limitedSplits = allSplits.slice(0, 1); 
        return limitedSplits;
}
module.exports = {splitYou};
