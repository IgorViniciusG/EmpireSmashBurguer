import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  X,
  Loader2,
  Save,
  Pen,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { supabase } from '../../../services/supabase';
import { Card } from '../../Card';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const profileSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 letras'),
  telephone: z.string().min(10, 'Digite um telefone válido com DDD'),
  dateOfBirth: z
    .string()
    .min(1, 'A data de nascimento é obrigatória')
    .refine((data) => new Date(data) <= new Date(), {
      message: 'Você não pode ter nascido no futuro!',
    }),
});

export  type ProfileFormData = z.infer<typeof profileSchema>;

interface PersonalDataCardProps {
  user: SupabaseUser | null;
  profile: ProfileFormData | null;
  onProfileUpdate: (newData: ProfileFormData) => void;
}

export function PersonalDataCard({
  user,
  profile,
  onProfileUpdate,
}: PersonalDataCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      telephone: '',
      dateOfBirth: '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        telephone: profile.telephone || '',
        dateOfBirth: profile.dateOfBirth || '',
      });
    }
  }, [profile, reset]);

  async function handleSaveProfile(data: ProfileFormData) {
    if (!user) return;

    try {
      const { error } = await supabase.from('users').upsert({
        id: user.id,
        name: data.name,
        telephone: data.telephone,
        email: user.email,
        dateOfBirth: data.dateOfBirth,
      });

      if (error) throw error;

      toast.success('Perfil atualizado com sucesso!');

      onProfileUpdate(data);
      setIsEditing(false);
    } catch (error) {
      toast.error('Erro ao atualizar os dados.');
      console.error(error);
    }
  }

  return (
    <Card className="flex flex-col">
      <section className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-row items-center gap-2">
          <span className="flex bg-amber-100 text-amber-600 h-12 w-12 rounded-full justify-center items-center">
            <User />
          </span>
          <h2 className="font-semibold text-lg">Dados Pessoais</h2>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-600 py-1 px-3 cursor-pointer hover:bg-gray-200 rounded-full flex items-center font-semibold gap-2 transition-colors"
                disabled={isSubmitting}
              >
                <X size={16} />
                <p className="text-sm">Cancelar</p>
              </button>

              <button
                type="submit"
                form="form-perfil"
                disabled={isSubmitting}
                className="text-black bg-amber-400 hover:bg-amber-500 py-1 px-4 cursor-pointer rounded-full flex items-center font-semibold gap-2 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                <p className="text-sm">
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </p>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-amber-600 flex items-center font-semibold gap-2 hover:bg-amber-50 p-2 rounded-full transition-colors"
            >
              <Pen size={16} />
              <p className="text-sm">Editar</p>
            </button>
          )}
        </div>
      </section>

      {isEditing ? (
        <form
          id="form-perfil"
          onSubmit={handleSubmit(handleSaveProfile)}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <User size={20} />
            </div>
            <label className="w-44 font-semibold text-gray-600 shrink-0">
              Nome completo
            </label>
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="text"
                className={`w-full border rounded-md p-2 focus:outline-none ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-amber-400'}`}
                {...register('name')}
              />
              {errors.name && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <hr className="w-full text-gray-100" />

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <Mail size={20} />
            </div>
            <label className="w-44 font-semibold text-gray-600 shrink-0">
              Email
            </label>
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full border border-gray-200 bg-gray-50 text-gray-400 rounded-md p-2 cursor-not-allowed"
              />
            </div>
          </div>
          <hr className="w-full text-gray-100" />

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <Phone size={20} />
            </div>
            <label className="w-44 font-semibold text-gray-600 shrink-0">
              Telefone
            </label>
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="text"
                className={`w-full border rounded-md p-2 focus:outline-none ${errors.telephone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-amber-400'}`}
                {...register('telephone')}
              />
              {errors.telephone && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.telephone.message}
                </span>
              )}
            </div>
          </div>
          <hr className="w-full text-gray-100" />

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <Calendar size={20} />
            </div>
            <label className="w-44 font-semibold text-gray-600 shrink-0">
              Nascimento
            </label>
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="date"
                className={`w-full border rounded-md p-2 focus:outline-none ${errors.dateOfBirth ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-amber-400'}`}
                {...register('dateOfBirth')}
              />
              {errors.dateOfBirth && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <User size={20} />
            </div>

            <p className="w-44 font-semibold text-gray-600 shrink-0">
              Nome completo
            </p>
            <p className="font-medium text-gray-800 truncate">
              {profile?.name || 'Não informado'}
            </p>
          </div>
          <hr className="w-full text-gray-100" />

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <Mail size={20} />
            </div>
            <p className="w-44 font-semibold text-gray-600 shrink-0">Email</p>
            <p className="font-medium text-gray-800 truncate">
              {user?.email || 'Não informado'}
            </p>
          </div>
          <hr className="w-full text-gray-100" />

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <Phone size={20} />
            </div>
            <p className="w-44 font-semibold text-gray-600 shrink-0">
              Telefone
            </p>
            <p className="font-medium text-gray-800 truncate">
              {profile?.telephone || 'Não informado'}
            </p>
          </div>
          <hr className="w-full text-gray-100" />

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0">
              <Calendar size={20} />
            </div>
            <p className="w-44 font-semibold text-gray-600 shrink-0">
              Nascimento
            </p>
            <p className="font-medium text-gray-800 truncate">
              {profile?.dateOfBirth || 'Não informado'}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
