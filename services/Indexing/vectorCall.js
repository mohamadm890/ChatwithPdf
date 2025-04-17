





async function vectorCall() {
    try {
        const { Pinecone } = await import("@pinecone-database/pinecone");
        const { PineconeStore } = await import("@langchain/pinecone");
        const { HuggingFaceTransformersEmbeddings  } = await import("@langchain/community/embeddings/huggingface_transformers");

        const pc = new Pinecone({
            apiKey: 'pcsk_25eJZ6_SR6uAHXcXCiG2kagE3STD71auPK9AShSR14cm7xPSndrsvWuppzopJzrz1c4jLB'
          });
        
      
    const model = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
        const index_name = "arabicbot"
        const pineconeIndex = pc.Index(index_name);   
        const vectorStore = await PineconeStore.fromExistingIndex(
            model,
            {
             pineconeIndex,
            maxConcurrency: 5,
        }    
        );
        vectorStore.similaritySearch("قانون الحقوق المدنیة لعام").then((res) => {
            console.log(res);
        });


        
    } catch (error) {
        console.error("Error initializing vector store:", error);
        throw error; // Rethrow or handle as needed
    }
}

module.exports = {
    vectorCall,
};
