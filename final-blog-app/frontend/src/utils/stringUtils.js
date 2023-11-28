export const getSnippet = (content, maxLength = 200) => {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + "...";
};
