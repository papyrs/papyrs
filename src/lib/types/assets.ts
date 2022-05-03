import type {Image} from '$lib/types/image';

export interface AssetsSearchParams {
  searchTerm: string | undefined;
  next: number;
}

export interface AssetsSearchResults {
  results: Image[];
  next: number;
  end: boolean;
}
