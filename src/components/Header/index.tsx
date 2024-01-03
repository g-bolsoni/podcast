import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    return (
        <header className="bg-white h-28 flex items-center py-8 px-16 border border-b-2 border-gray-100 ">
            < img src="/logo.svg" alt='Logo' />
            <p className='ml-8 py-1 pl-4'>The best for you listening, for ever</p>
            <span className='ml-auto capitalize'> {currentDate}</span>
        </header >
    );
}