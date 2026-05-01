import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '../../UI/Inputs';
import { useAuthContext } from '../../../contexts/AuthContext/hooks';
import { supabase } from '../../../services/supabase';

import { useEffect } from 'react';
import type { Address } from '../../../types/AddressType';

const addressSchema = z.object({
  identify: z.string(),
  identifyType: z.enum(['home', 'work', 'other'], {
    error: () => ({ message: 'Por favor, selecione um tipo de endereço.' }),
  }),
  cep: z.string().min(8, 'Digite um CEP válido1').max(9),
  street: z.string().min(1, 'A rua é obrigatória'),
  number: z.string().min(1, 'O número é obrigatória'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  state: z.string().length(2, 'UF inválida'),
});

type AddressSchema = z.infer<typeof addressSchema>;

interface AdsressFormProps {
  setIsVisible: (value: boolean) => void;
  isVisible: boolean;
  onSuccess: () => void;
  initialData?: Address | null;
}

export function AddressForm({
  setIsVisible,
  onSuccess,
  initialData,
  isVisible,
}: AdsressFormProps) {
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
  });

  async function handleCheckCEP(e: React.FocusEvent<HTMLInputElement>) {
    const cepLimpo = e.target.value.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        toast.error('CEP não encontrado. Verifique e tente novamente.');
        return;
      }

      setValue('street', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('state', data.uf);

      setFocus('number');
    } catch (error) {
      toast.error(
        `Erro ao buscar o CEP. Digite o endereço manualmente: ${error}`,
      );
    }
  }

  async function handleSaveAddress(formData: AddressSchema) {
    if (!user) {
      toast.error('Você precisa estar logado para salvar um endereço.');
      return;
    }

    try {
      if (initialData) {
        const payloadSeguro = {
          identify: formData.identify,
          identifyType: formData.identifyType,
          cep: formData.cep,
          street: formData.street,
          number: formData.number,
          complement: formData.complement || '',
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
        };

        const { error } = await supabase
          .from('Address')
          .update(payloadSeguro)
          .eq('id', initialData.id);

        if (error) {
          toast.error('Erro ao atualizar o endereço.');
          console.error('Erro do Supabase (Update):', error);
          return;
        }

        toast.success('Endereço atualizado com sucesso!');
        onSuccess();
        setIsVisible(false);
      } else {
        const { error } = await supabase.from('Address').insert([
          {
            user_id: user.id,
            identifyType: formData.identifyType,
            identify: formData.identify,
            cep: formData.cep,
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
          },
        ]);

        if (error) {
          toast.error('Erro ao salvar o endereço no banco de dados.');
          return;
        }

        toast.success('Endereço salvo com sucesso!');
        onSuccess();
        setIsVisible(false);
      }
    } catch (error) {
      toast.error(`Ocorreu um erro inesperado: ${error}`);
    }
  }

  useEffect(() => {
    if (isVisible) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          cep: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
          identify: '',
          identifyType: 'home',
        });
      }
    }
  }, [initialData, isVisible, reset]);

  return (
    <form
      className="flex flex-col gap-4 p-5 w-full  justify-center"
      onSubmit={handleSubmit(handleSaveAddress)}
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Identificação"
          placeholder="Ex: Casa, Trabalho, Casa da Mãe"
          {...register('identify')}
          error={errors.identify?.message}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <select
            {...register('identifyType')}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
          >
            <option value="home">Casa</option>
            <option value="work">Trabalho</option>
            <option value="other">Outro</option>
          </select>

          {errors.identifyType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identifyType.message}
            </p>
          )}
        </div>
      </div>

      <Input
        label="CEP"
        placeholder="00000-000"
        maxLength={9}
        {...register('cep')}
        onBlur={handleCheckCEP}
        error={errors.cep?.message}
      />

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Input
            label="Rua"
            placeholder="Aguardando CEP..."
            {...register('street')}
            error={errors.street?.message}
          />
        </div>
        <div className="col-span-1">
          <Input
            label="Número"
            placeholder="Nº"
            {...register('number')}
            error={errors.number?.message}
          />
        </div>
      </div>

      <Input
        label="Complemento (Opcional)"
        placeholder="Apto, Bloco, Casa dos fundos..."
        {...register('complement')}
        error={errors.complement?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bairro"
          placeholder="Aguardando CEP..."
          {...register('neighborhood')}
          error={errors.neighborhood?.message}
        />
        <Input
          label="Cidade"
          placeholder="Aguardando CEP..."
          {...register('city')}
          error={errors.city?.message}
        />
      </div>

      <input type="hidden" {...register('state')} />

      <button className="bg-amber-400 font-bold py-3 px-6 rounded-full mt-4 hover:bg-amber-500 transition-colors cursor-pointer">
        Salvar Endereço
      </button>
    </form>
  );
}
