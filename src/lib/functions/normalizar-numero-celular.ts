export function normalizarNumeroCelular(numeroCelular: string): string {
  const numeroCelularLimpo = numeroCelular.replace(/\D/g, '');
  let numeroCelularFormatado = numeroCelularLimpo;

  if (numeroCelularLimpo.length === 11) {
    numeroCelularFormatado = numeroCelularLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return numeroCelularFormatado;
}
