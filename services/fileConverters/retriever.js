
require('dotenv').config();



const retriever = async (user_question, user_id) => {
    const { Pinecone } = await import("@pinecone-database/pinecone");
    const { PineconeStore } = await import("@langchain/pinecone");
    const { HuggingFaceTransformersEmbeddings  } = await import("@langchain/community/embeddings/huggingface_transformers");

    const pc = new Pinecone({apiKey: process.env.PINECONE_API_KEY});
    const model = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
    const index_name = "chatbotpdf"
    const pineconeIndex = pc.Index(index_name);

    const vectorStore = await PineconeStore.fromExistingIndex( model,{
        pineconeIndex,
        namespace: user_id,
        maxConcurrency: 5,
    })
    const results = await vectorStore.similaritySearch(user_question, 5); 
    console.log("Results type:", typeof results, results);

    return results;
}




module.exports = {
    retriever,
};