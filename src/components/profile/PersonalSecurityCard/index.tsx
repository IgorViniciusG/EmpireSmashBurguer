import { Shield, Pen, X, Loader2, Save, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../../UI/Card';
import { toast } from 'sonner';
import { supabase } from '../../../services/supabase';

export function PersonalSecurityCard() {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword != confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setIsUpdatingPassword(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setIsUpdatingPassword(false);

    if (error) {
      toast.error('Erro ao atualizar a senha.');
      console.error(error);
    } else {
      toast.success('Senha atualizada com sucesso!');
      setChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  }
  return (
    <Card className="flex flex-col">
      <section className="flex items-center gap-2 justify-between">
        <div className="flex flex-row items-center gap-2">
          <span className="flex bg-purple-100 text-purple-600 h-12 w-12 rounded-full justify-center items-center">
            <Shield />
          </span>
          <h2 className="font-semibold text-lg">Segurança</h2>
        </div>
        <div>
          {!changePassword ? (
            <button
              onClick={() => setChangePassword(true)}
              className="text-amber-600 flex items-center font-semibold gap-2 hover:bg-amber-50 p-2 rounded-full transition-colors"
            >
              <Pen size={16} />
              <p className="text-sm">Alterar senha</p>
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setChangePassword(false)}
                className="text-gray-600 py-1 px-3 cursor-pointer hover:bg-gray-200 rounded-full flex items-center font-semibold gap-2 transition-colors"
                disabled={isUpdatingPassword}
              >
                <X size={16} />
                <p className="text-sm">Cancelar</p>
              </button>

              <button
                type="submit"
                form="form-update"
                disabled={isUpdatingPassword}
                className="text-black bg-purple-400 hover:bg-purple-500 py-1 px-4 cursor-pointer rounded-full flex items-center font-semibold gap-2 transition-colors disabled:opacity-50"
              >
                {isUpdatingPassword ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                <p className="text-sm">
                  {isUpdatingPassword ? 'Alterando...' : 'Alterar'}
                </p>
              </button>
            </div>
          )}
        </div>
      </section>

      {!changePassword ? (
        <div className="flex gap-3 my-4">
          <span className="flex items-center justify-center bg-purple-200 text-purple-600 h-10 w-10 rounded-full">
            <LockKeyhole />
          </span>
          <span>
            <p>Senha</p>
            <p>******</p>
          </span>
        </div>
      ) : (
        <form
          className="flex flex-col gap-5 mt-4 w-full"
          onSubmit={handlePasswordUpdate}
          id="form-update"
        >
          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-gray-500 shrink-0"></div>
            <label className="w-44 font-semibold text-gray-600 shrink-0">
              Nova senha
            </label>
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center text-sm lg:text-base">
            <div className="flex w-10 text-transparent shrink-0"></div>
            <label className="w-44 font-semibold text-gray-600 shrink-0">
              Confirmar senha
            </label>
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </form>
      )}
    </Card>
  );
}
