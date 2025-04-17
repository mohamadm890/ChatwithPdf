import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

async function loadPdf(pdf_file) {
    const Loadpdf = new PDFLoader(pdf_file);
    const docs = await Loadpdf.load();
    return docs;
}


module.exports = {
    loadPdf,
}