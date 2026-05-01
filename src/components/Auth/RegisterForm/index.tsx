import { Link, useNavigate } from 'react-router';
import { Card } from '../../Card';
import { Container } from '../../Container';
import { Input } from '../../UI/Inputs';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../../services/supabase';
import { toast } from 'sonner';
import { isValidCPF } from '../../../utils/isValidCpf';

const createRegisterSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 letras'),
    email: z.string().email('Digite um e-mail válido'),
    telephone: z.string().min(10, 'Digite um telefone válido com DDD'),
    cpf: z
      .string()
      .refine((val) => isValidCPF(val), { message: 'CPF inválido' }),

    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type CreateRegisterSchema = z.infer<typeof createRegisterSchema>;

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRegisterSchema>({
    resolver: zodResolver(createRegisterSchema),
  });

  const navigate = useNavigate();

  async function handleCreateRegister(formData: CreateRegisterSchema) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            telephone: formData.telephone,
            cpf: formData.cpf,
          },
        },
      });

      if (error) {
        toast.error(`Erro ao criar a Conta: ${error.message}`);
        return;
      }

      console.log('Usuário criado:', data);
      toast.success('Conta criada com sucesso! Verifique seu e-mail.');
      navigate('/');
    } catch (error) {
      toast.error(`Ocorreu um erro inesperado: ${error}`);
    }
  }

  return (
    <Container className="flex flex-col items-center mt-10">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">Empire Smash Burguer</h1>
        <h2 className="text-gray-500">Crie sua conta</h2>
      </div>

      <Card className="flex items-center max-w-md w-full">
        <form
          className="flex flex-col p-5 gap-3 w-full"
          onSubmit={handleSubmit(handleCreateRegister)}
        >
          <Input
            label="Nome Completo"
            type="text"
            placeholder="Seu nome completo"
            autoComplete="name"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            autoComplete="cpf"
            {...register('cpf')}
            error={errors.cpf?.message}
          />

          <Input
            label="Telefone"
            type="tel"
            placeholder="(99) 9999-9999"
            autoComplete="tel"
            {...register('telephone')}
            error={errors.telephone?.message}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Confirme sua senha"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <button
            className="rounded-full py-3 mt-8 px-6 bg-amber-400 font-semibold"
            type="submit"
          >
            Criar Conta
          </button>
        </form>
      </Card>
      <Link to={'/'}>Voltar ao cardápio</Link>
    </Container>
  );
}
