
async function loadYoutbeTransript(video_link) {
  const { createNotesForChunks } = await import("./createNotesforChunck.js");
  const { splitYou } = await import("./spliteYout.js");
  const { createSummarytest } = await import("./createSummary.js");
  const { add_pinecone } = require("./fileConverters/pinecone.js");
  console.log("add_pinecone function:", add_pinecone);

  const { YoutubeLoader } = await import("@langchain/community/document_loaders/web/youtube"); // Dynamic Import
  const Loadpdf = YoutubeLoader.createFromUrl(video_link, {
        language: "en",
        addVideoInfo: true,
      });

      const docs = await Loadpdf.load(Loadpdf);
      const split = await splitYou(docs);

      const user_id = "user-90"; // Example user ID

      try {
        const add = await add_pinecone(split, user_id);
        console.log("add", add);
        const note =  await createNotesForChunks(split);
        return note;


    } catch (error) {
        console.error("Error in add_pinecone:", error);
        return; // Stop execution if there's an error
    }
    
      
 } 

 module.exports = {loadYoutbeTransript};
 