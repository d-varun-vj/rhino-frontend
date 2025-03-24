export const getCookie = (name: string): string | undefined => {
  const match = document.cookie.match(
    new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
  );
  return match ? match[2] : undefined;
};
