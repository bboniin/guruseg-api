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
export function validateCnpj(cnpj) {
  // 1. Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // 2. Verifica se o CNPJ tem 14 dígitos e se todos os dígitos são iguais
  if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) {
    return false;
  }

  // 3. Validação do primeiro dígito verificador
  let soma = 0;
  let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * peso[i];
  }

  let digito1 = soma % 11;
  digito1 = digito1 < 2 ? 0 : 11 - digito1;

  if (parseInt(cnpj[12]) !== digito1) {
    return false;
  }

  // 4. Validação do segundo dígito verificador
  soma = 0;
  peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * peso[i];
  }

  let digito2 = soma % 11;
  digito2 = digito2 < 2 ? 0 : 11 - digito2;

  if (parseInt(cnpj[13]) !== digito2) {
    return false;
  }

  // Se todas as validações passarem, o CNPJ é válido
  return true;
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
