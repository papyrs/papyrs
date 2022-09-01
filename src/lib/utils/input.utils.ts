import {DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH} from '$lib/constants/constants';

export const validTitle = (title: string | undefined): boolean => {
  if (title === undefined || title == '' || title.length > TITLE_MAX_LENGTH) {
    return false;
  }

  const match: RegExpMatchArray | null = title.match(
    /[A-Za-z0-9-\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]+/g
  );

  if (!match || match.length <= 0 || match.length > 1) {
    return false;
  }

  return match[0] === title;
};

export const validateDescription = (description: string | undefined): boolean => {
  return (
    !description ||
    description === undefined ||
    description === '' ||
    description.length <= DESCRIPTION_MAX_LENGTH
  );
};

export const validateCanonical = (canonical: string | undefined): boolean => {
  try {
    const url: URL = new URL(canonical);

    return url.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (func: Function, timeout?: number) => {
  let timer: NodeJS.Timer | undefined;

  return (...args: any[]) => {
    const next = () => func(...args);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(next, timeout !== undefined && timeout > 0 ? timeout : 300);
  };
};
