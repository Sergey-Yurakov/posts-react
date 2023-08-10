import cl from './PostList.module.css';

type TTableHeader = {
    id?: number;
    name: string;
    className: string;
    type: 'id' | 'body' | 'title';
};

export const tableHeader: TTableHeader[] = [
    {
        id: 1,
        name: 'ID',
        type: 'id',
        className: cl.idHead,
    },
    {
        id: 2,
        name: 'Заголовок',
        type: 'title',
        className: cl.titleHead,
    },
    {
        id: 3,
        name: 'Описание',
        type: 'body',
        className: cl.bodyHead,
    },
];
