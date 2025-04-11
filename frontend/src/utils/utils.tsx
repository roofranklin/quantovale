const formatText = (text: string) => {
    return text
      .trim()
      .normalize("NFD") // Remove acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
      .replace(/\s+/g, "-") // Substitui espaços por "-"
      .toLowerCase(); // Converte para minúsculas
};
export default formatText;
