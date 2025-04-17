require('dotenv').config();



const add_pinecone = async (docs, user_id) => {
    const { Pinecone } = await import("@pinecone-database/pinecone");
    const { PineconeStore } = await import("@langchain/pinecone");
    const { HuggingFaceTransformersEmbeddings  } = await import("@langchain/community/embeddings/huggingface_transformers");
    console.log(typeof docs);
    console.log(user_id);
    const pc = new Pinecone({apiKey: process.env.PINECONE_API_KEY});
    const model = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
    const index_name = "chatbotpdf"
    const pineconeIndex = pc.Index(index_name);

    const add_pinecone_vector = await PineconeStore.fromDocuments( docs, model,{
        pineconeIndex,
        namespace: user_id,
    })
    
   
    
     
    return  add_pinecone_vector;
}

module.exports = {
    add_pinecone,
};