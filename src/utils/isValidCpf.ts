export function isValidCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false; 

  const calc = (n: number) => {
    let count = 0;
    for (let i = 0; i < n - 1; i++) count += parseInt(cpf.charAt(i)) * (n - i);
    const rev = 11 - (count % 11);
    return rev >= 10 ? 0 : rev;
  };

  return (
    calc(11) === parseInt(cpf.charAt(9)) &&
    calc(12) === parseInt(cpf.charAt(10))
  );
}
