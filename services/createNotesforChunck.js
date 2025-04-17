

async function createNotesForChunks(chunks) {
    const { createNoteusingAI } = await import("./createNoteusingAI.js");

    console.log('Chunks received:', chunks);  // Check if chunks have data
    let apiCallCount = 0;
    let notes = [];
  
    // We await all promises to resolve and collect the results
    const notePromises = chunks.map(async (chunk) => {
      apiCallCount++; // Increment the counter for each API call
      const note = await createNoteusingAI(chunk.pageContent); 
      
      console.log(typeof note);
     
      if (note && typeof note === 'object') {
    
        notes.push(note);
      }
      return note;
    });
    await Promise.all(notePromises);
  
    const filteredNotes = notes.filter(note => note !== null && note !== undefined);
    console.log('text', filteredNotes);
  // Convert the notes array to a JSON string
  const notesJSON = JSON.stringify(filteredNotes, null, 2);
   console.log("JSON Output:", notesJSON);

   return notesJSON;
  }

  module.exports = {createNotesForChunks};
