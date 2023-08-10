import { classNames as cn } from '@/shared/classNames/classNames';
import { ReactNode } from 'react';

import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';

type TableProps = {
    children: ReactNode;
    className?: string;
};

const Table = (props: TableProps) => {
    const { children, className } = props;

    return <table className={cn('', {}, [className])}>{children}</table>;
};

Table.Head = TableHead;
Table.Body = TableBody;

export default Table;
