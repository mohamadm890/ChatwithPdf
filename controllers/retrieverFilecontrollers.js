const { retriever } = require('../services/fileConverters/retriever');
require('dotenv').config();

async function retrieverDoc(req, res) {
    try {
      const { ChatPromptTemplate } = await import("@langchain/core/prompts");
    
      const { user_question, user_id } = req.body;
      console.log(typeof user_question);
      console.log(typeof user_id);

      const { ChatDeepSeek } = await import("@langchain/deepseek");
      const llm = new ChatDeepSeek({
        model: "deepseek-chat",
        temperature: 0.3,
        apiKey: process.env.DEEPSEEKAPI
          });
  
      // Ensure retriever is defined or imported correctly
      const getRetriever = await retriever(user_question, user_id);
      console.log(getRetriever); // Ensure retriever is defined or imported
      // Join the content of documents into one string
      const docsContent = getRetriever.map((doc) => doc.pageContent).join("\n");
      console.log("context", docsContent);
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", "You are an assistant for question-answering, structure your output using bullet points. Keep your answers clear, organized, and easy to understand. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you dont know. if context is in specific language make sure answer with it."],
        ["user", "context {docs} \n Question: {question}"],
      ]);
      console.log(promptTemplate);
      const chain = promptTemplate.pipe(llm);
      console.log(chain);

      const response = await chain.invoke({
        docs: docsContent,
        question: user_question
      });
      const content = response.content;
      // Generate the messages with the prompt template
     
      // Send the response with the generated answer
      res.json({ content });
      
    } catch (error) {
      console.error("Error in retrieverDoc:", error);
      res.status(500).json({ message: "An error occurred." });
    }
  }
  
  module.exports = {retrieverDoc};