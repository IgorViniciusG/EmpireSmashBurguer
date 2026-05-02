import { Link, useNavigate } from 'react-router';
import { Card } from '../../UI/Card';
import { Container } from '../../layout/Container';
import { Input } from '../../UI/Inputs';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../../services/supabase';
import { toast } from 'sonner';

const createRegisterSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type CreateRegisterSchema = z.infer<typeof createRegisterSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRegisterSchema>({
    resolver: zodResolver(createRegisterSchema),
  });

  async function handleLogin(formData: CreateRegisterSchema) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error('E-mail ou senha incorretos.');
        return;
      }

      console.log(data);
      navigate('/');
    } catch (error) {
      toast.error(`Ocorreu um erro : ${error}`);
    }
  }

  return (
    <Container className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">Empire Smash Burguer</h1>
        <h2 className="text-gray-500">Crie sua conta</h2>
      </div>

      <Card className="flex items-center max-w-md w-full">
        <form
          className="flex flex-col p-5 gap-3 w-full"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
          />

          <button
            className="rounded-full py-3 mt-8 px-6 bg-amber-400 font-semibold"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </Card>
      <div className="flex flex-col items-center mt-6 gap-2 text-sm">
        <p className="text-gray-600">
          Ainda não tem uma conta?{' '}
          <Link
            to="/Register"
            className="text-amber-500 font-bold hover:underline"
          >
            Crie aqui
          </Link>
        </p>
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-800 transition-colors mt-2"
        >
          Voltar ao cardápio
        </Link>
      </div>
    </Container>
  );
}
