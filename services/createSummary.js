

 function createSummarytest(chunks) {
    let finalSummary = "📄 **الملخص النهائي لجميع الأفكار**:\n\n";

   chunks.forEach((element, index) => {
    const itemId = element.id || index + 1;
    finalSummary += `🆔 **ID: ${itemId}**\n**النقطة ${index + 1}:**\n${element.content}\n\n`;
   });
   return finalSummary;
  }
module.exports = { createSummarytest };
