


const createNoteusingAI = async (content) => {
    const { ChatGoogleGenerativeAI } = await import("@langchain/google-genai");
    const { ChatPromptTemplate } = await import("@langchain/core/prompts");
    const { TogetherAI } = await import("@langchain/community/llms/togetherai");
    const { ChatDeepSeek } = await import("@langchain/deepseek");
    const { z } = await import("zod");


    const ResponseFormatter = z.object({
      notes: z.array(
        z.object({
          emoji: z.string().describe("رمز تعبيري يمثل النقطة أو المفهوم"),
          title: z.string().describe("عنوان أو فكرة رئيسية للمفهوم"),
          text: z.string().describe("شرح مختصر للنقطة"),
        })
      ),
      flashcards: z.array(
        z.object({
          front: z.string().describe("الجانب الأمامي للبطاقة (السؤال أو المصطلح)"),
          back: z.string().describe("الجانب الخلفي للبطاقة (الإجابة أو الشرح)"),
        })
      ),
      quiz: z.array(
        z.object({
          question: z.string().describe("السؤال الخاص بالاختبار"),
          options: z.array(z.string()).describe("قائمة الخيارات للإجابة"),
          correct: z.number().describe("رقم الخيار الصحيح "),
        })
      ),
    });
    

    try {

      const systemPrompt = `
      أنت نظام ذكاء اصطناعي متخصص في تحليل النصوص وتحويلها إلى شكل معين. يعتمد الإخراج على القيمة المحددة ويجب أن يكون دائمًا على شكل مصفوفة من الكائنات. قم بتنفيذ التالي  :
    
      - "note"، قم بتلخيص النص إلى 4-5 نقاط رئيسية واضحة.
      -  "flashcards" 4 ،حول المصطلحات أو المفاهيم إلى بطاقات تعليمية تحتوي على سؤال وجواب.
      -  "quiz" 4 ، أنشئ مجموعة من الأسئلة بنمط اختيار من متعدد مع الخيارات والإجابة الصحيحة.
      🔹 **النص المدخل:** {text}
    `;

    
    

    

      

      
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        ["user", "{text}"],
      ]);
     
      // Initialize the LLM (Google Generative AI)
      const llm = new ChatDeepSeek({
        model: "deepseek-chat",
        temperature: 0.3,
        apiKey:"sk-0b5a8c8dd6ff49a48f863ef5f09f29f9"
          });
      
      console.log(llm);
      // Format the prompt using the content
      const promptMessages = await promptTemplate.formatMessages({text: content});
      console.log(promptMessages);
      const llmStructure = llm.withStructuredOutput(ResponseFormatter)
      // Send the formatted prompt to the LLM
      const response = await llmStructure.invoke(promptMessages);

  // Remove bold formatting
   
  return response; // Return the direct response text

    } catch (error) {
      console.error("Error generating note:", error);
    }
  };

  module.exports = {createNoteusingAI};
