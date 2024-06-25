import { titleFont } from '@/config/fonts';
import { RegisterFrom } from './ui/RegisterFrom';

export default function NewAccount() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>Registro</h1>

      <RegisterFrom />

    </div>
  );
}