export function validateCpf(cpf) {
  if (/^(.)\1+$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais

  let sum = 0;
  let remainder;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  return remainder === parseInt(cpf[10]);
}

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const phoneRegex = /^(?:\+55\s?)?\(?[1-9]{2}\)?\s?[9]?[6-9]\d{3}-?\d{4}$/;
  return phoneRegex.test(phone);
}

export function getValue(value) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
