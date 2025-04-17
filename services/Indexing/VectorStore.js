



async function vectorstores(text) {
    try {
        const { Pinecone } = await import("@pinecone-database/pinecone");
        const pc = new Pinecone({
            apiKey: 'pcsk_25eJZ6_SR6uAHXcXCiG2kagE3STD71auPK9AShSR14cm7xPSndrsvWuppzopJzrz1c4jLB'
          });
        console.log('file',text)
        
        const index_name = "arabicbot"
        const pineconeIndex = pc.Index(index_name);   
        
        vectorCall();
        
    } catch (error) {
        console.error("Error initializing vector store:", error);
        throw error; // Rethrow or handle as needed
    }
}

module.exports = {
    vectorstores,
};
