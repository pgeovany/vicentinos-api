export function normalizarDocumentoFiscal(documentoFiscal: string): string {
  const documentoLimpo = documentoFiscal.replace(/\D/g, '');
  let documentoFormatado = documentoLimpo;

  if (documentoLimpo.length === 11) {
    documentoFormatado = documentoLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  if (documentoLimpo.length === 14) {
    documentoFormatado = documentoLimpo.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  return documentoFormatado;
}
