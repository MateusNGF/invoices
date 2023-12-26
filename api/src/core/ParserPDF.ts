import * as PdfParse from 'pdf-parse';

export async function ParsePDFContent(buffer: Buffer) {
  const data = await PdfParse(buffer);
  const extractedText = data.text;

  // Exemplo simples: dividir o texto por quebras de linha
  const lines = extractedText.split('\n').filter(Boolean);

  return lines;
}
