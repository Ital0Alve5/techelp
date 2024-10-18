import { Viacep } from '../types/viacep.type';
import { InputError } from '@/shared/types/input-error.type';

export type addressDataType = Promise<{ error: boolean; data: Viacep } | InputError>;
