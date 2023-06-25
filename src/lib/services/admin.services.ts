import {cloudProvider} from '$lib/utils/providers.utils';
import type {CanistersBalance, CanistersControllers} from '../types/ic';

export const canistersBalance = async (): Promise<CanistersBalance> => {
  const {canistersBalance: queryCanistersBalance} = await cloudProvider();

  return queryCanistersBalance();
};

export const canistersControllers = async (): Promise<CanistersControllers> => {
  const {canistersControllers: queryCanistersControllers} = await cloudProvider();

  return queryCanistersControllers();
};

export const setCanistersController = async (controller: string) => {
  const {addCanistersController: updateAddCanistersController} = await cloudProvider();

  await updateAddCanistersController(controller);
};