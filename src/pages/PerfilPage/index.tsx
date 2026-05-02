import { Container } from '../../components/layout/Container';
import { useAuthContext } from '../../contexts/AuthContext/hooks';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

import type { Address } from '../../types/AddressType';

import {
  PersonalDataCard,
  type ProfileFormData,
} from '../../components/profile/PersonalDataCard';
import { PersonalAddressCard } from '../../components/profile/PersonalAddressCard';
import { PersonalSecurityCard } from '../../components/profile/PersonalSecurityCard';

export function PerfilPage() {
  const { user } = useAuthContext();
  const [address, setAddress] = useState<Address>();
  const [profile, setProfile] = useState<ProfileFormData | null>(null);

  useEffect(() => {
    async function fetchMyUser() {
      if (!user) return;
      const { data: User, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && User) {
        setProfile(User);
      }
    }
    fetchMyUser();
  }, [user]);

  useEffect(() => {
    async function fetchMyAddress() {
      if (!user) return;

      const { data: addressDefault, error } = await supabase
        .from('Address')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error(`Erro ao buscar endereço: ${error.message}`);
        }
      } else {
        setAddress(addressDefault);
      }
    }

    fetchMyAddress();
  }, [user]);

  return (
    <Container>
      <div className="mt-10 mb-6">
        <h1 className="font-bold text-3xl">
          Olá, {profile?.name || user?.user_metadata?.name} 👋
        </h1>
        <p className="text-gray-500">
          Gerencie suas informações e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {user && (
          <PersonalDataCard
            user={user}
            profile={profile}
            onProfileUpdate={setProfile}
          />
        )}

        <div className="flex flex-col gap-6">
          <PersonalAddressCard address={address} onSetAddress={setAddress} />

          <PersonalSecurityCard />
        </div>
      </div>
    </Container>
  );
}
