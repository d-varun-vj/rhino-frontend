export const getCookie = (): string | undefined => {
  const match = document.cookie.match(
    new RegExp('(^|;)\\s*' + 'token' + '\\s*=\\s*([^;]+)')
  );
  return match ? match[2] : undefined;
};
