export const filterText = (text) => text.replace(/<br>/g, '').replace(/\s|&nbsp;/g, '');

export const calculateRtlDirection = (text) => {
  const filteredText = filterText(text);
  const totalChars = filteredText.length;
  const rtlChars = (
    filteredText.match(/[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/g) || []
  ).length;
  return totalChars > 0 && rtlChars / totalChars > 0.5 ? 'rtl' : 'ltr';
};
