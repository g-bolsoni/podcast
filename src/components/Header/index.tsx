import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Image from 'next/image';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    return (
        <header className="bg-white h-28 flex items-center justify-center md:py-8 md:px-16 border border-b-2 border-gray-100 flex-wrap">
            <Image
                width={163}
                height={40}
                src='logo.svg'
                alt='Logo'
            />
            <p className='hidden md:flex m-0 md:ml-8 md:py-1 md:pl-4'>The best for you listening, for ever</p>
            <span className='hidden md:flex md:ml-auto capitalize'> {currentDate}</span>
        </header >
    );
}