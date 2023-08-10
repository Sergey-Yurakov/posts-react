import { classNames as cn } from '@/shared/classNames/classNames';
import { ReactNode } from 'react';

type TableBodyProps = {
    children: ReactNode;
    className?: string;
};

export const TableBody = (props: TableBodyProps) => {
    const { children, className } = props;

    return <tbody className={cn('', {}, [className])}>{children}</tbody>;
};
