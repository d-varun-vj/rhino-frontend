import { useSearchParams } from 'react-router-dom';
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import { useState } from 'react';

type SearchParam = Record<string, unknown> | undefined;

export function useEncodedSearchParam(
  key: string,
  defaultValue: SearchParam
): readonly [SearchParam, (newState: SearchParam | undefined) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const encoded = searchParams.get(key);
  const decoded = encoded
    ? (JSON.parse(
        decompressFromEncodedURIComponent(encoded) || ''
      ) as SearchParam)
    : defaultValue;

  const setSearchParamsState = (newState?: SearchParam) => {
    const params = new URLSearchParams(searchParams);

    if (newState) {
      const compressed = compressToEncodedURIComponent(
        JSON.stringify(newState)
      );
      params.set(key, compressed);
    } else {
      params.delete(key);
    }

    setSearchParams(params, { replace: true });
  };

  return [decoded, setSearchParamsState];
}

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: SearchParam
): readonly [
  searchParamsState: SearchParam,
  setSearchParamsState: (newState: SearchParam) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams();
  const [param, setParam] = useState<SearchParam>();

  const decodeSearchParam = (
    searchParam: string,
    searchParamName: string
  ): SearchParam => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(searchParam);
    } catch {
      return { [searchParamName]: searchParam };
    }
  };

  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam
    ? decodeSearchParam(acquiredSearchParam, searchParamName)
    : defaultValue;

  const setSearchParamsState = (newState?: SearchParam) => {
    let next = {
      ...Array.from(searchParams.entries()).reduce((o, [key, value]) => {
        if (value !== null && value !== 'null' && value !== undefined) {
          return { ...o, [key]: value };
        }
        return o;
      }, {}),
      ...newState,
    };

    next = Object.fromEntries(
      Object.entries(next).filter(
        ([, value]) => value !== null && value !== 'null' && value !== undefined
      )
    );

    setParam(next);
    setSearchParams(next, { replace: true });
  };

  return [searchParamsState ?? param, setSearchParamsState];
}
