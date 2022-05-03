import {cloudProvider} from '$lib/utils/providers.utils';
import type {CanistersBalance} from '../types/ic';

export const canistersBalance = async (): Promise<CanistersBalance> => {
  const {canistersBalance: queryCanistersBalance} = await cloudProvider();

  return queryCanistersBalance();
};
