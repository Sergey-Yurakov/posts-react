import { classNames as cn } from '@/shared/classNames/classNames';
import { ReactNode } from 'react';

type TableHeadProps = {
    children: ReactNode;
    className?: string;
};

export const TableHead = (props: TableHeadProps) => {
    const { children, className } = props;

    return <thead className={cn('', {}, [className])}>{children}</thead>;
};
